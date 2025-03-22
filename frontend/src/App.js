import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
//import Navbar from "./Components/Navbar";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Forum from "./Pages/Forum";
import GroupeChat from "./Pages/GroupeChat";
import Messages from "./Pages/Messages";
import Settings from "./Pages/Settings";
import Chatbot from "./Pages/Chatbot"; // ✅ Added chatbot

const App = () => {
  return (
    <Router>
      <AppWrapper>
        <MobileFrame>
          <MainContent>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/group-chat" element={<GroupeChat />} />
              <Route
                path="/group-chat/:groupId"
                element={<GroupeChat />}
              />{" "}
              {/* ✅ Handle chatbot link */}
              <Route path="/settings" element={<Settings />} />
              <Route path="/chatbot" element={<Chatbot />} />{" "}
              {/* ✅ New route */}
            </Routes>
          </MainContent>
          <Footer />
        </MobileFrame>
      </AppWrapper>
    </Router>
  );
};

export default App;

/* ✅ Styled Components */
const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #f0f2f5;
`;

const MobileFrame = styled.div`
  width: 320px;
  height: 680px;
  max-width: 100%;
  margin: 0 auto;
  border-radius: 40px;
  border: 5px solid black;
  max-width: 100vw;
  overflow-x: hidden;
  overflow: hidden;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
  background-color: white;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const MainContent = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding-bottom: 60px;
`;
