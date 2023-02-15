import { GrClose } from "react-icons/gr";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { typography, colors } from "../styles";
import { useAuth } from "../context/auth-context";

const Text2 = styled.p`
  ${typography.head.md}
  color: ${colors.orange};
`;

const Text3 = styled.p`
  ${typography.head.xxs}
  line-height: 120%;
  color: ${colors.lowOrange};
`;

const Text4 = styled.p`
  ${typography.head.xxs}
  color: ${colors.black};
  font-size: 0.8rem;
`;

const Text5 = styled.p`
  ${typography.text.xxs}
  color: ${colors.gray[600]};
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom:8px;
`;

const Wrapper1 = styled.div`
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  padding:20px;
  border-radius:8px;
  max-width: 600px;
`;

const Wrapper2= styled.div`
  display: flex;
  flex-direction: row;
`;

function Feedbacks({ feedbacks, onCloseClick }) {

  const { positionApplicants } = useAuth();


  return (
    <Wrapper1>
       <HeaderContainer>
          <Text2>Feedback</Text2>
          <GrClose
            style={{
              cursor: "pointer",
              height: "24px",
              width: "24px",
            }}
            onClick={onCloseClick}
          />
        </HeaderContainer>
      {feedbacks.length > 0 ?
        feedbacks.map((feedback, index) => (
          <div style={{marginBottom:"20px"}}>
            <Text3>Criterio {index+1}: {positionApplicants.criterias[index].criteria}</Text3>
            <Text4>Did well: </Text4>
            <Text5>{feedback.answerDidWell}</Text5>
            <Text4>To improve: </Text4>
            <Text5>{feedback.answerToImprove}</Text5>
          </div>
          ))
        :
          <Text5>No se encontro feedback del candidato</Text5>
        }
    </Wrapper1>
  );
}

export default Feedbacks;
