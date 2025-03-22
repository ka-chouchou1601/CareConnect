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
          <img src="/logo.png" alt="CareConnect" />
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
`;

const NavContent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  img {
    width: 120px;
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
  padding-left: 20px;

  &.open {
    left: 0;
  }
`;

const NavItem = styled.li`
  padding: 16px 0;
  font-size: 18px;
  list-style: none;

  a {
    text-decoration: none;
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
`;
