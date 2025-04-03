import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  // État pour stocker les données du formulaire (email + password)
  const [formData, setFormData] = useState({ email: "", password: "" });
  // État pour afficher les erreurs de connexion
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Permet de rediriger vers une autre page

  // Fonction appelée quand un champ change (email ou mot de passe)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fonction appelée lors de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setError(""); // Réinitialise les erreurs

    try {
      // Envoie les données de connexion au backend
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      const { token, user } = res.data;

      // Stocke le token et les infos utilisateur dans le localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirige vers la page des groupes après connexion réussie
      navigate("/");
    } catch (err) {
      // Affiche une erreur si la connexion échoue
      setError(err.response?.data?.message || "Échec de la connexion");
    }
  };

  return (
    <AuthContainer>
      <Title>
        Bienvenue sur <span>CareConnect</span>
      </Title>
      <Subtitle>Connecte-toi pour retrouver ton groupe de soutien ✨</Subtitle>

      {/* Affichage des erreurs */}
      {error && <ErrorMsg>{error}</ErrorMsg>}

      {/* Formulaire de connexion */}
      <Form onSubmit={handleSubmit}>
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
        <Button type="submit">Se connecter</Button>
      </Form>

      {/* Lien vers l'inscription */}
      <AltOption>
        Première fois ici ?{" "}
        <StyledLink to="/register">Créez votre compte</StyledLink>
      </AltOption>
    </AuthContainer>
  );
};

export default Login;

// ✅ Styled Components
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

  span {
    color: #00c6ff;
  }
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
