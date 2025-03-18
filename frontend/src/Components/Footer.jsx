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
        <Link to="/members">
          <FaUsers />
          <span>Membres</span>
        </Link>
      </FooterItem>
      <FooterItem>
        <Link to="/groups">
          <FaComments />
          <span>Groupes</span>
        </Link>
      </FooterItem>
      <FooterItem>
        <Link to="/messages">
          <FaCog />
          <span>Messages</span>
        </Link>
      </FooterItem>
    </FooterContainer>
  );
};

export default Footer;

// 🔹 Styled Components
const FooterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  background: white;
  padding: 10px 0;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
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
