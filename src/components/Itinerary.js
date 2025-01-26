import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import "../styles/Itinerary.css";
import ReactMarkdown from "react-markdown";

const Itinerary = () => {
  const [markdownItinerary, setMarkdownItinerary] = useState("");

  // Load Markdown itinerary from localStorage
  useEffect(() => {
    const storedMarkdown = localStorage.getItem("markdownItinerary");
    if (storedMarkdown) {
      setMarkdownItinerary(storedMarkdown);
    }
  }, []);

  return (
    <Layout pageTitle="Itinerary">
      <div className="itinerary-page">
        <h1 className="itinerary-header">Saved Itinerary</h1>
        {markdownItinerary ? (
          <div className="markdown-container">
            <ReactMarkdown>{markdownItinerary}</ReactMarkdown>
          </div>
        ) : (
          <p>No itinerary saved yet. Plan your trip using the chatbot!</p>
        )}
      </div>
    </Layout>
  );
};

export default Itinerary;
