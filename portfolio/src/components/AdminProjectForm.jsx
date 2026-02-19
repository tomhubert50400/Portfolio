import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 700px;
  gap: 15px;
`;

const Label = styled.label`
  color: white;
  font-size: 14px;
  margin-bottom: -10px;
`;

const Input = styled.input`
  padding: 12px;
  background: #000000ad;
  border: 2px solid #ccc;
  border-radius: 10px;
  color: #ffffff;
  font-size: 16px;
`;

const Textarea = styled.textarea`
  padding: 12px;
  background: #000000ad;
  border: 2px solid #ccc;
  border-radius: 10px;
  color: #ffffff;
  font-size: 16px;
  resize: vertical;
`;

const Select = styled.select`
  padding: 12px;
  background: #000000ad;
  border: 2px solid #ccc;
  border-radius: 10px;
  color: #ffffff;
  font-size: 16px;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const CheckboxLabel = styled.label`
  color: white;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
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

const Message = styled.p`
  color: ${(props) => (props.$isError ? "#ff6b6b" : "#6bff6b")};
  font-size: 16px;
  text-align: center;
`;

const SectionTitle = styled.h3`
  color: var(--purple-color);
  margin-top: 10px;
  margin-bottom: -5px;
`;

const TECH_OPTIONS = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Node",
  "Figma",
  "Sass",
  "Git",
  "Database",
];

const STACK_OPTIONS = [
  "Frontend",
  "Backend",
  "Frontend & Backend",
  "Frontend & SEO",
];

const AdminProjectForm = ({ adminPassword }) => {
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [title, setTitle] = useState("");
  const [titleFr, setTitleFr] = useState("");
  const [titleKo, setTitleKo] = useState("");
  const [descEn, setDescEn] = useState("");
  const [descFr, setDescFr] = useState("");
  const [descKo, setDescKo] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [carouselUrls, setCarouselUrls] = useState("");
  const [stack, setStack] = useState("Frontend");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [projectLink, setProjectLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [technologies, setTechnologies] = useState([]);

  const toggleTech = (tech) => {
    setTechnologies((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const imagesCarousel = carouselUrls
      .split("\n")
      .map((u) => u.trim())
      .filter(Boolean);

    const body = {
      adminPassword,
      title,
      title_fr: titleFr || null,
      title_ko: titleKo || null,
      description_en: descEn,
      description_fr: descFr || null,
      description_ko: descKo || null,
      image_url: imageUrl || null,
      stack,
      images_carousel: imagesCarousel,
      year,
      project_link: projectLink || null,
      github_link: githubLink || null,
      technologies,
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/add-project`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "An error occurred");
        return;
      }

      setStatus("success");
      setTitle("");
      setTitleFr("");
      setTitleKo("");
      setDescEn("");
      setDescFr("");
      setDescKo("");
      setImageUrl("");
      setCarouselUrls("");
      setStack("Frontend");
      setYear(new Date().getFullYear().toString());
      setProjectLink("");
      setGithubLink("");
      setTechnologies([]);
    } catch {
      setStatus("error");
      setErrorMsg("Network error");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <SectionTitle>Titles</SectionTitle>
      <Label>Title (EN) *</Label>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Project title (English)"
        required
      />
      <Label>Title (FR)</Label>
      <Input
        value={titleFr}
        onChange={(e) => setTitleFr(e.target.value)}
        placeholder="Titre du projet (Français)"
      />
      <Label>Title (KO)</Label>
      <Input
        value={titleKo}
        onChange={(e) => setTitleKo(e.target.value)}
        placeholder="프로젝트 제목 (한국어)"
      />

      <SectionTitle>Descriptions</SectionTitle>
      <Label>Description (EN) *</Label>
      <Textarea
        rows="3"
        value={descEn}
        onChange={(e) => setDescEn(e.target.value)}
        placeholder="Description (English)"
        required
      />
      <Label>Description (FR)</Label>
      <Textarea
        rows="3"
        value={descFr}
        onChange={(e) => setDescFr(e.target.value)}
        placeholder="Description (Français)"
      />
      <Label>Description (KO)</Label>
      <Textarea
        rows="3"
        value={descKo}
        onChange={(e) => setDescKo(e.target.value)}
        placeholder="설명 (한국어)"
      />

      <SectionTitle>Images</SectionTitle>
      <Label>Main image URL</Label>
      <Input
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="https://i.imgur.com/..."
      />
      <Label>Carousel image URLs (one per line)</Label>
      <Textarea
        rows="4"
        value={carouselUrls}
        onChange={(e) => setCarouselUrls(e.target.value)}
        placeholder={"https://i.imgur.com/img1.png\nhttps://i.imgur.com/img2.png"}
      />

      <SectionTitle>Details</SectionTitle>
      <Label>Stack</Label>
      <Select value={stack} onChange={(e) => setStack(e.target.value)}>
        {STACK_OPTIONS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </Select>
      <Label>Year</Label>
      <Input
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="2025"
      />
      <Label>Project link</Label>
      <Input
        value={projectLink}
        onChange={(e) => setProjectLink(e.target.value)}
        placeholder="https://project.zerqua.com/"
      />
      <Label>GitHub link</Label>
      <Input
        value={githubLink}
        onChange={(e) => setGithubLink(e.target.value)}
        placeholder="https://github.com/tomhubert50400/..."
      />

      <SectionTitle>Technologies</SectionTitle>
      <CheckboxGroup>
        {TECH_OPTIONS.map((tech) => (
          <CheckboxLabel key={tech}>
            <input
              type="checkbox"
              checked={technologies.includes(tech)}
              onChange={() => toggleTech(tech)}
            />
            {tech}
          </CheckboxLabel>
        ))}
      </CheckboxGroup>

      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Adding..." : "Add Project"}
      </Button>
      {status === "success" && <Message>Project added successfully!</Message>}
      {status === "error" && <Message $isError>{errorMsg}</Message>}
    </Form>
  );
};

export default AdminProjectForm;
