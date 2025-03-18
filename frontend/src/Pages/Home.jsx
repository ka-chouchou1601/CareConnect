import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Home = () => {
  return (
    <Container>
      <Header>
        <Logo src="/logo.png" alt="CareConnect" />
        <ProfileCircle />
      </Header>

      <WelcomeText>Find Support & Connect</WelcomeText>

      <CardContainer>
        <StyledLink to="/forum">
          <HomeCard>
            <h4>Join a Forum</h4>
            <p>Find support groups based on your health needs.</p>
          </HomeCard>
        </StyledLink>
        <StyledLink to="/chatbot">
          <HomeCard>
            <h4>Chat with AI</h4>
            <p>Get instant answers and guidance.</p>
          </HomeCard>
        </StyledLink>
      </CardContainer>
    </Container>
  );
};

export default Home;

/* Styled Components */
const Container = styled.div`
  padding: 20px;
  text-align: center;
  background: #f8f9fa;
  height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  width: 100px;
`;

const ProfileCircle = styled.div`
  width: 40px;
  height: 40px;
  background: gray;
  border-radius: 50%;
`;

const WelcomeText = styled.h2`
  font-size: 20px;
  margin: 20px 0;
  font-weight: bold;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const HomeCard = styled.div`
  background: white;
  padding: 15px;
  border-radius: 10px;
  text-decoration: none;
  color: black;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #e2e6ea;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
