import React, { useState, useEffect } from "react";
import axios from "axios";

//Components
import MessageCard from "./MessageCard"

const MessageDisplay = () => {

    const [messages, setMessages] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(""); 

    useEffect(() => {
        fetchItems();
        }, []);

  // Fetches Messages and sets the state
  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/messages");
      setMessages(response.data); 
    } catch (err) {
      setError("Fehler beim Abrufen der Nachrichten");
    } finally {
      setLoading(false); 
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
    <div className="w-full flex flex-row">
        {messages.map((message, index) => (
            <MessageCard message={message} index={index} />
        ))}
    </div>
    </>
  )
}

export default MessageDisplay