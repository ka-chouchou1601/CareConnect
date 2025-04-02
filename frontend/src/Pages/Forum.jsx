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
        console.error("❌ Erreur lors du chargement des groupes :", err);
      }
    };
    fetchGroups();
  }, []);

  const navigateToGroup = (group) => {
    navigate(`/group-chat/${group._id}`, {
      state: {
        name: group.name,
        image: group.image,
        groupId: group._id,
      },
    });
  };

  // ✅ Attribution dynamique des avatars (sans image par défaut)
  const getAvatar = (name) => {
    const lowerName = name.toLowerCase();
    const femaleNames = ["alice", "diana", "eve", "lucy", "sarah", "nina", "nana"];
    const maleNames = ["bob", "florien", "nicolas", "alex", "luc", "marc","tomtom"];

    if (femaleNames.includes(lowerName)) {
      return "/images/woman-avatar.png";
    } else if (maleNames.includes(lowerName)) {
      return "/images/man-avatar.png";
    } else {
      return null; // Pas d’image
    }
  };

  return (
    <ForumContainer>
      <Navbar />
      <Title>Groupes de soutien</Title>

      <GroupList>
        {groups.map((group) => (
          <GroupCard key={group._id}>
            <GroupImage
              src={group.image || "/images/group-placeholder.png"}
              alt={group.name}
            />
            <GroupContent>
              <h3>{group.name}</h3>
              <p>{group.description}</p>

              <Members>
                {group.members.map((member, i) => {
                  const avatar = getAvatar(member);
                  return (
                    <Member key={i}>
                      {avatar && <MemberAvatar src={avatar} />}
                      <span>{member}</span>
                    </Member>
                  );
                })}
              </Members>

              <JoinButton onClick={() => navigateToGroup(group)}>
                Join
              </JoinButton>
            </GroupContent>
          </GroupCard>
        ))}
      </GroupList>
    </ForumContainer>
  );
};

export default Forum;

// ✅ Composants stylisés
const ForumContainer = styled.div`
  padding: 20px;
  background: #f8f9fa;
  min-height: 100vh;
`;

const Title = styled.h2`
  text-align: center;
  color: #007be6;
  font-size: 18px;
  font-weight: 600;
  margin-top: 80px;
  margin-bottom: 20px;
  background: white;
  padding: 10px 0;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.06);
`;

const GroupList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const GroupCard = styled.div`
  display: flex;
  background: white;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.08);
  align-items: flex-start;
`;

const GroupImage = styled.img`
  width: 65px;
  height: 65px;
  border-radius: 12px;
  object-fit: cover;
  margin-right: 15px;
`;

const GroupContent = styled.div`
  flex: 1;

  h3 {
    margin: 0;
    font-size: 16px;
    color: #333;
  }

  p {
    margin: 4px 0;
    font-size: 13px;
    color: #666;
  }
`;

const Members = styled.div`
  display: flex;
  gap: 10px;
  margin: 8px 0;
  flex-wrap: wrap;
`;

const Member = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  background: #f1f1f1;
  padding: 4px 8px;
  border-radius: 8px;
`;

const MemberAvatar = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 6px;
  border-radius: 50%;
`;

const JoinButton = styled.button`
  background: #007be6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  margin: 12px auto 0 auto;
  display: block;
  width: fit-content;
  min-width: 170px;

  &:hover {
    background: #005bbf;
  }
`;



