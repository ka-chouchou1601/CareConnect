import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // ⚠️ Modifie si besoin

const GroupeChat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, image, groupId } = location.state || {};
  const defaultImage = "/images/group-placeholder.png";

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const senderName = user?.name || "Anonymous";

  useEffect(() => {
    if (!groupId) {
      alert("Missing group ID — redirecting to Forum.");
      navigate("/forum");
      return;
    }

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
      sender: senderName,
      text: newMessage,
      groupId,
    };

    socket.emit("sendMessage", msg);
    setMessages((prev) => [...prev, msg]);
    setNewMessage("");
  };

  return (
    <Wrapper>
      <Header>
        <GroupImage src={image || defaultImage} alt={name || "Group"} />
        <GroupName>{name || "Group Chat"}</GroupName>
      </Header>

      <MessagesArea>
        {messages.map((msg, index) => (
          <Message key={index} isUser={msg.sender === senderName}>
            <strong>{msg.sender}:</strong> {msg.text}
          </Message>
        ))}
        <div ref={messagesEndRef} />
      </MessagesArea>

      <InputArea>
        <TextInput
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <SendBtn onClick={handleSendMessage}>Send</SendBtn>
      </InputArea>
    </Wrapper>
  );
};

export default GroupeChat;

// ✅ Styled Components (tout en un)
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 425px;
  margin: 0 auto;
  background: #f8f9fa;
  position: relative;
`;

const Header = styled.div`
  height: 60px;
  background: white;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  width: 100%;
  max-width: 310px;
  margin: 0 auto;
  z-index: 10;
`;

const GroupImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 10px;
`;

const GroupName = styled.h3`
  font-size: 17px;
  margin: 0;
`;

const MessagesArea = styled.div`
  flex: 1;
  margin-top: 70px;
  margin-bottom: 60px;
  overflow-y: auto;
  padding: 10px;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge */
  }
`;


const Message = styled.div`
  background: ${(props) => (props.isUser ? "#008aff" : "white")};
  color: ${(props) => (props.isUser ? "white" : "black")};
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  max-width: 85%;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.08);
`;

const InputArea = styled.div`
  height: 50px;
  background: white;
  display: flex;
  align-items: center;
  padding: 6px 10px;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.06);
  position: fixed;
  bottom: 60px; /* juste au-dessus de ta navbar */
  width: 310px;
  max-width: 425px;
  z-index: 10;
`;

const TextInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 6px;
  font-size: 13px;
  border-radius: 8px;
  background: #f1f1f1;
`;

const SendBtn = styled.button`
  background: #008aff;
  color: white;
  font-weight: bold;
  padding: 8px 14px;
  border: none;
  border-radius: 8px;
  margin-left: 8px;
  cursor: pointer;

  &:hover {
    background: #006cd1;
  }
`;
