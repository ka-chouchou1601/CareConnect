import React, { useState } from "react";
import styled from "styled-components";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
      setTimeout(() => {
        setMessages([
          ...messages,
          { text: input, sender: "user" },
          { text: "I'm here to help!", sender: "bot" },
        ]);
      }, 1000);
    }
  };

  return (
    <Container>
      <Title>CareConnect Chatbot</Title>
      <ChatWindow>
        {messages.map((msg, index) => (
          <Message key={index} sender={msg.sender}>
            {msg.text}
          </Message>
        ))}
      </ChatWindow>
      <InputContainer>
        <ChatInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <SendButton onClick={sendMessage}>Send</SendButton>
      </InputContainer>
    </Container>
  );
};

export default Chatbot;

/* Styled Components */
const Container = styled.div`
  padding: 20px;
  background: #f8f9fa;
  height: 100vh;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const ChatWindow = styled.div`
  height: 60vh;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
  background: white;
  border-radius: 5px;
`;

const Message = styled.p`
  padding: 8px;
  background: ${(props) => (props.sender === "user" ? "#007bff" : "#ccc")};
  color: ${(props) => (props.sender === "user" ? "white" : "black")};
  border-radius: 5px;
  margin: 5px 0;
`;

const InputContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SendButton = styled.button`
  padding: 10px 15px;
  margin-left: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
`;
