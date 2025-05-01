import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 600px;

  margin: 0 20px;
  gap: 20px;
`;

const Input = styled.input`
  padding: 15px;
  background: #000000ad;
  border: 2px solid #ccc;
  border-radius: 10px;
  color: #ffffff;
  font-size: 16px;
`;

const Textarea = styled.textarea`
  padding: 15px;
  background: #000000ad;
  border: 2px solid #ccc;
  border-radius: 10px;
  color: #ffffff;
  font-size: 16px;
  resize: vertical;
`;

const SubmitButton = styled.button`
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

const Message = styled.p`
  color: white;
  margin-top: 10px;
  font-size: 16px;
`;

const ContactForm = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.target;
    const data = new FormData(form);

    const res = await fetch("https://formspree.io/f/mpwdqgwd", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div style={{ textAlign: "center", color: "white" }}>
        <p style={{ fontSize: "20px", margin: "20px" }}>{t("form_success")}</p>
        <img
          src="https://i.imgur.com/xy9V1JG.png"
          alt="Thank you"
          style={{ maxWidth: "300px", borderRadius: "20px" }}
        />
      </div>
    );
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input name="name" type="text" placeholder={t("form_name")} required />
      <Input name="email" type="email" placeholder={t("form_email")} required />
      <Input name="phone" type="tel" placeholder={t("form_phone")} />
      <Textarea
        name="message"
        rows="5"
        placeholder={t("form_message")}
        required
      />
      <SubmitButton type="submit">{t("form_submit")}</SubmitButton>
      {status === "error" && <Message>{t("form_error")}</Message>}
    </FormContainer>
  );
};

export default ContactForm;
