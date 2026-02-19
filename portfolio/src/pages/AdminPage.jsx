import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import AdminProjectForm from "../components/AdminProjectForm";
import { supabase } from "../lib/supabaseClient";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

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
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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

const ProjectList = styled.div`
  width: 90%;
  max-width: 700px;
  margin-bottom: 30px;
`;

const ProjectListTitle = styled.h2`
  color: var(--purple-color);
  margin-bottom: 15px;
  font-size: 20px;
`;

const ProjectRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 15px;
  background: #000000ad;
  border: 1px solid #333;
  border-radius: 10px;
  margin-bottom: 8px;
`;

const ProjectInfo = styled.div`
  color: white;
  font-size: 14px;
  flex: 1;
  min-width: 0;
`;

const ProjectName = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const ProjectYear = styled.span`
  color: #aaa;
  font-size: 13px;
`;

const RowButtons = styled.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  margin-left: 10px;
`;

const SmallButton = styled.button`
  padding: 6px 14px;
  border: none;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
  }
`;

const EditButton = styled(SmallButton)`
  background: var(--purple-color);
  color: white;
`;

const DeleteButton = styled(SmallButton)`
  background: #ff4444;
  color: white;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #333;
  width: 90%;
  max-width: 700px;
  margin: 20px 0;
`;

const FormModeTitle = styled.h2`
  color: white;
  margin-bottom: 10px;
  font-size: 20px;
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  background: transparent;
  color: #aaa;
  border: 1px solid #555;
  border-radius: 50px;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 15px;
  transition: all 0.3s ease;
  &:hover {
    border-color: #aaa;
    color: white;
  }
`;

const ArrowButton = styled.button`
  background: transparent;
  border: 1px solid #555;
  color: #aaa;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  padding: 0;
  transition: all 0.2s ease;
  &:hover:not(:disabled) {
    border-color: var(--purple-color);
    color: white;
  }
  &:disabled {
    opacity: 0.2;
    cursor: default;
  }
`;

const OrderButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-right: 10px;
  flex-shrink: 0;
`;

const AdminPage = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoadingProjects(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) {
      setProjects(data);
    }
    setLoadingProjects(false);
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchProjects();
    }
  }, [authenticated, fetchProjects]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password.trim()) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Please enter a password.");
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
  };

  const handleDelete = async (project) => {
    if (!window.confirm(`Delete "${project.title}"? This cannot be undone.`)) {
      return;
    }

    setDeletingId(project.id);
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/delete-project`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminPassword: password, id: project.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to delete project");
      } else {
        if (editingProject && editingProject.id === project.id) {
          setEditingProject(null);
        }
        await fetchProjects();
      }
    } catch (err) {
      alert(err.message || "Network error");
    }
    setDeletingId(null);
  };

  const handleFormSuccess = () => {
    setEditingProject(null);
    fetchProjects();
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
        <>
          <ProjectList>
            <ProjectListTitle>Existing Projects</ProjectListTitle>
            {loadingProjects ? (
              <ProjectInfo>Loading...</ProjectInfo>
            ) : projects.length === 0 ? (
              <ProjectInfo>No projects found.</ProjectInfo>
            ) : (
              projects.map((p) => (
                <ProjectRow key={p.id}>
                  <ProjectInfo>
                    <ProjectName>{p.title}</ProjectName>
                    <ProjectYear>{p.year}</ProjectYear>
                  </ProjectInfo>
                  <RowButtons>
                    <EditButton onClick={() => handleEdit(p)}>Edit</EditButton>
                    <DeleteButton
                      onClick={() => handleDelete(p)}
                      disabled={deletingId === p.id}
                    >
                      {deletingId === p.id ? "..." : "Delete"}
                    </DeleteButton>
                  </RowButtons>
                </ProjectRow>
              ))
            )}
          </ProjectList>

          <Divider />

          {editingProject ? (
            <>
              <FormModeTitle>Edit: {editingProject.title}</FormModeTitle>
              <CancelButton onClick={handleCancelEdit}>
                Cancel editing
              </CancelButton>
              <AdminProjectForm
                key={editingProject.id}
                adminPassword={password}
                project={editingProject}
                onSuccess={handleFormSuccess}
              />
            </>
          ) : (
            <>
              <FormModeTitle>Add New Project</FormModeTitle>
              <AdminProjectForm
                adminPassword={password}
                onSuccess={handleFormSuccess}
              />
            </>
          )}
        </>
      )}
      <BackLink href="#">&larr; Back to site</BackLink>
    </PageContainer>
  );
};

export default AdminPage;
