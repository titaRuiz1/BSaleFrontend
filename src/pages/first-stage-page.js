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
  ${typography.text.lg}
  line-height: 28px;
  color: #677294;
`;


function FirstStagePage() {
  const navigate = useNavigate();
  const {position} = useAuth();

  return (
    <Wrapper1 style={{alignItems:"center", justifyContent:"center"}}>
      <Navbar />
      <Wrapper1 style={{ maxWidth:"868px", gap: "32px", marginTop:"48px"}}>
        <Text1>{position.title}</Text1>
        <Text1>Etapa 1: Fundamentos de programacion</Text1>
        <Text2>La programación se construye sobre una lógica algorítmica, es decir, sobre un procedimiento compuesto por pasos y estructurado en el ingreso y la salida de datos. Sobre este proceso se efectúan operaciones matemáticas, basadas en álgebra booleana que procesan variables binarias. Estas acciones permiten comparar, clasificar y relacionar la información con el fin de inferir resultados específicos según se requiera. Los desarrolladores usan lenguajes de programación que les permiten convertir los algoritmos en instrucciones que el computador puede ejecutar. Estos lenguajes son un conjunto de reglas sintácticas y morfológicas sobre un alfabeto que funcionan como un standar de comunicación con la máquina.</Text2>
        <Text2>Según la necesidad o la complejidad de los algoritmos o instrucciones, se usan diferentes lenguajes y cada uno opera con un conjunto de reglas y estructuras distintos. Estas estructuras permiten acceder a variables, funciones, objetos, cadenas y otras herramientas que procesan la información.</Text2>
        <Wrapper1  style={{justifyContent:"center", alignItems:"center"}}>
          <Button
            width="90px"
            onClick={() => navigate("/stage1")}> 
            Iniciar
          </Button>
        </Wrapper1>
      </Wrapper1>
    </Wrapper1>
  )
}

export default FirstStagePage;
