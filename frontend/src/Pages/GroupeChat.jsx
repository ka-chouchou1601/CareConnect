import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";


const GroupeChat = () => {
  const location = useLocation();
  const { name, image } = location.state || {};

  // ✅ Default placeholder image if no image is provided
  const defaultImage = "/images/group-placeholder.png";

  // ✅ Store messages in state
  const [messages, setMessages] = useState([
    { sender: "Alice", text: "Hey everyone! How are you?" },
    { sender: "Bob", text: "Hi Alice! I'm doing well, how about you?" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  // ✅ Handle sending messages
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const messageObject = { sender: "You", text: newMessage };
    setMessages([...messages, messageObject]); // Update messages list
    setNewMessage(""); // Clear input field

    // Later, this will send the message to the backend (Socket.IO)
  };

  return (
    <ChatContainer>
      {/* ✅ Display Group Name and Image */}
      <GroupHeader>
        <GroupImage src={image || defaultImage} alt={name || "Group"} />
        <h3>{name || "Group Chat"}</h3>
      </GroupHeader>

      {/* ✅ Chat Messages */}
      <ChatMessages>
        {messages.map((msg, index) => (
          <Message key={index} isUser={msg.sender === "You"}>
            <strong>{msg.sender}:</strong> {msg.text}
          </Message>
        ))}
      </ChatMessages>

      {/* ✅ Message Input */}
      <MessageInput>
        <Input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <SendButton onClick={handleSendMessage}>Send</SendButton>
      </MessageInput>
    </ChatContainer>
  );
};

export default GroupeChat;

// ✅ Styled Components
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f8f9fa;
  padding: 10px;
`;

const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  background: white;
  padding: 12px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 10px;
`;

const GroupImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
`;

const Message = styled.div`
  background: ${(props) => (props.isUser ? "#008aff" : "white")};
  color: ${(props) => (props.isUser ? "white" : "black")};
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
`;

const MessageInput = styled.div`
  display: flex;
  background: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 8px;
  font-size: 14px;
`;

const SendButton = styled.button`
  background: #008aff;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
`;
