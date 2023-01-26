import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Navbar } from "./components/navbar";
import { typography } from "./styles";

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
`;

const MainTitle = styled.p`
  ${typography.text.xxl}
  font-weight: 600;
  color: #051441;
  text-align:center;
  width: 210px;
  height: 60px;
`;

function ResultsPage() {
  const [show, setShow] = useState(false);

  return (
    <Wrapper1 style={{alignItems:"center", justifyContent:"center"}}>
      <Navbar />
      <Wrapper1 style={{ maxWidth:"868px", gap: "32px", marginTop:"48px"}}>
        <p>Desarrollador Web Junior</p>
        <p>Resumen de Resultados</p>
        <StageResultsContainer>
          <p>Etapa 1: Fundamentos de programacion</p>
          <p>8 correctos de 10</p>
        </StageResultsContainer>
        <StageResultsContainer>
          <p>Etapa 2: Desarrollo Web</p>
          <p>3 pruebas exitosas de 4</p>
        </StageResultsContainer>
        <StageResultsContainer>
          <p>Etapa 3: Revision de codigo</p>
          <p>Promedio de 3.5 sobre 5</p>
        </StageResultsContainer>
        <p>Eget mollis mauris vivamus eget cursus tincidunt mauris nisi. Adipiscing sit dolor blandit et mattis. Sagittis non ultrices viverra non ac tempor. Posuere felis at ultricies purus libero diam. Non non urna tellus vehicula auctor ut massa malesuada. Nulla fermentum in donec mi maecenas iaculis amet mauris est.</p>
      </Wrapper1>
    </Wrapper1>
  )
}

export default ResultsPage;
