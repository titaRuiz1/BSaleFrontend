import styled from "@emotion/styled";
import {useState} from "react"
import { typography, colors } from "../../styles";
import { useAuth } from "../../context/auth-context";
import { getApplicantFeedback } from "../../services/feedback-service";

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


function RecordRow({ record, users }) {
  const [feedbackUserId, setFeedbackUserId]= useState(null)
  const { isOpenFeedback, setIsOpenFeedback, setSelectedUserFeedbacks } = useAuth();

  console.log("RECORD INSIDE RECORD ROW", record)



  function handleCommentsClick(userId) {
    setFeedbackUserId(userId);

    getApplicantFeedback(userId).then(response => {
      console.log("FEEDBACK 0000000 INSIDE HANDLE CLICK", response);
      console.log("FEEDBACK 1111111 INSIDE HANDLE CLICK", response.feedback);
      console.log("FEEDBACK 2222222 INSIDE HANDLE CLICK", response.feedback.length);
      setSelectedUserFeedbacks(response.feedback)
    }).catch(error=>{
      console.log("ERROR",error)
    })

    setIsOpenFeedback(true)
  }

  return (
    <>
      {users == "+0" ?
        record.results.length?
        <Wrapper3>
          <RecordContainer style={{width:"40px", borderWidth:"0px 0px 1px 1px"}}>
            <Text5>
              {record.user.id}
            </Text5>
          </RecordContainer>
          <RecordContainer style={{width:"150px", borderWidth:"0px 0px 1px 1px"}}>
            <Text5>
              {record.user.email}
            </Text5>
          </RecordContainer>
          <RecordContainer style={{width:"300px", borderWidth:"0px 0px 1px 1px"}}>
            <Text5>
              {record.results}
            </Text5>
          </RecordContainer>
          <RecordContainer style={{width:"100px", borderWidth:"0px 0px 1px 1px"}}>
            <Text5>
              https://fanciful-praline-7ff529.netlify.app/
            </Text5>
          </RecordContainer>
          <RecordContainer style={{ width: "100px", borderWidth: "0px 0px 1px 1px" }}>
            { (record.user.current_stage ==1 && record.user.current_question == 1)?
                <Text5>NO INICIADO</Text5> :
              (record.user.current_stage == 3 && record.user.current_question == 5)?
               <Text5>FINALIZADO</Text5>:
              <Text5>INICIADO</Text5>
            }
          </RecordContainer>
          <RecordContainer style={{width:"100px", borderWidth:"0px 1px 1px 1px"}} onClick={()=> handleCommentsClick(record.user.id)}>
              <Text5>
              Ver más
            </Text5>
          </RecordContainer>
        </Wrapper3>
        :
        <Wrapper3>
          <RecordContainer style={{width:"40px", borderWidth:"0px 0px 1px 1px"}}>
            <Text5>
              {record.user.id}
            </Text5>
          </RecordContainer>
          <RecordContainer style={{width:"150px", borderWidth:"0px 0px 1px 1px"}}>
            <Text5>
              {record.user.email}
            </Text5>
          </RecordContainer>
          <RecordContainer style={{width:"100px", borderWidth:"0px 0px 1px 1px"}}>
            <Text5>
              {record.results.stage1}
            </Text5>
          </RecordContainer>
          <RecordContainer style={{width:"100px", borderWidth:"0px 0px 1px 1px"}}>
            <Text5>
              {record.results.stage2}
            </Text5>
          </RecordContainer>
          <RecordContainer style={{width:"100px", borderWidth:"0px 0px 1px 1px"}}>
            <Text5>
              {record.results.stage3}
            </Text5>
          </RecordContainer>
          <RecordContainer style={{width:"100px", borderWidth:"0px 0px 1px 1px"}}>
            <Text5>
              https://fanciful-praline-7ff529.netlify.app/
            </Text5>
          </RecordContainer>
          <RecordContainer style={{width:"100px", borderWidth:"0px 0px 1px 1px"}}>
            { (record.user.current_stage ==1 && record.user.current_question == 1)?
                <Text5>NO INICIADO</Text5> :
              (record.user.current_stage == 3 && record.user.current_question == 5)?
               <Text5>FINALIZADO</Text5>:
              <Text5>INICIADO</Text5>
            }
          </RecordContainer>
          <RecordContainer style={{width:"100px", borderWidth:"0px 1px 1px 1px"}} onClick={()=> handleCommentsClick(record.user.id)}>
            <Text5>
              Ver más
            </Text5>
          </RecordContainer>
        </Wrapper3>
      :
        <Wrapper3>
          <RecordContainer style={{width:"890px", borderWidth:"0px 1px 1px 1px"}}>
            <Text5>
              {record}
            </Text5>
          </RecordContainer>
        </Wrapper3>
      }
    </>
  );
}

export default RecordRow;
