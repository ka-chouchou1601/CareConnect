import React, { useState } from "react";
import styled from "styled-components";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <NavContainer>
      <Logo>
        <img src="/logo.png" alt="CareConnect" />
      </Logo>

      <Hamburger onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </Hamburger>

      <NavMenu className={menuOpen ? "open" : ""}>
        <NavItem>
          <Link to="/">🏠 Accueil</Link>
        </NavItem>
        <NavItem>
          <Link to="/forum">💬 Forum</Link>
        </NavItem>
        <NavItem>
          <Link to="/messages">📩 Messages</Link>
        </NavItem>
        <NavItem>
          <Link to="/settings">⚙️ Paramètres</Link>
        </NavItem>
      </NavMenu>
    </NavContainer>
  );
};

export default Navbar;

// 🔹 Styled Components
const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #6bc7d3;
  padding: 10px 20px;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
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
  width: 70%;
  height: 100vh;
  background: #6bc7d3;
  padding-top: 60px;
  transition: 0.3s;

  &.open {
    left: 0;
  }
`;

const NavItem = styled.li`
  padding: 15px;
  font-size: 18px;
  list-style: none;

  a {
    text-decoration: none;
    color: white;
    font-weight: bold;
  }
`;
