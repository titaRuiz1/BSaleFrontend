import styled from "@emotion/styled";
import { useState } from "react"
import { typography, colors } from "../../styles";
import { useAuth } from "../../context/auth-context";
import { getApplicantFeedback } from "../../services/feedback-service";
import { deleteUser } from "../../services/user-service";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../buttons";

const Wrapper3 = styled.div`
  display: flex;
  flex-direction: row;
`;

const RecordContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.002);
  border-style: solid;
  border-color: #B9B9B9;
  padding: 10px 12px 10px 12px;
`;

const Text5 = styled.p`
  ${typography.text.xxs}
  color: ${colors.gray[600]};
`;


function RecordRow({ record }) {
  const [feedbackUserId, setFeedbackUserId] = useState(null)
  const { isOpenFeedback, setIsOpenFeedback, setSelectedUserFeedbacks, solutions, setPositionApplicants } = useAuth();
  const navigate = useNavigate();

  function handleCommentsClick(userId) {
    setFeedbackUserId(userId);

    getApplicantFeedback(userId).then(response => {
      setSelectedUserFeedbacks(response.feedback)
    }).catch(error => {
      console.log("ERROR", error)
    })

    setIsOpenFeedback(true)
  }

  function handleDelete(userId) {
    deleteUser(userId).then(response=>{
      setPositionApplicants(response)
    }).catch()
  }

  return (
    <>
      { record.results.length ?
          <Wrapper3>
            <RecordContainer style={{ width: "150px", borderWidth: "0px 0px 1px 1px" }}>
              <Text5>
                {record.user.email}
              </Text5>
            </RecordContainer>
            <RecordContainer style={{ width: "300px", borderWidth: "0px 0px 1px 1px" }}>
              <Text5>
                {record.results}
              </Text5>
            </RecordContainer>
            <RecordContainer style={{ width: "100px", borderWidth: "0px 0px 1px 1px" }}>
              <Text5>Etapa 1 no iniciada</Text5>
            </RecordContainer>
            <RecordContainer style={{ width: "100px", borderWidth: "0px 0px 1px 1px" }}>
              {record.project === "" ? <Text5>No encontrado</Text5> :
                <a href={record.project}>
                  link
            </a>}
            </RecordContainer>
            <RecordContainer style={{ width: "100px", borderWidth: "0px 0px 1px 1px" }}>
              {record.github ?
                <a href={record.github}>
                  link
            </a> :
                <Text5>No encontrado</Text5>}
            </RecordContainer>
            <RecordContainer style={{ width: "100px", borderWidth: "0px 0px 1px 1px" }}>
              {(record.user.current_stage == 1 && record.user.current_question == 1) ?
                <Text5>No Iniciado</Text5> :
                (record.user.current_stage == 3 && record.user.current_question == 5) ?
                  <Text5>Finalizado</Text5> :
                  <Text5>Iniciado</Text5>
              }
            </RecordContainer>
            <RecordContainer style={{ width: "100px", borderWidth: "0px 1px 1px 1px" }} onClick={() => handleCommentsClick(record.user.id)}>
              <Text5>
                Ver más
            </Text5>
            </RecordContainer>
            <RecordContainer style={{ width: "100px", border: "none" }}>
              <Button width='75px' onClick={() => handleDelete(record.user.id)}>Eliminar</Button>
            </RecordContainer>
          </Wrapper3>
          :

          <Wrapper3>
            <RecordContainer style={{ width: "150px", borderWidth: "0px 0px 1px 1px" }}>
              <Text5>
                {record.user.email}
              </Text5>
            </RecordContainer>
            <RecordContainer style={{ width: "100px", borderWidth: "0px 0px 1px 1px" }}>
              <Text5>
                {record.results.stage1}/{solutions?.length}
              </Text5>
            </RecordContainer>
            <RecordContainer style={{ width: "100px", borderWidth: "0px 0px 1px 1px" }}>
              <Text5>
                {record.results.stage2}
              </Text5>
            </RecordContainer>
            <RecordContainer style={{ width: "100px", borderWidth: "0px 0px 1px 1px" }}>
              <Text5>
                {record.results.stage3}
              </Text5>
            </RecordContainer>
            <RecordContainer style={{ width: "100px", borderWidth: "0px 0px 1px 1px" }}>
              <Text5>{record.results.dontKnow}</Text5>
            </RecordContainer>
            <RecordContainer style={{ width: "100px", borderWidth: "0px 0px 1px 1px" }}>
              {record.project === "" ? <Text5>No encontrado</Text5> :
                <a href={record.project}>
                  link
                </a>}
            </RecordContainer>
            <RecordContainer style={{ width: "100px", borderWidth: "0px 0px 1px 1px" }}>
              {record.github ?
                <a href={record.github}>
                  link
                </a>
                :
                <Text5>No encontrado</Text5>}
            </RecordContainer>
            <RecordContainer style={{ width: "100px", borderWidth: "0px 0px 1px 1px" }}>
              {(record.user.current_stage == 1 && record.user.current_question == 1) ?
                <Text5>No iniciado</Text5> :
                (record.user.current_stage == 3 && record.user.current_question == 5) ?
                  <Text5>Finalizado</Text5> :
                  <Text5>Iniciado</Text5>
              }
            </RecordContainer>
            <RecordContainer style={{ width: "100px", borderWidth: "0px 1px 1px 1px" }} onClick={() => handleCommentsClick(record.user.id)}>
              <Text5>
                Ver más
                </Text5>
            </RecordContainer>

            <RecordContainer style={{ width: "100px", border: "none" }}>
              <Button width='60px' onClick={() => handleDelete(record.user.id)}>Eliminar</Button>
            </RecordContainer>

          </Wrapper3>
      }
    </>
  );
}

export default RecordRow;
