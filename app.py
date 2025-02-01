from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from datetime import datetime, timedelta
from langchain.chains import LLMChain
from langchain_core.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
)
from langchain_core.messages import SystemMessage
from langchain.chains.conversation.memory import ConversationBufferWindowMemory
from langchain_groq import ChatGroq

from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize LangChain with Groq
groq_api_key = os.getenv("GROQ_API_KEY", "your-api-key")  # Replace or set as environment variable
model = 'llama3-8b-8192'
groq_chat = ChatGroq(groq_api_key=groq_api_key, model_name=model)

# Memory object to store conversation context
memory = ConversationBufferWindowMemory(k=5, memory_key="chat_history", return_messages=True)

# To track the current state of the conversation
user_sessions = {}

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_id = data.get("user_id")  # Each user should have a unique ID (e.g., session ID)
    user_input = data.get("user_input", "").strip()

    # List of activities for users to choose from
    activities = [
        "Sightseeing: Visiting landmarks, historical sites, museums, and cultural attractions.",
        "Outdoor Adventures: Hiking, biking, skiing, surfing, and other outdoor sports.",
        "Food and Drink: Trying local cuisine, visiting restaurants, cafes, and street food markets.",
        "Shopping: Exploring local markets, boutiques, and shopping districts.",
        "Relaxation: Spending time at beaches, spas, hot springs, or just lounging at the hotel.",
        "Cultural Experiences: Attending festivals, concerts, theater performances, and cultural events.",
        "Wildlife and Nature: Going on safaris, bird watching, and visiting national parks or botanical gardens.",
        "Water Activities: Snorkeling, scuba diving, boating, fishing, and kayaking.",
        "Photography: Capturing beautiful landscapes, cityscapes, and memorable moments.",
        "Learning: Taking cooking classes, language lessons, or guided tours to learn about the destination’s history and culture."
    ]

    # If the user session doesn't exist, initialize it
    if user_id not in user_sessions:
        user_sessions[user_id] = {
            "destination": None,
            "start_date": None,
            "end_date": None,
            "activities": [],
            "step": 0  # Step of the conversation (0: ask destination, 1: date range, etc.)
        }

    session = user_sessions[user_id]

    # Step 1: Ask for destination
    if session["step"] == 0:
        if user_input:
            session["destination"] = user_input
            session["step"] += 1
            return jsonify({"response": "What are the start and end dates for your trip? (e.g., 2025-02-01 to 2025-02-07)"})
        else:
            return jsonify({"response": "Hello! I can help you plan your trip. Where do you want to go?"})

    # Step 2: Ask for date range
    if session["step"] == 1:
        if user_input and "to" in user_input:
            try:
                start_date, end_date = map(str.strip, user_input.split("to"))
                session["start_date"] = start_date
                session["end_date"] = end_date
                session["step"] += 1

                # Display activities
                activities_list = "\n".join([f"{i}. {activity}" for i, activity in enumerate(activities, 1)])
                return jsonify({"response": f"Here are some activities you can choose from:\n{activities_list}\nSelect activities by entering numbers separated by commas (e.g., 1, 3, 5)."})
            except ValueError:
                return jsonify({"response": "Please provide the start and end dates in the correct format (e.g., 2025-02-01 to 2025-02-07)."})
        else:
            return jsonify({"response": "What are the start and end dates for your trip? (e.g., 2025-02-01 to 2025-02-07)"})

    # Step 3: Ask for activities
    if session["step"] == 2:
        if user_input:
            try:
                # Parse the user input into selected activity indices
                selected_indices = [int(i.strip()) for i in user_input.split(",") if i.strip().isdigit()]
                
                # Log the parsed indices for debugging
                print(f"Parsed indices: {selected_indices}")

                # Map the indices to the corresponding activities
                session["activities"] = [activities[i - 1] for i in selected_indices if 1 <= i <= len(activities)]
                
                # Log the selected activities for debugging
                print(f"Selected activities: {session['activities']}")

                session["step"] += 1

                # Generate the final itinerary
                system_prompt = f"""
                You are a friendly travel guide assisting a solo female traveler.
                The user is traveling to {session['destination']} from {session['start_date']} to {session['end_date']}.
                The user has selected the following activities: {', '.join(session['activities'])}.
                Based on this information, help the user by suggesting a detailed travel itinerary with timestamps and a packing list.
                """

                # Create the prompt
                prompt = ChatPromptTemplate.from_messages([
                    SystemMessage(content=system_prompt),
                    MessagesPlaceholder(variable_name="chat_history"),
                    HumanMessagePromptTemplate.from_template("{human_input}"),
                ])

                # Generate response
                conversation = LLMChain(
                    llm=groq_chat,
                    prompt=prompt,
                    verbose=False,
                    memory=memory,
                )

                try:
                    raw_response = conversation.predict(human_input="Generate my detailed travel itinerary with timestamps and dates.")
                    formatted_response = format_itinerary(raw_response)
                    user_sessions.pop(user_id, None)  # Reset session after completion
                    return jsonify({"response": formatted_response})
                except Exception as e:
                    print(f"Error generating itinerary: {e}")  # Log the error
                    return jsonify({"error": "Something went wrong while generating your itinerary."}), 500
            except Exception as e:
                print(f"Error parsing activities: {e}")  # Log the error
                return jsonify({"response": "Invalid selection. Please choose activities by entering numbers separated by commas (e.g., 1, 3, 5)."})
        else:
            activities_list = "\n".join([f"{i}. {activity}" for i, activity in enumerate(activities, 1)])
            return jsonify({"response": f"Here are some activities you can choose from:\n{activities_list}\nSelect activities by entering numbers separated by commas (e.g., 1, 3, 5)."})

    return jsonify({"response": "Thank you for using the chatbot!"})


def format_itinerary(raw_response):
    """
    Format the raw chatbot response into Markdown for better readability.
    """
    if not raw_response or not isinstance(raw_response, str):
        return "No itinerary available. Please try again."

    lines = raw_response.split("\n")
    formatted_response = ""

    for line in lines:
        if line.strip().startswith("*Day"):
            formatted_response += f"### {line.strip()[1:].strip()} ###\n"
        elif line.strip().startswith("-"):
            formatted_response += f"- {line.strip()[1:].strip()}\n"
        else:
            formatted_response += f"{line.strip()}\n"

    final_message = (
        "\n\n### Excited? ###\n"
        "Continue planning by checking out other women's reviews of safe and fun places around the city, "
        "along with the itinerary page where you can check your saved itinerary. Have fun!"
    )
    formatted_response += final_message
    return formatted_response

if __name__ == "__main__":
    app.run(port=5000, debug=True)
