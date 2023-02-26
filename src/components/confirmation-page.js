import styled from "@emotion/styled";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { colors, typography } from "../styles";
import Input from "../components/input";
import { Button } from "./buttons";
import { useAuth } from "../context/auth-context"
import { createPosition } from "../services/position-service"

const FormContainer = styled.div`
  background:white;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  display:flex;
  flex-direction:column;
  align-items:center;
  padding:50px;
`;

const Title = styled.p`
  ${typography.text.xl};
  color: ${colors.blue};
  margin: ${(props) => props.marginB || '32px'};
`;



const DivInput = styled.div`
  display: flex;
  flex-direction: row; 
  gap: 8px 
`;

const DivButtons = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100% ;
  gap:4px
`;

function Confirmation() {
  const navigate = useNavigate();
  const { setAllPositions, newPosition, setNewPosition } = useAuth();


  function handleCancel(event) {
    event.preventDefault();
    console.log('back');
    setNewPosition({
      title: '',
      description: '',
      multiple_choice_questions_attributes: null,
      test_questions_attributes: null,
      challenge_evaluations_attributes: null,
      stage_attributes: null,
      stage2s_attributes: null
    })
    navigate(`/admin`)
  };

  function handleConfirm(event) {
    event.preventDefault();
    createPosition(newPosition).then(response => {
      setAllPositions(response.data);
    }).catch((error) => console.log(error))
    console.log('entre')
    navigate(`/admin`)
  };

  console.log('TODO EL REQUEST', newPosition)
  return (
    <>
      <FormContainer>
        <Title>Confirmar nueva posición</Title>
        <DivButtons>
          <Button onClick={handleCancel}>Cancelar</Button>
          <Button onClick={handleConfirm}>Confirmar</Button>
        </DivButtons>
      </FormContainer>
    </>
  )

}
export default Confirmation;