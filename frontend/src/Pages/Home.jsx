import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Home = () => {
  return (
    <AppContainer>
      <Header>
        <h8>Vivez en meilleure santé</h8>
        <SearchBar placeholder="🔍 Rechercher" />
      </Header>

      <ForumSection>
        <GroupSlider>
          <GroupCard>
            <GroupText>
              <h6>Cancer Support</h6>
              <p>Connect with others fighting cancer.</p>
              <JoinButton>Join</JoinButton>
            </GroupText>
            <GroupImage src="/images/cancer-support.svg" alt="Cancer Support" />
          </GroupCard>

          <GroupCard>
            <GroupText>
              <h6>Diabetes Support</h6>
              <p>Manage and share diabetes experiences.</p>
              <JoinButton>Join</JoinButton>
            </GroupText>
            <GroupImage
              src="/images/diabetes-support.svg"
              alt="Diabetes Support"
            />
          </GroupCard>
        </GroupSlider>
      </ForumSection>

      <TipSection>
        <TipImage src="/images/health-tip1.svg" alt="Health Tip" />
        <TipContent>
          <h6>Health tips from doctors</h6>
          <p>Discover expert advice to improve your well-being.</p>
          <ReadMoreButton>Read More</ReadMoreButton>
        </TipContent>
      </TipSection>

      <TipSection>
        <TipImage src="/images/health-tip2.svg" alt="Another Health Tip" />
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

// ✅ **Styled Components**
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
  width: 100%;
  padding: 90px 100px;
  color: white;
  text-align: center;
  font-size: 16px;
  font-weight: bold;

  /* ✅ Smooth Doctolib-like Gradient */
  background: linear-gradient(150deg, #008aff, #00c6ff, #f6b93b);
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
`;

const SearchBar = styled.input`
  width: 85%;
  padding: 10px;
  border-radius: 25px;
  border: none;
  outline: none;
  font-size: 14px;
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const ForumSection = styled.div`
  position: relative;
  width: 100%;
  margin-top: -40px; /* ✅ Moves cards closer to gradient */
`;

const GroupSlider = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  overflow-x: auto;
  padding: 10px;
  scroll-behavior: smooth;

  /* ✅ Hide scrollbar but keep scrolling */
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
  background: #008aff;
  color: white;
  padding: 6px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 80px;
  font-size: 12px;
  &:hover {
    background: #0070e0;
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
  border-radius: 8px;
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
    background: #5abdc4;
  }
`;
