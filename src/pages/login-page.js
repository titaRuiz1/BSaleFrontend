import styled from "@emotion/styled";
import { useState } from "react";
import { useAuth } from "../context/auth-context";
import { Button } from "../components/buttons";
import Input from "../components/input";
import { ReactComponent as Logo } from "../assets/logo-bsale.svg";
import { typography } from "../styles";
import { useNavigate } from "react-router";

const Section = styled.div`
  margin: 96px auto;
  align-items: center;
`;

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 258px;
`;

const SubtitleLogo = styled.p`
  ${typography.text.xxl}
  font-weight: 600;
  color: #051441;
  text-align:center;
  width: 210px;
  height: 60px;
  
`;

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleSubmit(event) {
    event.preventDefault();

    login(form).catch((error) => console.log(error));
    form.email.includes('test3') ? navigate("/admin/index") : navigate("/challenge")
  }

  function handleFormChange(event) {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  }

  return (
    <Section>
      <Container>
        <Logo />
        <SubtitleLogo>Desafíate!</SubtitleLogo>
        <StyledForm onSubmit={handleSubmit}>
          <Input
            id="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={handleFormChange}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={handleFormChange}
          />
          <Button width='280px'>
            Ingresar
          </Button>
        </StyledForm>
      </Container>
    </Section>
  );
}
