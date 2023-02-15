import { GrClose } from "react-icons/gr";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { typography, colors } from "../styles";

const Text2 = styled.p`
  ${typography.head.md}
  font-size: 1.25rem;
  line-height: 28px;
  color: #051441;
`;

const Text3 = styled.p`
  ${typography.head.xxs}
  line-height: 16px;
  color: #FFFFFF;
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
`;

const Wrapper3 = styled.div`
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
`;

function Feedbacks({ feedbacks, onCloseClick }) {


  return (
    <Wrapper3>
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
          <>
            <Text2>Criterio {index+1}: </Text2>
            <Text4>Did well: </Text4>
            <Text5>{feedback.answerDidWell}</Text5>
            <Text4>To improve: </Text4>
            <Text5>{feedback.answerToImprove}</Text5>
          </>
          ))
        :
          <Text5>No se encontro feedback del candidato</Text5>
        }
    </Wrapper3>
  );
}

export default Feedbacks;
