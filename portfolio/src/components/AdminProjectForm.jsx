import React, { useState, useRef, useEffect, useCallback } from "react";
import styled, { keyframes } from "styled-components";

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

const fadeInOut = keyframes`
  0% { opacity: 0; transform: translateY(10px); }
  15% { opacity: 1; transform: translateY(0); }
  85% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-10px); }
`;

const PasteToast = styled.div`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--purple-color);
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  z-index: 1000;
  animation: ${fadeInOut} 2s ease forwards;
  pointer-events: none;
`;

const PasteHint = styled.span`
  display: block;
  font-size: 12px;
  color: #666;
  margin-top: 4px;
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

const AdminProjectForm = ({ adminPassword, project, onSuccess }) => {
  const isEdit = !!project;

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
  const [existingMainImage, setExistingMainImage] = useState("");
  const [carouselFiles, setCarouselFiles] = useState([]);
  const [carouselPreviews, setCarouselPreviews] = useState([]);
  const [existingCarouselUrls, setExistingCarouselUrls] = useState([]);
  const [stack, setStack] = useState("Frontend");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [projectLink, setProjectLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [technologies, setTechnologies] = useState([]);

  const [pasteToast, setPasteToast] = useState("");

  const mainInputRef = useRef(null);
  const carouselInputRef = useRef(null);
  const formRef = useRef(null);

  const showPasteToast = useCallback((msg) => {
    setPasteToast(msg);
    setTimeout(() => setPasteToast(""), 2000);
  }, []);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.startsWith("image/")) {
          e.preventDefault();
          const file = item.getAsFile();
          if (!file) return;

          const hasMain = !!(mainImageFile || mainImagePreview);
          if (!hasMain) {
            setMainImageFile(file);
            setMainImagePreview(URL.createObjectURL(file));
            setExistingMainImage("");
            showPasteToast("Image pasted as main image");
          } else {
            setCarouselFiles((prev) => [...prev, file]);
            setCarouselPreviews((prev) => [...prev, URL.createObjectURL(file)]);
            showPasteToast("Image pasted to carousel");
          }
          return;
        }
      }
    };

    form.addEventListener("paste", handlePaste);
    return () => form.removeEventListener("paste", handlePaste);
  }, [mainImageFile, mainImagePreview, showPasteToast]);

  useEffect(() => {
    if (project) {
      setTitle(project.title || "");
      setTitleFr(project.title_fr || "");
      setTitleKo(project.title_ko || "");
      setDescEn(project.description_en || "");
      setDescFr(project.description_fr || "");
      setDescKo(project.description_ko || "");
      setStack(project.stack || "Frontend");
      setYear(project.year || new Date().getFullYear().toString());
      setProjectLink(project.project_link || "");
      setGithubLink(project.github_link || "");
      setTechnologies(project.technologies || []);
      setExistingMainImage(project.image_url || "");
      setMainImagePreview(project.image_url || "");
      setMainImageFile(null);
      setExistingCarouselUrls(project.images_carousel || []);
      setCarouselFiles([]);
      setCarouselPreviews([]);
      setStatus("idle");
      setErrorMsg("");
    } else {
      resetForm();
    }
  }, [project]);

  const resetForm = () => {
    setTitle("");
    setTitleFr("");
    setTitleKo("");
    setDescEn("");
    setDescFr("");
    setDescKo("");
    setMainImageFile(null);
    setMainImagePreview("");
    setExistingMainImage("");
    setCarouselFiles([]);
    setCarouselPreviews([]);
    setExistingCarouselUrls([]);
    setStack("Frontend");
    setYear(new Date().getFullYear().toString());
    setProjectLink("");
    setGithubLink("");
    setTechnologies([]);
    setStatus("idle");
    setErrorMsg("");
    setUploadProgress("");
    setUploadPercent(0);
    if (mainInputRef.current) mainInputRef.current.value = "";
    if (carouselInputRef.current) carouselInputRef.current.value = "";
  };

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
    setExistingMainImage("");
  };

  const removeMainImage = () => {
    setMainImageFile(null);
    setMainImagePreview("");
    setExistingMainImage("");
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

  const removeExistingCarouselImage = (index) => {
    setExistingCarouselUrls((prev) => prev.filter((_, i) => i !== index));
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

      let imageUrl = existingMainImage || null;
      if (mainImageFile) {
        setUploadProgress(`Uploading main image...`);
        imageUrl = await uploadImage(mainImageFile);
        uploaded++;
        if (totalUploads > 0) {
          setUploadPercent(Math.round((uploaded / totalUploads) * 100));
        }
      }

      const newCarouselUrls = [];
      for (let i = 0; i < carouselFiles.length; i++) {
        setUploadProgress(
          `Uploading carousel image ${i + 1}/${carouselFiles.length}...`
        );
        const url = await uploadImage(carouselFiles[i]);
        newCarouselUrls.push(url);
        uploaded++;
        if (totalUploads > 0) {
          setUploadPercent(Math.round((uploaded / totalUploads) * 100));
        }
      }

      const allCarouselUrls = [...existingCarouselUrls, ...newCarouselUrls];

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
        images_carousel: allCarouselUrls,
        year,
        project_link: projectLink || null,
        github_link: githubLink || null,
        technologies,
      };

      const endpoint = isEdit ? "update-project" : "add-project";
      if (isEdit) {
        body.id = project.id;
      }

      const res = await fetch(
        `${SUPABASE_URL}/functions/v1/${endpoint}`,
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

      if (!isEdit) {
        resetForm();
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Network error");
      setUploadProgress("");
      setUploadPercent(0);
    }
  };

  return (
    <Form ref={formRef} onSubmit={handleSubmit} tabIndex={-1}>
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
        placeholder="Titre du projet (Fran\u00e7ais)"
      />
      <Label>Title (KO)</Label>
      <Input
        value={titleKo}
        onChange={(e) => setTitleKo(e.target.value)}
        placeholder="\ud504\ub85c\uc81d\ud2b8 \uc81c\ubaa9 (\ud55c\uad6d\uc5b4)"
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
        placeholder="Description (Fran\u00e7ais)"
      />
      <Label>Description (KO)</Label>
      <Textarea
        rows="3"
        value={descKo}
        onChange={(e) => setDescKo(e.target.value)}
        placeholder="\uc124\uba85 (\ud55c\uad6d\uc5b4)"
      />

      <SectionTitle>Images</SectionTitle>
      <Label>Main image</Label>
      <FileInput>
        {mainImagePreview ? "Change main image..." : "Click to select main image..."}
        <PasteHint>or Ctrl+V to paste from clipboard</PasteHint>
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
        <PasteHint>or Ctrl+V to paste from clipboard</PasteHint>
        <input
          ref={carouselInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleCarouselFiles}
        />
      </FileInput>
      {(existingCarouselUrls.length > 0 || carouselPreviews.length > 0) && (
        <PreviewContainer>
          {existingCarouselUrls.map((src, i) => (
            <PreviewItem key={`existing-${i}`}>
              <img src={src} alt={`Carousel ${i + 1}`} />
              <RemoveBtn type="button" onClick={() => removeExistingCarouselImage(i)}>
                x
              </RemoveBtn>
            </PreviewItem>
          ))}
          {carouselPreviews.map((src, i) => (
            <PreviewItem key={`new-${i}`}>
              <img src={src} alt={`New carousel ${i + 1}`} />
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
        {status === "sending"
          ? isEdit ? "Updating..." : "Adding..."
          : isEdit ? "Update Project" : "Add Project"}
      </Button>
      {status === "sending" && uploadProgress && (
        <>
          <ProgressText>{uploadProgress}</ProgressText>
          <ProgressBar>
            <ProgressFill $percent={uploadPercent} />
          </ProgressBar>
        </>
      )}
      {status === "success" && (
        <Message>
          {isEdit ? "Project updated successfully!" : "Project added successfully!"}
        </Message>
      )}
      {status === "error" && <Message $isError>{errorMsg}</Message>}
      {pasteToast && <PasteToast>{pasteToast}</PasteToast>}
    </Form>
  );
};

export default AdminProjectForm;
