// 📦 Importation des modules nécessaires
import React, { useState } from "react"; // React et son hook d'état
import axios from "axios"; // Pour faire les requêtes HTTP (inscription)
import { useNavigate, Link } from "react-router-dom"; // Redirection + liens internes
import styled from "styled-components"; // Pour styliser les composants

// 🔐 Composant d'inscription
const Register = () => {
  // État pour stocker les données du formulaire (nom, email, mot de passe)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // État pour gérer les erreurs (ex: email déjà utilisé)
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Pour rediriger l'utilisateur après inscription

  // 🔄 Fonction appelée quand l'utilisateur tape dans un champ
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Mise à jour de formData
  };

  // ✅ Fonction exécutée à l'envoi du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setError(""); // Réinitialise l'erreur

    try {
      // 📤 Envoie des données d'inscription au backend
      await axios.post("http://localhost:5000/api/auth/register", formData);

      // ✅ Succès : message et redirection vers la page de connexion
      alert("✅ Compte créé avec succès !");
      navigate("/login");
    } catch (err) {
      // ❌ En cas d'erreur, on affiche un message à l'utilisateur
      setError(err.response?.data?.message || "Erreur lors de l'inscription");
    }
  };

  // 📄 Rendu du formulaire d'inscription
  return (
    <AuthContainer>
      <Title>Créer un compte</Title>
      <Subtitle>Rejoins la communauté CareConnect 🧡</Subtitle>

      {/* Affichage du message d’erreur s’il y en a une */}
      {error && <ErrorMsg>{error}</ErrorMsg>}

      {/* Formulaire */}
      <Form onSubmit={handleSubmit}>
        <Input
          name="name"
          placeholder="Prénom ou pseudo"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          name="email"
          type="email"
          placeholder="Adresse email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button type="submit">Créer mon compte</Button>
      </Form>

      {/* Lien vers la page de connexion si l’utilisateur a déjà un compte */}
      <AltOption>
        Déjà inscrit ? <StyledLink to="/login">Se connecter</StyledLink>
      </AltOption>
    </AuthContainer>
  );
};

export default Register;

// ✅ Styled Components (same as Login)
const AuthContainer = styled.div`
  padding: 40px 20px;
  max-width: 400px;
  margin: auto;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #007be6;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #555;
  margin-bottom: 25px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
`;

const Button = styled.button`
  background: linear-gradient(150deg, #007be6, #00c6ff);
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
`;

const AltOption = styled.p`
  font-size: 13px;
  margin-top: 20px;
`;

const StyledLink = styled(Link)`
  color: #007be6;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMsg = styled.p`
  color: red;
  font-size: 13px;
  margin-bottom: 10px;
`;
