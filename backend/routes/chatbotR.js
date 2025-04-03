const express = require("express");
const router = express.Router();
const Forum = require("../models/Forum"); // Modèle des groupes de soutien

// Route API appelée par le frontend quand l'utilisateur envoie un message
router.post("/ask", async (req, res) => {
  const { message } = req.body; // Récupération du message depuis le frontend

  try {
    // Mots-clés que le chatbot peut reconnaître
    const keywords = ["cancer", "mental", "heart", "diabetes"];
    const messageLower = message.toLowerCase(); // On convertit en miniscule le message   pour eviter les erreur

    // Cherche un mot-clé présent dans le message
    const matchedKeyword = keywords.find((keyword) =>
      messageLower.includes(keyword)
    );

    if (matchedKeyword) {
      // Recherche dans MongoDB un groupe contenant ce mot-clé
      const forum = await Forum.findOne({
        name: { $regex: matchedKeyword, $options: "i" }, //$options: "i" = "insensitive" → casse ignorée
      });
      //regex  C’est une expression régulière (Regular Expression) = un outil puissant pour chercher un mot dans une chaîne.
      if (!forum) {
        // Si aucun groupe trouvé correspondant au mot-clé
        return res.json({
          response:
            "🙏 Merci pour votre message. Aucun groupe trouvé, mais nous sommes là pour vous aider.",
          group: null,
          groupId: null,
          link: null,
        });
      }

      // Si un groupe est trouvé, on crée un lien pour y accéder
      const link = `http://localhost:3000/group-chat/${forum._id}`;

      // Réponse envoyée au frontend (chatbot)
      return res.json({
        response: `❤️ Merci pour votre message. Vous n'êtes pas seul. Nous vous invitons à rejoindre notre groupe de soutien **${forum.name}**.`,
        group: forum.name,
        groupId: forum._id,
        link,
      });
    }

    // Si aucun mot-clé détecté
    res.json({
      response:
        "🙏 Merci pour votre message. Nous n'avons pas identifié de groupe correspondant, mais nous sommes là pour vous soutenir.",
      group: null,
      groupId: null,
      link: null,
    });
  } catch (error) {
    console.error("❌ Mock Chatbot error:", error.message);
    res.status(500).json({ message: "Erreur serveur côté chatbot." });
  }
});

module.exports = router;
