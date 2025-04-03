// Importe Mongoose, l'outil pour interagir avec MongoDB depuis Node.js
const mongoose = require("mongoose");

// Charge les variables d'environnement depuis le fichier .env (notamment MONGO_URI)
require("dotenv").config();

// 🔌 Fonction asynchrone pour se connecter à MongoDB
const connectDB = async () => {
  try {
    // ✅ Connexion à MongoDB grâce à l'URI stockée dans le fichier .env
    await mongoose.connect(process.env.MONGO_URI); // Pas besoin d'options depuis Mongoose 6+

    // 🟢 Affiche un message si la connexion réussit
    console.log("✅ MongoDB Connected!");
  } catch (error) {
    // 🔴 Affiche une erreur si la connexion échoue
    console.error("❌ MongoDB Connection Error:", error.message);

    // ❌ Arrête complètement le serveur si la base ne peut pas se connecter
    process.exit(1);
  }
};

// 📤 Exporte la fonction pour qu’elle soit utilisée dans server.js
module.exports = connectDB;
