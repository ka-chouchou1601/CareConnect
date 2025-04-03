import React, { useState, useRef, useEffect } from "react";
import axios from "axios"; // Pour envoyer une requête HTTP au backend
import styled from "styled-components"; // Pour styliser les composants
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom"; // Pour rediriger l'utilisateur

const Chatbot = () => {
  // État pour stocker le message tapé par l'utilisateur
  const [message, setMessage] = useState("");
  // État pour stocker la réponse du backend (chatbot)
  const [response, setResponse] = useState(null);
  // État pour gérer l'affichage "envoi en cours"
  const [loading, setLoading] = useState(false);
  // Référence vers le bas de la zone de chat (pour auto-scroll)
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Fonction déclenchée quand l'utilisateur clique sur "Envoyer"
  const handleSend = async () => {
    if (!message.trim()) return; // Ne rien faire si message vide
    //La méthode .trim() en JavaScript est utilisée pour supprimer les espaces au début et à la fin d’une chaîne de caractères.
    setLoading(true); // Affiche "Envoi..." sur le bouton
    try {
      // Envoie le message au backend via l'API chatbot
      const res = await axios.post("http://localhost:5000/api/chatbot/ask", {
        message, // Corps de la requête POST
      });
      setResponse(res.data); // Stocke la réponse reçue
    } catch (err) {
      console.error("Erreur avec le chatbot:", err);
      setResponse({ response: "Erreur serveur, réessayez plus tard." });
    } finally {
      setLoading(false); // Réactive le bouton
    }
  };

  // Fonction appelée si l'utilisateur clique sur "Rejoindre le groupe"
  const handleJoinGroup = () => {
    if (response?.group && response?.groupId) {
      navigate(`/group-chat/${response.groupId}`, {
        state: {
          name: response.group,
          image: response.image,
          groupId: response.groupId,
        },
      });
    }
  };

  // Scroll automatique vers le bas quand un message est ajouté
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [response]);

  return (
    <ChatWrapper>
      <Navbar />
      <ChatContainer>
        {/* Message d'accueil */}
        <GroupHeader>
          <h6>
            🤖 Bonjour et bienvenue sur <strong>CareBot</strong> 🧡 — Dites-moi
            en quoi je peux vous aider ?
          </h6>
        </GroupHeader>

        {/* Affichage des réponses du chatbot */}
        <ChatMessages>
          {response && (
            <Message isUser={false}>
              <p>{response.response}</p>
              {/* Si un lien vers un groupe est fourni */}
              {response.link && (
                <button onClick={handleJoinGroup} className="link-button">
                  👉 <strong>Rejoindre le groupe</strong>
                </button>
              )}
            </Message>
          )}
          <div ref={messagesEndRef} />
        </ChatMessages>

        {/* Zone de saisie du message */}
        <MessageInput>
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Décrivez votre besoin de soutien..."
          />
          <SendButton onClick={handleSend} disabled={loading}>
            {loading ? "Envoi..." : "Envoyer"}
          </SendButton>
        </MessageInput>
      </ChatContainer>
    </ChatWrapper>
  );
};

export default Chatbot;

// ✅ Styled Components
const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f8f9fa;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  padding: 10px;
`;

const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 5;
  background: white;
  padding: 12px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-top: 150px;
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  margin-bottom: 10px;
`;

const Message = styled.div`
  background: ${(props) => (props.isUser ? "#008aff" : "#e6e6e6")};
  color: ${(props) => (props.isUser ? "white" : "black")};
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};

  .link-button {
    margin-top: 10px;
    background: none;
    border: none;
    color: #008aff;
    font-weight: bold;
    cursor: pointer;
    padding: 0;
  }
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
  padding: 12px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const SendButton = styled.button`
  background: #008aff;
  color: white;
  padding: 12px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-left: 10px;
  font-weight: bold;
`;
