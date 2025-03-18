import React from "react";
import styled from "styled-components";

const Login = () => {
  return (
    <Container>
      <Title>Login</Title>
      <Form>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button>Login</Button>
      </Form>
    </Container>
  );
};

export default Login;

/* Styled Components */
const Container = styled.div`
  padding: 20px;
  text-align: center;
  background: #f8f9fa;
  height: 100vh;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
