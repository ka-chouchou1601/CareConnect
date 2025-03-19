import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import styled from "styled-components";


const groups = [
  {
    name: "Cancer Support",
    description: "Connect with others fighting cancer.",
    members: ["Alice", "Bob", "Charlie", "Diana"],
    image: "/images/cancer-support.svg",
  },
  {
    name: "Diabetes Support",
    description: "Manage and share diabetes experiences.",
    members: ["Alice", "Bob", "Charlie", "Diana"],
    image: "/images/diabetes-support.svg",
  },
  {
    name: "Heart Disease Support",
    description: "Support for those managing heart disease.",
    members: ["Alice", "Bob", "Charlie", "Diana"],
    image: "/images/heart-disease-support.svg",
  },
  {
    name: "Mental Health Support",
    description: "A safe space for mental health discussions.",
    members: ["Alice", "Bob", "Charlie", "Diana"],
    image: "/images/mental-health-support.svg",
  },
];

const Forum = () => {
  return (
    <ForumContainer>
      <Navbar />
      <h2>Groups</h2>
      {groups.map((group, index) => (
        <GroupCard key={index}>
          <GroupInfo>
            <GroupImage src={group.image} alt={group.name} />
            <div>
              <h3>{group.name}</h3>
              <p>{group.description}</p>
              <MembersContainer>
                {group.members.map((member, i) => (
                  <Member key={i}>
                    <MemberImage src="/images/user-avatar.svg" alt={member} />
                    <span>{member}</span>
                  </Member>
                ))}
              </MembersContainer>
              {/* ✅ Pass Group Name & Image as State */}
              <JoinButton
                to={{
                  pathname: "/group-chat",
                  state: { name: group.name, image: group.image },
                }}
              >
                Join
              </JoinButton>
            </div>
          </GroupInfo>
        </GroupCard>
      ))}
    </ForumContainer>
  );
};

export default Forum;

// ✅ Styled Components
const ForumContainer = styled.div`
  padding: 20px;
  background: white;
`;

const GroupCard = styled.div`
  background: white;
  padding: 14px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.12);
  margin-bottom: 15px;
`;

const GroupInfo = styled.div`
  display: flex;
  align-items: center;
`;

const GroupImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 12px;
`;

const MembersContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 8px 0;
`;

const Member = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
`;

const MemberImage = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 5px;
`;

const JoinButton = styled(Link)`
  display: inline-block;
  background: #008aff;
  color: white;
  padding: 8px;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
  font-weight: bold;
`;
