const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIO = require("socket.io");
require("dotenv").config();

const connectDB = require("./config/db");
const Message = require("./models/Message");
const Forum = require("./models/Forum");
const authRoutes = require("./routes/authR"); // ✅ AUTH route
const forumRoutes = require("./routes/forumR");
const messageRoutes = require("./routes/messageR");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000", // ✅ Update when deploying
    methods: ["GET", "POST"],
  },
});

// ✅ Connect to MongoDB
connectDB();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ REST API Routes
app.use("/api/auth", authRoutes); // 🟢 NEW: Auth routes
app.use("/api/forums", forumRoutes);
app.use("/api/messages", messageRoutes);

// ✅ WebSocket Logic using groupId
io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  // ✅ Join a group and fetch its messages
  socket.on("joinGroup", async (groupId) => {
    console.log(`📌 Joined group: ${groupId}`);
    try {
      const messages = await Message.find({ groupId }).sort({ timestamp: 1 });
      socket.join(groupId);
      socket.emit("previousMessages", messages);
    } catch (err) {
      console.error("❌ Error loading messages:", err);
    }
  });

  // ✅ Send and store message in DB
  socket.on("sendMessage", async (data) => {
    const { groupId, sender, text } = data;
    if (!groupId || !text || !sender) return;

    try {
      const forum = await Forum.findById(groupId);
      if (!forum) {
        console.error("❌ Forum not found for ID:", groupId);
        return;
      }

      const message = new Message({
        groupId,
        groupName: forum.name, // ✅ Store readable group name
        sender,
        text,
      });

      await message.save();
      io.to(groupId).emit("receiveMessage", message);
    } catch (err) {
      console.error("❌ Error saving message:", err);
    }
  });

  // 🔴 Handle disconnection
  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
