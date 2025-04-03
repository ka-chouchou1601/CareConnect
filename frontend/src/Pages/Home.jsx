// Importation des hooks React et bibliothèques
import React, { useState, useEffect } from "react"; // Hooks pour gérer l’état local et les effets secondaires
import axios from "axios"; // Librairie pour effectuer des requêtes HTTP
import { useNavigate } from "react-router-dom"; // Hook pour rediriger l’utilisateur vers une autre page
import Navbar from "../Components/Navbar"; // Composant de navigation
import styled from "styled-components"; // Utilisé pour le style, qu'on ignore ici

// Composant principal de la page d’accueil
const Home = () => {
  // État or useState pour gérer la valeur saisie dans la barre de recherche
  const [searchQuery, setSearchQuery] = useState("");
  // État pour afficher des suggestions sous la barre de recherche
  const [suggestions, setSuggestions] = useState([]);
  // Hook pour rediriger l’utilisateur
  const navigate = useNavigate();

  // Fonction déclenchée quand on appuie sur "Entrée" dans la barre de recherche
  const handleSearch = async (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      // Si on a tapé quelque chose, on lance la redirection
      redirectToGroup(searchQuery);
    }
  };

  // Fonction qui envoie la requête au chatbot et redirige vers un groupe si trouvé
  const redirectToGroup = async (keyword) => {
    try {
      const res = await axios.post("http://localhost:5000/api/chatbot/ask", {
        message: keyword, // On envoie le mot-clé au backend
      });

      const { group, groupId, image } = res.data; // On récupère les données du groupe depuis la réponse

      if (group && groupId) {
        // Si le backend a trouvé un groupe correspondant
        navigate(`/group-chat/${groupId}`, {
          // Redirection vers le chat du groupe
          state: {
            name: group,
            image: image || "/images/group-placeholder.png", // Image par défaut si aucune image
            groupId,
          },
        });
        // On vide la recherche et les suggestions
        setSearchQuery("");
        setSuggestions([]);
      } else {
        // Si aucun groupe trouvé
        alert("Aucun groupe trouvé.");
      }
    } catch (err) {
      console.error("Erreur lors de la redirection vers le groupe :", err);
    }
  };

  // Fonction utilisée quand l'utilisateur clique sur le bouton "Join"
  const handleJoinGroup = (groupKeyword) => {
    redirectToGroup(groupKeyword); // On redirige comme dans la barre de recherche
  };

  // this is a hook too=>Effet déclenché à chaque fois que la valeur de searchQuery change
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Attente de 200ms avant d'afficher les suggestions
      if (searchQuery.trim()) {
        setSuggestions([searchQuery]); // Pour l’instant on simule avec une seule suggestion
      } else {
        setSuggestions([]);
      }
    }, 200);
    return () => clearTimeout(timeout); // Nettoyage pour éviter les effets indésirables
  }, [searchQuery]);

  // Rendu de la page for styled component ou composant personalisé
  return (
    <AppContainer>
      <Navbar />
      <Header>
        <h4>Vivez en meilleure santé</h4>
        <SearchBar
          placeholder="🔍 Rechercher"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Mise à jour de la recherche
          onKeyDown={handleSearch} // Appuie sur Entrée
        />
        {suggestions.length > 0 && (
          <SuggestionsContainer>
            {suggestions.map((text, index) => (
              <SuggestionItem key={index} onClick={() => redirectToGroup(text)}>
                {text}
              </SuggestionItem>
            ))}
          </SuggestionsContainer>
        )}
      </Header>

      <ForumSection>
        <GroupSlider>
          {/* Carte pour le groupe Cancer */}
          
          <GroupCard>
            <GroupText>
              <h6>Cancer Support</h6>
              <p>Connect with others fighting cancer.</p>
              <JoinButton onClick={() => handleJoinGroup("cancer")}>
                Join
              </JoinButton>
            </GroupText>
            <GroupImage src="/images/cancer-support.png" alt="Cancer Support" />
          </GroupCard>

          {/* Carte pour le groupe Diabète */}
          <GroupCard>
            <GroupText>
              <h6>Diabetes Support</h6>
              <p>Manage and share diabetes experiences.</p>
              <JoinButton onClick={() => handleJoinGroup("diabetes")}>
                Join
              </JoinButton>
            </GroupText>
            <GroupImage
              src="/images/diabetes-support.png"
              alt="Diabetes Support"
            />
          </GroupCard>
        </GroupSlider>
      </ForumSection>

      {/* Section conseils de santé */}
      <TipSection>
        <TipImage src="/images/mental-health-support.png" alt="Health Tip" />
        <TipContent>
          <h6>Health tips from doctors</h6>
          <p>Discover expert advice to improve your well-being.</p>
          <ReadMoreButton>Read More</ReadMoreButton>
        </TipContent>
      </TipSection>

      <TipSection>
        <TipImage
          src="/images/heart-disease-support.png"
          alt="Nutrition Advice"
        />
        <TipContent>
          <h6>Nutrition Advice</h6>
          <p>Learn about healthy eating habits for better health.</p>
          <ReadMoreButton>Read More</ReadMoreButton>
        </TipContent>
      </TipSection>
    </AppContainer>
  );
};

export default Home;

// ✅ Styled Components
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: white;
  height: 860px;
  width: 314px;
  border-radius: 40px;
  max-width: 100vw;
  overflow: hidden;
  position: relative;
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  padding: 70px 40px;
  color: white;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  background: linear-gradient(150deg, #008aff, #00c6ff, #f6b93b);
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
`;

const SearchBar = styled.input`
  width: 95%;
  height: 10%;
  padding: 10px;
  border-radius: 25px;
  border: none;
  outline: none;
  font-size: 14px;
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const SuggestionsContainer = styled.div`
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, 0);
  width: 90%;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;
`;

const SuggestionItem = styled.div`
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
  text-align: left;
  color: #333;

  &:hover {
    background: #f0f0f0;
  }
`;

const ForumSection = styled.div`
  position: relative;
  width: 100%;
  margin-top: -40px;
`;

const GroupSlider = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  overflow-x: auto;
  padding: 10px;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const GroupCard = styled.div`
  display: flex;
  align-items: center;
  background: white;
  padding: 14px;
  border-radius: 18px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.12);
  min-width: 260px;
  height: 85px;
  font-size: 12px;
  justify-content: space-between;
  flex-shrink: 0;
`;

const GroupText = styled.div`
  flex: 1;
  text-align: left;
  padding-right: 10px;

  h6 {
    font-size: 15px;
    margin: 0;
    font-weight: bold;
  }

  p {
    font-size: 11px;
    margin: 4px 0;
    color: #666;
  }
`;

const GroupImage = styled.img`
  width: 55px;
  height: 55px;
  border-radius: 8px;
`;

const JoinButton = styled.button`
  background: #78cdd7;
  color: white;
  padding: 6px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 80px;
  font-size: 12px;

  &:hover {
    background: linear-gradient(150deg, #007be6, #00baff, #e5a62b);
  }
`;

const TipSection = styled.div`
  display: flex;
  background: white;
  padding: 12px;
  border-radius: 12px;
  margin-top: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.12);
  width: 100%;
  font-size: 12px;
`;

const TipImage = styled.img`
  width: 70px;
  height: 70px;
  object-fit: contain;
  border-radius: 12px;
  margin-right: 12px;
  background: #f1f1f1;
  padding: 6px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
`;

const TipContent = styled.div`
  flex: 1;
  padding-left: 6px;
  text-align: left;
  font-size: 12px;
`;

const ReadMoreButton = styled.button`
  background: #78cdd7;
  color: white;
  padding: 6px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  font-size: 12px;

  &:hover {
    background: linear-gradient(150deg, #007be6, #00baff, #e5a62b);
  }
`;
