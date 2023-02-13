import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Navbar } from "../components/navbar";
import { typography } from "../styles";
import { Button } from "../components/buttons";
import { useNavigate } from "react-router";
import { useAuth } from "../context/auth-context";

const Wrapper1 = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper2 = styled.div`
  display: flex;
  flex-direction: row;
`;

const StageResultsContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #677294;
  border-radius: 8px;
  padding: 12px 32px;
  justify-content: space-between;
  align-items:center;
`;

const Text1 = styled.p`
  ${typography.head.md}
  font-size: 1.5rem;
  line-height: 27.6px;
  color: #051441;
`;

const Text2 = styled.p`
  ${typography.head.sm}
  line-height: 28px;
  color: #677294;
`;

const Text3 = styled.p`
  ${typography.head.xxs}
  line-height: 16px;
  color: #051441;
`;

const Text4 = styled.p`
  ${typography.text.lg}
  line-height: 28px;
  color: #677294;
`;


function ResultsPage() {
  const navigate = useNavigate();
  const { position, sumCorrectAnswer, solutions, average, challengeEvaluations, results } = useAuth();

  return (
    <Wrapper1 style={{ alignItems: "center", justifyContent: "center" }}>
      <Navbar />
      <Wrapper1 style={{ maxWidth: "868px", gap: "32px", marginTop: "48px" }}>
        <Text1>{position.title}</Text1>
        <Text1>Resumen de Resultados</Text1>
        <StageResultsContainer>
          <Text2>Etapa 1: Fundamentos de programacion</Text2>
          <Text3>{sumCorrectAnswer} correctos de {solutions.length}</Text3>
        </StageResultsContainer>
        <StageResultsContainer>
          <Text2>Etapa 2: Desarrollo Web</Text2>
          <Text3>3 pruebas exitosas de 4</Text3>
        </StageResultsContainer>
        <StageResultsContainer>
          <Text2>Etapa 3: Revision de codigo</Text2>
          <Text3>Promedio de {average} sobre 5</Text3>
        </StageResultsContainer>
        <Text4>Eget mollis mauris vivamus eget cursus tincidunt mauris nisi. Adipiscing sit dolor blandit et mattis. Sagittis non ultrices viverra non ac tempor. Posuere felis at ultricies purus libero diam. Non non urna tellus vehicula auctor ut massa malesuada. Nulla fermentum in donec mi maecenas iaculis amet mauris est.</Text4>
        <Wrapper1 style={{ justifyContent: "center", alignItems: "center" }}>
          <Button width="287px" onClick={() => navigate("/challenge")}>
            Regresar a la pagina principal
          </Button>
        </Wrapper1>
      </Wrapper1>
    </Wrapper1>
  )
}

export default ResultsPage;
