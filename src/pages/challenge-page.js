import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { HiOutlineChevronDown } from "react-icons/hi";
import { Navbar } from "../components/navbar";
import { Button } from "../components/buttons";
import { typography, colors } from "../styles";
import { useAuth } from "../context/auth-context";
import { getMultipleChoiceQuestions, getPositions, getSolutions, getTestQuestions, getChallengeEvaluations } from "../services/position-service";
import { getResult } from "../services/results-service";
import { tokenKey } from "../config";
import { useNavigate } from "react-router";
import { getTestsDescription } from "../services/teste2e-service";

const Wrapper1 = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper2 = styled.div`
  display: flex;
  flex-direction: row;
`;

const Text1 = styled.p`
  ${typography.head.md}
  font-size: 1.5rem;
  color: #051441;
`;

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
  ${typography.text.md}
  line-height: 27.9px;
  color: #677294;
`;

const Text5 = styled.p`
  ${typography.head.xs}
  line-height: 27.9px;
  color: #677294;
`;

function ChallengePage() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { position, setPosition, user, setMulChoiceQuestions, setSolutions, setTestQuestions,
     setChallengeEvaluations, setSumCorrectAnswer,setSumTest, setAverage, setTestDescription } = useAuth();

  useEffect(() => {
    getPositions().then(response => {
      setPosition(response);
    }).catch()

    getResult().then(response => {
      if (response !== []) {
        setSumCorrectAnswer(response.stage1);
        setAverage(response.stage3);
        setSumTest(response.stage2);
      }
    }).catch(error => console.log(error))

    getMultipleChoiceQuestions().then(response => {
      setMulChoiceQuestions(response);
    }).catch()

    getSolutions().then(response => {
      setSolutions(response)
    }).catch()

    getTestsDescription().then(response => {
      setTestDescription(response)
    }).catch()

    getTestQuestions().then(response => {
      setTestQuestions(response)
    }).catch()

    getChallengeEvaluations().then(response => {
      setChallengeEvaluations(response);
    }).catch()

  }, [user]);

  function handleContinue(e){
    e.preventDefault();
    console.log("funcionaaa")
    if(user.current_stage===1){
      navigate("/first-stage")
    }
    else if(user.current_stage===2){
      navigate("/stage2")
    }
    else{
      navigate("/feedback")
    }
    //...se debe actualizar el current question (CUIDADO CON EL MULTIPLE CHOICE Y TEST)
    //... se debe actualizar el current criteria
  }

  return (
    <Wrapper1 style={{ alignItems: "center", justifyContent: "center" }}>
      <Navbar />
      <Wrapper1 style={{ width: "68%", gap: "32px", marginTop: "48px" }}>
        <Text1>Retos asignados</Text1>
        <Wrapper1 style={{ padding: "12px 32px", border: "1px solid #1E1E1E", borderRadius: "8px", gap: "16px" }}>
          <Wrapper2 style={{ justifyContent: "space-between", alignItems: "center" }}>
            <Text2>{position ? position.title : "Loading..."}</Text2>
            <Wrapper2 style={{ gap: "38px", justifyContent: "center", alignItems: "center" }}>

              {user.current_stage === 1 && user.current_question === 1 ?
                <Button style={{ padding: "8px 12px" }} onClick={() => navigate("/first-stage")}>
                  <Text3>Iniciar</Text3>
                </Button>
              :
                user.current_stage === 3 && user.current_question === 5 ?
                  <Button style={{ padding: "8px 12px", background:"#677294" }} disabled>
                    <Text3>Finalizado</Text3>
                  </Button>
                :
                  <Button style={{ padding: "8px 12px",background:"#31B9DD"}} onClick={handleContinue}>
                    <Text3>Continuar</Text3>
                  </Button>
              }

              <HiOutlineChevronDown onClick={() => setShow(!show)} />
            </Wrapper2>
          </Wrapper2>

          {show === true ? (
            <Wrapper1 style={{ gap: "16px" }}>
              <Text4>{position.description}</Text4>
            </Wrapper1>
          ) : null}
        </Wrapper1>
      </Wrapper1>
    </Wrapper1>
  )
}

export default ChallengePage;
