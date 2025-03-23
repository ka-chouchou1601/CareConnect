const express = require("express");
const router = express.Router();
const Forum = require("../models/Forum");

// ✅ Simulated chatbot logic (no OpenAI here)
router.post("/ask", async (req, res) => {
  const { message } = req.body;

  try {
    const keywords = ["cancer", "mental", "heart", "diabetes"];
    const messageLower = message.toLowerCase();

    const matchedKeyword = keywords.find((keyword) =>
      messageLower.includes(keyword)
    );

    if (matchedKeyword) {
      const forum = await Forum.findOne({
        name: { $regex: matchedKeyword, $options: "i" },
      });

      if (!forum) {
        return res.json({
          response:
            "🙏 Merci pour votre message. Aucun groupe trouvé, mais nous sommes là pour vous aider.",
          group: null,
          groupId: null,
          link: null,
        });
      }

      const link = `http://localhost:3000/group-chat/${forum._id}`;

      return res.json({
        response: `❤️ Merci pour votre message. Vous n'êtes pas seul. Nous vous invitons à rejoindre notre groupe de soutien **${forum.name}**.`,
        group: forum.name,
        groupId: forum._id,
        link,
      });
    }

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
