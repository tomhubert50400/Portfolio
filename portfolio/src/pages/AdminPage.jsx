import React, { useState } from "react";
import styled from "styled-components";
import AdminProjectForm from "../components/AdminProjectForm";

const PageContainer = styled.div`
  min-height: 100vh;
  background: var(--background-black);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 30px;
`;

const PasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 90%;
  max-width: 400px;
`;

const Input = styled.input`
  padding: 15px;
  background: #000000ad;
  border: 2px solid #ccc;
  border-radius: 10px;
  color: #ffffff;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 15px;
  background: var(--purple-color);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  }
`;

const BackLink = styled.a`
  color: var(--purple-color);
  margin-top: 20px;
  text-decoration: none;
  font-size: 16px;
  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMsg = styled.p`
  color: #ff6b6b;
  font-size: 14px;
`;

const AdminPage = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (password.trim()) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Please enter a password.");
    }
  };

  return (
    <PageContainer>
      <Title>Admin Panel</Title>
      {!authenticated ? (
        <PasswordForm onSubmit={handleLogin}>
          <Input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
          {error && <ErrorMsg>{error}</ErrorMsg>}
        </PasswordForm>
      ) : (
        <AdminProjectForm adminPassword={password} />
      )}
      <BackLink href="#">&larr; Back to site</BackLink>
    </PageContainer>
  );
};

export default AdminPage;
