import React, { useState, useEffect, useCallback, useRef } from "react";
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

const ListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const ProjectListTitle = styled.h2`
  color: var(--purple-color);
  font-size: 20px;
  margin: 0;
`;

const ProjectRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 15px;
  background: ${(props) => (props.$isDragOver ? "#1a1a2e" : "#000000ad")};
  border: 1px solid ${(props) => (props.$isDragOver ? "var(--purple-color)" : "#333")};
  border-radius: 10px;
  margin-bottom: 8px;
  transition: border-color 0.15s, background 0.15s;
  opacity: ${(props) => (props.$isDragging ? 0.4 : 1)};
`;

const DragHandle = styled.div`
  cursor: grab;
  color: #555;
  font-size: 18px;
  margin-right: 12px;
  flex-shrink: 0;
  user-select: none;
  line-height: 1;
  padding: 4px 2px;
  &:active {
    cursor: grabbing;
  }
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

const SaveOrderButton = styled(Button)`
  padding: 10px 24px;
  font-size: 14px;
  border-radius: 20px;
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

const AdminPage = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const [projects, setProjects] = useState([]);
  const [savedOrder, setSavedOrder] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [savingOrder, setSavingOrder] = useState(false);

  const [dragIndex, setDragIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const dragCounter = useRef({});

  const orderChanged =
    projects.length > 0 &&
    projects.map((p) => p.id).join(",") !== savedOrder.join(",");

  const fetchProjects = useCallback(async () => {
    setLoadingProjects(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("display_order");
    if (!error && data) {
      setProjects(data);
      setSavedOrder(data.map((p) => p.id));
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

  // --- Drag & drop ---
  const handleDragStart = (e, index) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnter = (e, index) => {
    e.preventDefault();
    dragCounter.current[index] = (dragCounter.current[index] || 0) + 1;
    setDragOverIndex(index);
  };

  const handleDragLeave = (e, index) => {
    dragCounter.current[index] = (dragCounter.current[index] || 0) - 1;
    if (dragCounter.current[index] <= 0) {
      dragCounter.current[index] = 0;
      if (dragOverIndex === index) {
        setDragOverIndex(null);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    dragCounter.current = {};
    if (dragIndex === null || dragIndex === dropIndex) {
      setDragIndex(null);
      setDragOverIndex(null);
      return;
    }
    const reordered = [...projects];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(dropIndex, 0, moved);
    setProjects(reordered);
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setDragOverIndex(null);
    dragCounter.current = {};
  };

  const saveOrder = async () => {
    setSavingOrder(true);
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/reorder-projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adminPassword: password,
          orderedIds: projects.map((p) => p.id),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to save order");
      } else {
        setSavedOrder(projects.map((p) => p.id));
      }
    } catch (err) {
      alert(err.message || "Network error");
    }
    setSavingOrder(false);
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
            <ListHeader>
              <ProjectListTitle>Existing Projects</ProjectListTitle>
              {orderChanged && (
                <SaveOrderButton onClick={saveOrder} disabled={savingOrder}>
                  {savingOrder ? "Saving..." : "Save order"}
                </SaveOrderButton>
              )}
            </ListHeader>
            {loadingProjects ? (
              <ProjectInfo>Loading...</ProjectInfo>
            ) : projects.length === 0 ? (
              <ProjectInfo>No projects found.</ProjectInfo>
            ) : (
              projects.map((p, i) => (
                <ProjectRow
                  key={p.id}
                  $isDragging={dragIndex === i}
                  $isDragOver={dragOverIndex === i && dragIndex !== i}
                  onDragEnter={(e) => handleDragEnter(e, i)}
                  onDragLeave={(e) => handleDragLeave(e, i)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, i)}
                >
                  <DragHandle
                    draggable
                    onDragStart={(e) => handleDragStart(e, i)}
                    onDragEnd={handleDragEnd}
                  >
                    &#9776;
                  </DragHandle>
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
