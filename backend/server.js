// 📦 Importation des modules nécessaires
const express = require("express"); // Framework backend léger et rapide
const http = require("http"); // Module natif pour créer le serveur HTTP
const cors = require("cors"); // Permet d'accepter les requêtes d'autres domaines (ex: frontend React)
const socketIO = require("socket.io"); // Bibliothèque pour la communication en temps réel
require("dotenv").config(); // Pour lire les variables d'environnement (.env)

// 📂 Importation des modules internes (connexion DB + modèles)
const connectDB = require("./config/db"); // Fonction qui connecte à MongoDB
const Message = require("./models/Message"); // Modèle des messages (chat)
const Forum = require("./models/Forum"); // Modèle des groupes de discussion

// 📂 Importation des routes
const authRoutes = require("./routes/authR"); // Routes d'authentification (login/register)
const forumRoutes = require("./routes/forumR"); // Routes pour les groupes/forums
const messageRoutes = require("./routes/messageR"); // Routes pour accéder aux messages (HTTP)
const chatbotRoutes = require("./routes/chatbotR"); // ✅ Route pour le chatbot (reconnaissance de mots-clés)

// ✅ Initialisation de l'app Express et du serveur HTTP + socket.io
const app = express();
const server = http.createServer(app); // Création du serveur HTTP de base
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000", // ✅ Autorise uniquement les requêtes venant du frontend
    methods: ["GET", "POST"], // ✅ Méthodes acceptées
  },
});

// ✅ Connexion à la base de données MongoDB
connectDB();

// ✅ Middlewares globaux
app.use(cors()); // Autorise le partage de ressources entre domaines (ex: frontend-backend)
app.use(express.json()); // Pour lire le corps des requêtes en JSON

// ✅ Définition des routes REST accessibles via HTTP
app.use("/api/auth", authRoutes); // Connexion, inscription
app.use("/api/forums", forumRoutes); // Groupes de soutien
app.use("/api/messages", messageRoutes); // Liste ou envoi de messages
app.use("/api/chatbot", chatbotRoutes); // ✅ Route du chatbot

// ✅ Logique WebSocket — Communication en temps réel
io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id); // Affiche l'ID du client qui se connecte

  // 🟢 Un utilisateur rejoint un groupe de discussion
  socket.on("joinGroup", async (groupId) => {
    console.log(`📌 Joined group: ${groupId}`);
    try {
      // On récupère tous les messages du groupe depuis la base
      const messages = await Message.find({ groupId }).sort({ timestamp: 1 });
      socket.join(groupId); // On "rejoint" la salle correspondant à ce groupe
      socket.emit("previousMessages", messages); // On envoie les anciens messages au client
    } catch (err) {
      console.error("❌ Error loading messages:", err); // Erreur de récupération
    }
  });

  // 🟢 Réception d’un nouveau message envoyé par un utilisateur
  socket.on("sendMessage", async (data) => {
    const { groupId, sender, text } = data;
    if (!groupId || !text || !sender) return; // Vérification des données

    try {
      // Vérifie que le groupe existe bien
      const forum = await Forum.findById(groupId);
      if (!forum) {
        console.error("❌ Forum not found for ID:", groupId);
        return;
      }

      // Crée un nouveau message
      const message = new Message({
        groupId,
        groupName: forum.name,
        sender,
        text,
      });

      await message.save(); // Enregistre le message dans MongoDB
      io.to(groupId).emit("receiveMessage", message); // Envoie le message à tous ceux qui sont dans ce groupe
    } catch (err) {
      console.error("❌ Error saving message:", err); // Erreur à l'enregistrement
    }
  });

  // 🔴 Quand un utilisateur se déconnecte
  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

// ✅ Lancement du serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
