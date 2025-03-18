import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Home = () => {
  return (
    <AppContainer>
      {/* Forum Section with Background */}
      <ForumSection>
        <ForumBackground>
          <ForumContent>
            <h3>Popular Support Groups</h3>
            <ForumArrow to="/forum">➡</ForumArrow>
          </ForumContent>
        </ForumBackground>
      </ForumSection>

      {/* Support Groups - Cancer & Diabetes */}
      <GroupSlider>
        <GroupCard>
          <GroupImage src="/cancer-support.png" alt="Cancer Support" />
          <h4>Cancer Support</h4>
          <p>Connect with others fighting cancer.</p>
          <JoinButton>Join</JoinButton>
        </GroupCard>
        <GroupCard>
          <GroupImage src="/diabetes-support.png" alt="Diabetes Support" />
          <h4>Diabetes Support</h4>
          <p>Manage and share diabetes experiences.</p>
          <JoinButton>Join</JoinButton>
        </GroupCard>
      </GroupSlider>

      {/* Health Tips Section */}
      <TipSection>
        <TipImage src="/health-tip1.png" alt="Health Tip" />
        <TipContent>
          <h4>Health tips from doctors</h4>
          <p>Discover expert advice to improve your well-being.</p>
          <ReadMoreButton>Read More</ReadMoreButton>
        </TipContent>
      </TipSection>

      <TipSection>
        <TipImage src="/health-tip2.png" alt="Another Health Tip" />
        <TipContent>
          <h4>Nutrition Advice</h4>
          <p>Learn about healthy eating habits for better health.</p>
          <ReadMoreButton>Read More</ReadMoreButton>
        </TipContent>
      </TipSection>
    </AppContainer>
  );
};

export default Home;

// Styled Components
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  text-align: center;
  background: #f8f9fa;
  height: 860px;
  width: 450px;
  border-radius: 25px;
  border: 5px;
  overflow: hidden;
  position: relative;
`;

const ForumSection = styled.div`
  width: 100%;
  position: relative;
`;

const ForumBackground = styled.div`
  background: url("/forum-background.jpg") no-repeat center center;
  background-size: cover;
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-radius: 8px;
`;

const ForumContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: white;
  font-weight: bold;
  padding: 8px 12px;
`;

const ForumArrow = styled(Link)`
  font-size: 24px;
  color: #45b8ac;
  text-decoration: none;
  font-weight: bold;
`;

const GroupSlider = styled.div`
  display: flex;
  gap: 8px;
  padding: 8px;
  width: 100%;
  overflow-x: auto;
`;

const GroupCard = styled.div`
  background: white;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  min-width: 170px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const GroupImage = styled.img`
  width: 100%;
  height: 85px;
  border-radius: 8px;
`;

const JoinButton = styled.button`
  background: #45b8ac;
  color: white;
  padding: 7px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  font-size: 14px;
  &:hover {
    background: #37877d;
  }
`;

const TipSection = styled.div`
  display: flex;
  background: white;
  padding: 10px;
  border-radius: 8px;
  margin-top: 12px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const TipImage = styled.img`
  width: 85px;
  border-radius: 8px;
`;

const TipContent = styled.div`
  flex: 1;
  padding-left: 8px;
  text-align: left;
  font-size: 14px;
`;

const ReadMoreButton = styled.button`
  background: #78cdd7;
  color: white;
  padding: 7px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  font-size: 14px;
  &:hover {
    background: #5abdc4;
  }
`;
