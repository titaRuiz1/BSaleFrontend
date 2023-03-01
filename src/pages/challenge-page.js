import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import { Navbar } from "../components/navbar";
import { Button } from "../components/buttons";
import { typography, colors } from "../styles";
import { useAuth } from "../context/auth-context";
import { getMultipleChoiceQuestions, getPositions, getSolutions, getTestQuestions, getChallengeEvaluations, getStages, getCriterias } from "../services/position-service";
import { getResult } from "../services/results-service";
import { tokenKey } from "../config";
import { useNavigate } from "react-router";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'
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
  const { mulChoiceQuestions, testDescription, position, setPosition, user,
    setMulChoiceQuestions, setSolutions, setTestQuestions, setChallengeEvaluations,
    setSumCorrectAnswer, setAverage, setStages, setSumTest, setTestDescription, setCriterias, setCountDontKnow } = useAuth();
  const { quill, quillRef } = useQuill({
    readOnly: true,
    modules: {
      toolbar: false
    }
  })

  useEffect(() => {
    getPositions().then(response => {
      setPosition(response);
    }).catch()

    getResult().then(response => {
      if (response !== []) {
        setSumCorrectAnswer(response.stage1);
        setAverage(response.stage3);
        setSumTest(response.stage2);
        setCountDontKnow(response.dontKnow)
      }
    }).catch(error => console.log(error))

    getMultipleChoiceQuestions().then(response => {
      setMulChoiceQuestions(response);
    }).catch()

    getSolutions().then(response => {
      setSolutions(response)
    }).catch()

    getStages().then(response => {
      setStages(response)
    }).catch()

    getCriterias().then(response => {
      setCriterias(response)
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

    quill?.setContents(JSON.parse(position.description))

  }, [user, quill]);

  function handleContinue(e) {
    e.preventDefault();
    if (user.current_stage === 1) {
      navigate("/first-stage")
    }
    else if (user.current_stage === 2) {
      navigate("/stage2")
    }
    else {
      navigate("/feedback")
    }
  }
  return (
    <>
    <Navbar />
    <Wrapper1 style={{ alignItems: "center", justifyContent: "center" }}>
      <Wrapper1 style={{ width: "68%", gap: "32px", marginTop: "48px" }}>
        <Text1>Retos asignados</Text1>
        <Wrapper1 style={{ padding: "12px 32px", border: "1px solid #1E1E1E", borderRadius: "8px", gap: "16px" }}>
          <Wrapper2 style={{ justifyContent: "space-between", alignItems: "center" }}>
            <Text2>{position ? position.title : "Loading..."}</Text2>
            {/* {position ?
              position.id > 4 ? <Text2 ref={quillRef}></Text2>
                : <Text2>{position.title}</Text2>
              : <Text2>"Loading..."</Text2>} */}
            <Wrapper2 style={{ gap: "38px", justifyContent: "center", alignItems: "center" }}>

              {user.current_stage === 1 && user.current_question === 1 ?
                <Button style={{ padding: "8px 12px" }} onClick={() => navigate("/first-stage")}>
                  <Text3>Iniciar</Text3>
                </Button>
                :
                user.current_stage === 3 && user.current_question === 5 ?
                  <Button style={{ padding: "8px 12px", background: "#677294" }} disabled>
                    <Text3>Finalizado</Text3>
                  </Button>
                  :
                  <Button style={{ padding: "8px 12px", background: "#31B9DD" }} onClick={handleContinue}>
                    <Text3>Continuar</Text3>
                  </Button>
              }
              {
                show ? 
                <HiOutlineChevronUp onClick={() => setShow(!show)} />
                :
                <HiOutlineChevronDown onClick={() => setShow(!show)} />
              }
            </Wrapper2>
          </Wrapper2>

          {show === true ? (
            <Wrapper1 style={{ gap: "16px" }}>

              {/* <Text4>{position.description}</Text4> */}

              {
                position.id > 4 ? <Text4 ref={quillRef}></Text4>
                  : <Text4>{position.description}</Text4>}
            </Wrapper1>
          ) : null}
        </Wrapper1>
      </Wrapper1>
    </Wrapper1>
    </>
  )
}

export default ChallengePage;
