import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // ⚠️ Adapt if deployed

const GroupeChat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, image, groupId } = location.state || {};
  const defaultImage = "/images/group-placeholder.png";

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!groupId) {
      alert("Missing group ID — redirecting to Forum.");
      navigate("/forum");
      return;
    }

    // 🟢 Emit groupId instead of groupName
    socket.emit("joinGroup", groupId);

    socket.on("previousMessages", (msgs) => {
      setMessages(msgs);
    });

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("previousMessages");
      socket.off("receiveMessage");
    };
  }, [groupId, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const msg = {
      sender: "You", // À remplacer plus tard par l'utilisateur authentifié
      text: newMessage,
      groupId: groupId,
    };

    socket.emit("sendMessage", msg);
    setMessages((prev) => [...prev, msg]);
    setNewMessage("");
  };

  return (
    <ChatContainer>
      <GroupHeader>
        <GroupImage src={image || defaultImage} alt={name || "Group"} />
        <h3>{name || "Group Chat"}</h3>
      </GroupHeader>

      <ChatMessages>
        {messages.map((msg, index) => (
          <Message key={index} isUser={msg.sender === "You"}>
            <strong>{msg.sender}:</strong> {msg.text}
          </Message>
        ))}
        <div ref={messagesEndRef} />
      </ChatMessages>

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
