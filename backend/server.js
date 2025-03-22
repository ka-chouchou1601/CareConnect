// ✅ server.js
const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIO = require("socket.io");
require("dotenv").config();

const connectDB = require("./config/db");
const Message = require("./models/Message");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// ✅ Connexion MongoDB
connectDB();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes API REST
const forumRoutes = require("./routes/forumR");
const messageRoutes = require("./routes/messageR");

app.use("/api/forums", forumRoutes);
app.use("/api/messages", messageRoutes); // 🔁 Route REST pour les messages

// ✅ WebSocket
io.on("connection", (socket) => {
  console.log("🟢 Client connecté :", socket.id);

  socket.on("joinGroup", async (groupName) => {
    console.log(`📌 Rejoint le groupe : ${groupName}`);
    try {
      const messages = await Message.find({ groupName }).sort({ timestamp: 1 });
      socket.join(groupName);
      socket.emit("previousMessages", messages);
    } catch (err) {
      console.error("❌ Erreur chargement messages :", err);
    }
  });

  socket.on("sendMessage", async (data) => {
    const { groupName, sender, text } = data;
    if (!groupName || !text || !sender) return;

    try {
      const message = new Message({ groupName, sender, text });
      await message.save();
      io.to(groupName).emit("receiveMessage", message);
    } catch (err) {
      console.error("❌ Erreur enregistrement message :", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client déconnecté :", socket.id);
  });
});

// ✅ Démarrage serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
