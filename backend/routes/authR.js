// 📦 Importation des modules nécessaires
const express = require("express");
const router = express.Router(); // Création d'un routeur Express
const User = require("../models/User"); // Modèle utilisateur (MongoDB)
const bcrypt = require("bcryptjs"); // Librairie pour hacher les mots de passe
const jwt = require("jsonwebtoken"); // Librairie pour créer des tokens d’authentification (JWT)

// 🔐 ROUTE D'INSCRIPTION (POST /api/auth/register)
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body; // Récupère les champs envoyés depuis le frontend

  try {
    // 🔍 Vérifie si l’email est déjà utilisé
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already in use" }); // Répond avec une erreur si l'utilisateur existe déjà
    }

    // 🔒 Hashage (chiffrement) du mot de passe avant de l’enregistrer
    const hashedPassword = await bcrypt.hash(password, 10);

    // 👤 Création d'un nouvel utilisateur avec les infos fournies
    const user = new User({
      name,
      email,
      password: hashedPassword, // On stocke le mot de passe sécurisé
    });

    await user.save(); // 💾 Enregistre le nouvel utilisateur dans MongoDB

    // 🔑 Création d’un token JWT signé avec le secret du fichier .env
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d", // Token valable 24h
    });

    // 📤 Réponse envoyée au frontend : token + infos de l'utilisateur (sans le mot de passe)
    res.status(201).json({
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    // ❌ Gestion des erreurs
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔐 ROUTE DE CONNEXION (POST /api/auth/login)
router.post("/login", async (req, res) => {
  const { email, password } = req.body; // Récupère l'email et le mot de passe entrés par l'utilisateur

  try {
    // 🔍 Recherche de l'utilisateur par email dans MongoDB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" }); // ❌ Si aucun utilisateur n’est trouvé
    }

    // 🔍 Vérifie si le mot de passe est correct en comparant avec celui stocké
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" }); // ❌ Mauvais mot de passe
    }

    // 🔑 Création d’un token JWT si les identifiants sont valides
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d", // Token valable 24h
    });

    // 📤 Renvoie le token + les infos utilisateur (utilisé ensuite dans localStorage côté frontend)
    res.status(200).json({
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    // ❌ Erreur serveur (MongoDB, JWT, etc.)
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Exportation du routeur pour l'utiliser dans server.js
module.exports = router;
