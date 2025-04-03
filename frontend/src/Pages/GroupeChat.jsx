// Importation des outils React
import React, { useEffect, useState, useRef } from "react";
// Importation des outils de navigation (React Router)
import { useLocation, useNavigate } from "react-router-dom";
// Importation du système de style CSS en JS
import styled from "styled-components";
// Importation de Socket.IO côté client pour la communication temps réel
import { io } from "socket.io-client";

// Connexion à mon backend via WebSocket (Socket.IO)
// ⚠️ URL à adapter si mon backend est en ligne
const socket = io("http://localhost:5000");

// Déclaration du composant principal du chat de groupe
const GroupeChat = () => {
  // Récupère les infos passées depuis la page précédente (nom, image, groupId)
  const location = useLocation();
  const navigate = useNavigate();
  const { name, image, groupId } = location.state || {};
  const defaultImage = "/images/group-placeholder.png";

  // État local pour les messages reçus/envoyés
  const [messages, setMessages] = useState([]);
  // État pour le message que l'utilisateur est en train d'écrire
  const [newMessage, setNewMessage] = useState("");
  // Référence vers le bas de la zone des messages (pour scroller automatiquement)
  const messagesEndRef = useRef(null);

  // Récupère le nom de l'utilisateur depuis le localStorage (s'il est connecté)
  const user = JSON.parse(localStorage.getItem("user"));
  const senderName = user?.name || "Anonymous"; // Si pas de nom trouvé → "Anonymous"

  // useEffect pour gérer la connexion au groupe dès que groupId est connu
  useEffect(() => {
    if (!groupId) {
      // Si aucun groupId → on redirige vers la page Forum
      alert("Missing group ID — redirecting to Forum.");
      navigate("/forum");
      return;
    }

    // Demande à rejoindre la room du groupe sur le serveur
    socket.emit("joinGroup", groupId);

    // Réception des anciens messages du groupe
    socket.on("previousMessages", (msgs) => {
      setMessages(msgs); // On remplit l’historique
    });

    // Réception d’un nouveau message en temps réel
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]); // On ajoute le message à la liste
    });

    // Nettoyage à la fin : on enlève les écouteurs pour éviter les doublons
    return () => {
      socket.off("previousMessages");
      socket.off("receiveMessage");
    };
  }, [groupId, navigate]); // Ce useEffect s’active si groupId ou navigate change

  // useEffect pour faire défiler automatiquement les messages vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); // À chaque fois que les messages changent → scroll en bas

  // Fonction appelée quand on clique sur "Send"
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return; // Si message vide → on n'envoie rien

    // Création du message à envoyer
    const msg = {
      sender: senderName,
      text: newMessage,
      groupId,
    };

    // Envoi du message au serveur via Socket.IO
    socket.emit("sendMessage", msg);
    // Mise à jour immédiate de l'affichage en local
    setMessages((prev) => [...prev, msg]);
    // On vide le champ de saisie
    setNewMessage("");
  };

  // Rendu du composant
  return (
    <Wrapper>
      {/* En-tête avec image et nom du groupe */}
      <Header>
        <GroupImage src={image || defaultImage} alt={name || "Group"} />
        <GroupName>{name || "Group Chat"}</GroupName>
      </Header>

      {/* Zone d'affichage des messages */}
      <MessagesArea>
        {messages.map((msg, index) => (
          // Affiche chaque message, avec une couleur différente si c’est l’utilisateur
          <Message key={index} isUser={msg.sender === senderName}>
            <strong>{msg.sender}:</strong> {msg.text}
          </Message>
        ))}
        {/* Ce div sert à scroller jusqu'en bas */}
        <div ref={messagesEndRef} />
      </MessagesArea>

      {/* Zone de saisie d’un nouveau message */}
      <InputArea>
        <TextInput
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)} // On met à jour le message en temps réel
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
