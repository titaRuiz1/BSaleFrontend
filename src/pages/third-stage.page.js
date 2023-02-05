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

const Text1 = styled.p`
  ${typography.head.md}
  font-size: 1.5rem;
  line-height: 27.6px;
  color: #051441;
`;

const Text2 = styled.p`
  ${typography.text.lg}
  line-height: 28px;
  color: #677294;
`;

const Video = styled.div`
display:flex;
justify-content:center;
height: 324px
width: 576px
`


function ThirdStagePage() {
  const navigate = useNavigate();
  const {position} = useAuth();

  return (
    <Wrapper1 style={{alignItems:"center", justifyContent:"center"}}>
      <Navbar />
      <Wrapper1 style={{ maxWidth:"868px", gap: "32px", marginTop:"48px"}}>
        <Text1>{position.title}</Text1>
        <Text1>Etapa 3: Revision de codigo - mejora continua</Text1>
        <Video> 
          <video controls src="https://youtu.be/ykGRYEX0n60"/>
        </Video>
        <Text2>Según la necesidad o la complejidad de los algoritmos o instrucciones, se usan diferentes lenguajes y cada uno opera con un conjunto de reglas y estructuras distintos. Estas estructuras permiten acceder a variables, funciones, objetos, cadenas y otras herramientas que procesan la información.</Text2>
        <Wrapper1  style={{justifyContent:"center", alignItems:"center"}}>
          <Button
            width="90px"
            onClick={() => navigate("/stage3")}>
            Iniciar
          </Button>
        </Wrapper1>
      </Wrapper1>
    </Wrapper1>
  )
}

export default ThirdStagePage;
