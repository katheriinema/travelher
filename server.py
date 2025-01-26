#set GROQ_API_KEY = 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   (line for terminal in vscode)

import os
from langchain.chains import LLMChain
from langchain_core.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
)
from langchain_core.messages import SystemMessage
from langchain.chains.conversation.memory import ConversationBufferWindowMemory
from langchain_groq import ChatGroq


def main():
    """
    This function is the main entry point of the application. It sets up the Groq client, the Streamlit interface, and handles the chat interaction.
    """

    # Get Groq API key
    groq_api_key = os.environ['GROQ_API_KEY']
    model = 'llama3-8b-8192'
    # Initialize Groq Langchain chat object and conversation
    groq_chat = ChatGroq(groq_api_key=groq_api_key, model_name=model)

    print(
        "Hello! I'm your friendly TravelHer chatbot. I can help you travel the world safely! Based on your previous responses, I will curate a travel itinerary and packing list! Just let me know if you like or dislike any of the suggestions. I'm here to help you make the most of your travels!"
    )

    # Collect user inputs for the trip
    print("Where do you want to go? (e.g., Paris, Tokyo, etc.)")
    destination = input("Enter your destination: ")

    print(
        "How long is your trip? (Please enter the number of days, e.g., 7 days)"
    )
    duration = input("Enter trip duration: ")

    # Ask about the time of the year
    print(
        "What time of the year will you be traveling? (e.g., Spring, Summer, Fall, Winter)"
    )
    season = input(
        "Enter season or month of travel (e.g., Summer, December): ")

    # Get preferred activities from the user
    print(
        "Please select your preferred activities for this trip (separate by commas if more than one):"
    )
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

    print("Available activities:")
    for i, activity in enumerate(activities, 1):
        print(f"{i}. {activity}")

    activity_indices = input(
        "Select activities by entering numbers separated by commas (e.g., 1, 3, 5): "
    )
    selected_activities = [
        activities[int(i) - 1] for i in activity_indices.split(",")
    ]

    # Prepare the user profile with the information they provided
    user_profile = {
        "destination": destination,
        "duration": duration,
        "season": season,
        "activities": selected_activities
    }

    print(
        f"Great! Let's start planning your trip to {destination} for {duration}. You have chosen the following activities: {', '.join(selected_activities)}."
    )
    print(
        "Now let's proceed with your personalized itinerary and packing list..."
    )

    # Create a system prompt for the chatbot based on user input
    system_prompt = f"""
    You are a friendly travel guide assisting a solo female traveler.
    The user is traveling to {destination} for {duration} days.
    The user has selected the following activities: {', '.join(selected_activities)}.
    The user will be traveling during {season}.
    Based on this information, help the user by suggesting a travel itinerary and a packing list that is appropriate for the weather during this time of year.
    """

    conversational_memory_length = 5  # Number of previous messages the chatbot will remember
    memory = ConversationBufferWindowMemory(k=conversational_memory_length,
                                            memory_key="chat_history",
                                            return_messages=True)

    # Now, gather all inputs before generating the response to give the user a final answer.
    print(
        "\nNow that we've gathered all the necessary information, I'll generate a personalized response with your itinerary and packing list..."
    )

    # Construct a chat prompt template using various components
    prompt = ChatPromptTemplate.from_messages([
        SystemMessage(
            content=system_prompt),  # The system prompt sets the context.
        MessagesPlaceholder(variable_name="chat_history"
                            ),  # Placeholder for conversation history.
        HumanMessagePromptTemplate.from_template(
            "{human_input}"),  # Template for the user's input.
    ])

    # Create a conversation chain using the LangChain LLM (Language Learning Model)
    conversation = LLMChain(
        llm=groq_chat,  # The Groq LangChain chat object initialized earlier.
        prompt=prompt,  # The constructed prompt template.
        verbose=False,  # Set to True for debugging if needed.
        memory=
        memory,  # The conversational memory object that stores and manages conversation history.
    )

    # Generate and output the final response based on the user input
    response = conversation.predict(
        human_input="Generate my travel itinerary and packing list.")
    print("Chatbot:", response)

if __name__ == "__main__":
    main()