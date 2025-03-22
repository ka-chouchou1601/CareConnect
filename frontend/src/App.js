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

              <Route path="/settings" element={<Settings />} />
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
  width: 320px; /* Standard mobile width */
  height: 680px; /* Standard mobile height */
  max-width: 100%;
  margin: 0 auto; /* Centers the mobile frame */
  border-radius: 40px;
  border: 5px solid black;
  max-width: 100vw; /* Prevents extra width */
  overflow-x: hidden; /* Forces no horizontal overflow */
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
  scrollbar-width: none; /* Hide scrollbar for Firefox */
  -ms-overflow-style: none; /* Hide scrollbar for IE and Edge */
  padding-bottom: 60px; /* Space for footer */
`;
