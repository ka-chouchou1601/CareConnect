// 📍 src/Pages/Chatbot.jsx
import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/chatbot/ask", {
        message,
      });
      setResponse(res.data);
    } catch (err) {
      console.error("Erreur avec le chatbot:", err);
      setResponse({ response: "Erreur serveur, réessayez plus tard." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2>🤖 Parlez à CareBot</h2>
      <InputSection>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Décrivez votre besoin de soutien..."
        />
        <button onClick={handleSend} disabled={loading}>
          {loading ? "Envoi..." : "Envoyer"}
        </button>
      </InputSection>

      {response && (
        <ResponseSection>
          <p>{response.response}</p>
          {response.link && (
            <a
              href={response.link}
              style={{ color: "#008aff", fontWeight: "bold" }}
            >
              👉 Rejoindre le groupe
            </a>
          )}
        </ResponseSection>
      )}
    </Container>
  );
};

export default Chatbot;

// ✅ Styled Components
const Container = styled.div`
  padding: 40px;
  background: white;
  max-width: 600px;
  margin: 80px auto;
  border-radius: 12px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
`;

const InputSection = styled.div`
  display: flex;
  gap: 10px;

  input {
    flex: 1;
    padding: 12px;
    font-size: 16px;
    border-radius: 6px;
    border: 1px solid #ccc;
  }

  button {
    padding: 12px 18px;
    background: #008aff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
`;

const ResponseSection = styled.div`
  margin-top: 20px;
  background: #f4f4f4;
  padding: 16px;
  border-radius: 8px;
`;
