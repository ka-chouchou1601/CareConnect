// ✅ Forum.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Forum = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/forums");
        setGroups(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch groups:", err);
      }
    };
    fetchGroups();
  }, []);

  const navigateToGroup = (group) => {
    navigate("/group-chat", {
      state: {
        name: group.name,
        image: group.image,
        groupId: group._id,
      },
    });
  };

  return (
    <ForumContainer>
      <Navbar />
      <h2>Groups</h2>
      {groups.map((group) => (
        <GroupCard key={group._id}>
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
              <JoinButton onClick={() => navigateToGroup(group)}>
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
const JoinButton = styled.button`
  display: inline-block;
  background: #008aff;
  color: white;
  padding: 8px;
  border-radius: 5px;
  font-weight: bold;
  border: none;
  cursor: pointer;
`;
