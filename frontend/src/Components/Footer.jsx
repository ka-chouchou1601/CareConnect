import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaHome, FaUsers, FaComments, FaCog } from "react-icons/fa";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterItem>
        <Link to="/">
          <FaHome />
          <span>Accueil</span>
        </Link>
      </FooterItem>
      <FooterItem>
        <Link to="/forum">
          <FaUsers />
          <span>Groupes</span> {/* ✅ Updated label */}
        </Link>
      </FooterItem>
      <FooterItem>
        <Link to="/chatbot">
          <FaComments />
          <span>Chatbot</span>
        </Link>
      </FooterItem>
      <FooterItem>
        <Link to="/settings">
          <FaCog />
          <span>Paramètre</span>
        </Link>
      </FooterItem>
    </FooterContainer>
  );
};

export default Footer;

// ✅ Styled Components (No change needed)
const FooterContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 70px;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #ddd;
  padding: 10px 0;
`;

const FooterItem = styled.div`
  text-align: center;
  flex: 1;

  a {
    text-decoration: none;
    color: #6bc7d3;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  span {
    font-size: 12px;
  }
`;
