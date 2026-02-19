import React, { useState, useRef } from "react";
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

const FileInput = styled.div`
  position: relative;
  padding: 20px;
  background: #000000ad;
  border: 2px dashed #ccc;
  border-radius: 10px;
  color: #aaa;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s;
  &:hover {
    border-color: var(--purple-color);
  }
  input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
  }
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 5px;
`;

const PreviewItem = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #444;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RemoveBtn = styled.button`
  position: absolute;
  top: 2px;
  right: 2px;
  background: rgba(255, 0, 0, 0.8);
  color: white;
  border: none;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: #333;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 5px;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: var(--purple-color);
  border-radius: 3px;
  transition: width 0.3s ease;
  width: ${(props) => props.$percent}%;
`;

const ProgressText = styled.p`
  color: #aaa;
  font-size: 13px;
  text-align: center;
  margin: 0;
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

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

const AdminProjectForm = ({ adminPassword }) => {
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [uploadProgress, setUploadProgress] = useState("");
  const [uploadPercent, setUploadPercent] = useState(0);

  const [title, setTitle] = useState("");
  const [titleFr, setTitleFr] = useState("");
  const [titleKo, setTitleKo] = useState("");
  const [descEn, setDescEn] = useState("");
  const [descFr, setDescFr] = useState("");
  const [descKo, setDescKo] = useState("");
  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [carouselFiles, setCarouselFiles] = useState([]);
  const [carouselPreviews, setCarouselPreviews] = useState([]);
  const [stack, setStack] = useState("Frontend");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [projectLink, setProjectLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [technologies, setTechnologies] = useState([]);

  const mainInputRef = useRef(null);
  const carouselInputRef = useRef(null);

  const toggleTech = (tech) => {
    setTechnologies((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const handleMainImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setMainImageFile(file);
    setMainImagePreview(URL.createObjectURL(file));
  };

  const removeMainImage = () => {
    setMainImageFile(null);
    setMainImagePreview("");
    if (mainInputRef.current) mainInputRef.current.value = "";
  };

  const handleCarouselFiles = (e) => {
    const newFiles = Array.from(e.target.files);
    if (!newFiles.length) return;
    setCarouselFiles((prev) => [...prev, ...newFiles]);
    setCarouselPreviews((prev) => [
      ...prev,
      ...newFiles.map((f) => URL.createObjectURL(f)),
    ]);
    if (carouselInputRef.current) carouselInputRef.current.value = "";
  };

  const removeCarouselImage = (index) => {
    setCarouselFiles((prev) => prev.filter((_, i) => i !== index));
    setCarouselPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("adminPassword", adminPassword);

    const res = await fetch(`${SUPABASE_URL}/functions/v1/upload-image`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Upload failed");
    return data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    setUploadProgress("");
    setUploadPercent(0);

    try {
      const totalUploads =
        (mainImageFile ? 1 : 0) + carouselFiles.length;
      let uploaded = 0;

      let imageUrl = null;
      if (mainImageFile) {
        setUploadProgress(`Uploading main image...`);
        imageUrl = await uploadImage(mainImageFile);
        uploaded++;
        setUploadPercent(Math.round((uploaded / totalUploads) * 100));
      }

      const carouselUrls = [];
      for (let i = 0; i < carouselFiles.length; i++) {
        setUploadProgress(
          `Uploading carousel image ${i + 1}/${carouselFiles.length}...`
        );
        const url = await uploadImage(carouselFiles[i]);
        carouselUrls.push(url);
        uploaded++;
        setUploadPercent(Math.round((uploaded / totalUploads) * 100));
      }

      setUploadProgress("Saving project...");
      setUploadPercent(100);

      const body = {
        adminPassword,
        title,
        title_fr: titleFr || null,
        title_ko: titleKo || null,
        description_en: descEn,
        description_fr: descFr || null,
        description_ko: descKo || null,
        image_url: imageUrl,
        stack,
        images_carousel: carouselUrls,
        year,
        project_link: projectLink || null,
        github_link: githubLink || null,
        technologies,
      };

      const res = await fetch(
        `${SUPABASE_URL}/functions/v1/add-project`,
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
      setUploadProgress("");
      setUploadPercent(0);
      setTitle("");
      setTitleFr("");
      setTitleKo("");
      setDescEn("");
      setDescFr("");
      setDescKo("");
      setMainImageFile(null);
      setMainImagePreview("");
      setCarouselFiles([]);
      setCarouselPreviews([]);
      setStack("Frontend");
      setYear(new Date().getFullYear().toString());
      setProjectLink("");
      setGithubLink("");
      setTechnologies([]);
      if (mainInputRef.current) mainInputRef.current.value = "";
      if (carouselInputRef.current) carouselInputRef.current.value = "";
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Network error");
      setUploadProgress("");
      setUploadPercent(0);
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
      <Label>Main image</Label>
      <FileInput>
        {mainImagePreview ? "Change main image..." : "Click to select main image..."}
        <input
          ref={mainInputRef}
          type="file"
          accept="image/*"
          onChange={handleMainImage}
        />
      </FileInput>
      {mainImagePreview && (
        <PreviewContainer>
          <PreviewItem>
            <img src={mainImagePreview} alt="Main preview" />
            <RemoveBtn type="button" onClick={removeMainImage}>
              x
            </RemoveBtn>
          </PreviewItem>
        </PreviewContainer>
      )}

      <Label>Carousel images</Label>
      <FileInput>
        Click to add carousel images...
        <input
          ref={carouselInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleCarouselFiles}
        />
      </FileInput>
      {carouselPreviews.length > 0 && (
        <PreviewContainer>
          {carouselPreviews.map((src, i) => (
            <PreviewItem key={i}>
              <img src={src} alt={`Carousel ${i + 1}`} />
              <RemoveBtn type="button" onClick={() => removeCarouselImage(i)}>
                x
              </RemoveBtn>
            </PreviewItem>
          ))}
        </PreviewContainer>
      )}

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
      {status === "sending" && uploadProgress && (
        <>
          <ProgressText>{uploadProgress}</ProgressText>
          <ProgressBar>
            <ProgressFill $percent={uploadPercent} />
          </ProgressBar>
        </>
      )}
      {status === "success" && <Message>Project added successfully!</Message>}
      {status === "error" && <Message $isError>{errorMsg}</Message>}
    </Form>
  );
};

export default AdminProjectForm;
