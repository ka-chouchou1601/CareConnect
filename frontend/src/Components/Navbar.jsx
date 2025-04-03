import React, { useState } from "react";
import styled from "styled-components";
import { FaBars, FaTimes, FaPowerOff } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <NavContainer>
      <NavContent>
        <Logo>
          <img src="images/logo.png" alt="CareConnect" />
        </Logo>

        <Hamburger onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </Hamburger>
      </NavContent>

      <NavMenu className={menuOpen ? "open" : ""}>
        <NavItem>
          <Link to="/">🏠 Accueil</Link>
        </NavItem>
        <NavItem>
          <Link to="/forum">👥 Trouver votre communauté</Link>
        </NavItem>
        <NavItem>
          <Link to="/health">➕ Renseignez sur votre santé</Link>
        </NavItem>
        <NavItem>
          <Link to="/associations">🏢 Associations partenaires</Link>
        </NavItem>
        <NavItem>
          <Link to="/settings">⚙️ Paramètres</Link>
        </NavItem>
        <NavItem>
          <LogoutButton onClick={handleLogout}>⏻ Se déconnecter</LogoutButton>
        </NavItem>
      </NavMenu>
    </NavContainer>
  );
};

export default Navbar;

// Styled Components
// ✅ Styled Components
const NavContainer = styled.nav`
  background: #6bc7d3;
  padding: 10px 20px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
  max-width: 425px;
`;

const NavContent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background: white;
    padding: 5px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    object-fit: contain;
    margin-top: 10px;
  }
`;

const Hamburger = styled.div`
  font-size: 28px;
  cursor: pointer;
  color: white;
`;

const NavMenu = styled.ul`
  position: fixed;
  top: 0;
  left: -100%;
  width: 75%;
  height: 100vh;
  background: #6bc7d3;
  padding-top: 60px;
  transition: 0.3s ease;
  z-index: 1000;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &.open {
    left: 0;
  }
`;

const NavItem = styled.li`
  width: 100%;
  padding: 16px 0;
  font-size: 18px;
  list-style: none;

  a,
  button {
    text-decoration: none;
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 12px;
    padding-left: 20px;
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    font-family: inherit;
    cursor: pointer;
  }
`;

const LogoutButton = styled.button`
  text-decoration: none;
  color: white;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 12px;
  padding-left: 20px;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  font-family: inherit;
  cursor: pointer;
`;
