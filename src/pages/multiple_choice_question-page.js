import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "@emotion/styled";
import { useAuth } from "../context/auth-context";
import { colors, typography } from "../styles";
import { Navbar } from "../components/navbar";
import { Button } from "../components/buttons";
import { Option } from "../components/option";
import Editor from "@monaco-editor/react";
import { getMultipleChoiceQuestions } from "../services/position-service";
import { sendResults } from "../services/results-service"
import { updateUser } from "../services/user-service";

const Wrapper1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center
`;

const Wrapper2 = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 270px;
  justify-content: center;
  align-items: center;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 48px 16px 64px 16px;
  width: 900px;
  height: 1080px;
  ${typography.head.md};
  color: ${colors.blue};
`;

const InsideSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 868px;
  height: 908px;
  margin-top: 32px;
`;

const TextSection = styled.p`
  margin-top: 36px;
  color: ${colors.gray[600]};
  ${typography.text.lg};
  text-align: justify;
  margin-bottom:12px;
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

const Img = styled.img`
  margin: 36px 0px;
  width:700px;
  align-self: center;
`;

const OptionsSection = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;

  width: 868px;
`;



const Label = styled.label`
  color: ${colors.blue};
  display: inline-block;
  padding: 5px 0px 5px 44px;
  position:relative;
  ${typography.text.lg};
  cursor:pointer;
  &:before{
    content:'';
    width: 28px;
    height: 28px;
    display: inline-block;
    background: ${(props) => props.background};
    border: 1px solid ${colors.orange};
    border-radius: 50%;
    position:absolute;
    left: 0px;
  }
`;
const TestsContainer = styled.div`
  background: rgba(230, 232, 235, 0.31);
  border-radius: 16px;
  padding: 22px 0px;
`;


function MultipleChoicePage() {
  const navigate = useNavigate();
  const [showStyledInput, setShowStyledInput] = useState(false);
  const [inputID, setInputID] = useState(null);
  const { position, mulChoiceQuestions,
    sumCorrectAnswer, setSumCorrectAnswer,
    solutions, testQuestions, setResults, results, user, setUser, countDontKnow, setCountDontKnow} = useAuth();
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(
    user.current_question <= mulChoiceQuestions.length ? user.current_question-1 : user.current_question-mulChoiceQuestions.length-1);
  const [question_type, setQuestion_type] = useState(
    user.current_question > mulChoiceQuestions.length ? "test" : "multiple");
  const [view, setView] = useState("question")
  const [code, setCode] = useState(user.current_question > mulChoiceQuestions.length ? testQuestions[user.current_question-mulChoiceQuestions.length-1].question.code : null);
  const [test1Status, setTest1Status] = useState(null);
  const [test2Status, setTest2Status] = useState(null);
  const [test3Status, setTest3Status] = useState(null);
  const [test4Status, setTest4Status] = useState(null);
  const [dontKnow, setDontKnow] = useState(false);
  const [unblockSend, setUnblockSend] = useState(false);

  function handleRadio(event) {
    event.preventDefault();
    setInputID(+event.target.id);
    setShowStyledInput(true);
    setCorrectAnswer(event.target.value);
    setDontKnow(false);
    setUnblockSend(true)
  }
  function handleDontKnow(event){
    event.preventDefault();
    setDontKnow(true);
    setInputID(null)
    setUnblockSend(true)
  }
  function handleSubmitMultipleChoice(event) {
    event.preventDefault();
    if (unblockSend){
      setDontKnow(false)
      updateUser({
        "current_question": user.current_question + 1
      })
        .then(response=>{
        setUser(response)
      }).catch(console.log())
  
      if (correctAnswer === 'true') {
        setSumCorrectAnswer(sumCorrectAnswer + 1)
        sendResults(
          {
            stage1: sumCorrectAnswer + 1,
            stage2: 0,
            stage3: 0,
           
          }
        ).then(console.log).catch((error) => console.log(error))
  
      };
      if (dontKnow) {
        setCountDontKnow(countDontKnow + 1)
        sendResults(
          {
            dontKnow: countDontKnow + 1,
          }
        ).then(console.log).catch((error) => console.log(error))
  
      };
      setCorrectAnswer(null)
      setUnblockSend(false)
      setView("solution")
    }
  }

  function handleSubmitTest(event) {
    event.preventDefault();
   
    let body;
    if(solutions.length===user.current_question){
      body={
        "current_stage": 2,
        "current_question":1
      }
    }
    else{
      body={
        "current_question": user.current_question + 1
      }
    }
    updateUser(body)
    .then(response=>{
      setUser(response)
    }).catch(console.log())

    if (test1Status && test2Status && test3Status && test4Status) {
      setResults({ ...results, stage1: sumCorrectAnswer + 1 })
      setSumCorrectAnswer(sumCorrectAnswer + 1)
      sendResults(
        {
          stage1: sumCorrectAnswer + 1,
          stage2: 0,
          stage3: 0
        }
      ).then().catch((error) => console.log(error))
    };
    setTest1Status(null)
    setTest2Status(null)
    setTest3Status(null)
    setTest4Status(null)
    setView("solution")
  }

  function runTests(event) {
    event.preventDefault();
    let currentTest;
    testQuestions[currentQuestion].tests.map((test, idx) => {
      if (test.input_type === 'number') {
        currentTest = eval(`(${code})`);
        const input = test.input.split(",").map(Number)

        if (currentTest(...input) === +test.output) {
          if (idx === 0) setTest1Status(true)
          if (idx === 1) setTest2Status(true)
          if (idx === 2) setTest3Status(true)
          if (idx === 3) setTest4Status(true)
        } else {
          if (idx === 0) setTest1Status(false)
          if (idx === 1) setTest2Status(false)
          if (idx === 2) setTest3Status(false)
          if (idx === 3) setTest4Status(false)
        }
      }
      if (test.input_type === 'string') {
        currentTest = eval(`(${code})`);
        const input = test.input
        if (currentTest(input) === test.output) {
          if (idx === 0) setTest1Status(true)
          if (idx === 1) setTest2Status(true)
          if (idx === 2) setTest3Status(true)
          if (idx === 3) setTest4Status(true)
        } else {
          if (idx === 0) setTest1Status(false)
          if (idx === 1) setTest2Status(false)
          if (idx === 2) setTest3Status(false)
          if (idx === 3) setTest4Status(false)
        }
      }
      if (test.input_type === 'array_string') {
        currentTest = eval(`(${code})`);
        const input = test.input.slice(1, test.input.length - 1).split(',')
        console.log(currentTest(input))
        if (currentTest(input) === test.output) {
          if (idx === 0) setTest1Status(true)
          if (idx === 1) setTest2Status(true)
          if (idx === 2) setTest3Status(true)
          if (idx === 3) setTest4Status(true)
        }
      else {
          if (idx === 0) setTest1Status(false)
          if (idx === 1) setTest2Status(false)
          if (idx === 2) setTest3Status(false)
          if (idx === 3) setTest4Status(false)
        }
      }
      if (test.input_type === 'array_number') {
        currentTest = eval(`(${code})`);
        const input = test.input.slice(1, test.input.length - 1).split(',').map(Number)
        if(test.type_output === "number"){
          if (currentTest(input) === +test.output) {
            if (idx === 0) setTest1Status(true)
            if (idx === 1) setTest2Status(true)
            if (idx === 2) setTest3Status(true)
            if (idx === 3) setTest4Status(true)
          } 
          else {
            if (idx === 0) setTest1Status(false)
            if (idx === 1) setTest2Status(false)
            if (idx === 2) setTest3Status(false)
            if (idx === 3) setTest4Status(false)
          }
        }else{
          if (currentTest(input) === test.output) {
            if (idx === 0) setTest1Status(true)
            if (idx === 1) setTest2Status(true)
            if (idx === 2) setTest3Status(true)
            if (idx === 3) setTest4Status(true)
          } 
          else {
            if (idx === 0) setTest1Status(false)
            if (idx === 1) setTest2Status(false)
            if (idx === 2) setTest3Status(false)
            if (idx === 3) setTest4Status(false)
          }
        }
      }
      if (test.input_type === 'boolean') {
        currentTest = eval(`(${code})`);
        const input = test.input.split(',').map(Boolean)
        if (currentTest(...input) === +test.output) {
          if (idx === 0) setTest1Status(true)
          if (idx === 1) setTest2Status(true)
          if (idx === 2) setTest3Status(true)
          if (idx === 3) setTest4Status(true)
        } else {
          if (idx === 0) setTest1Status(false)
          if (idx === 1) setTest2Status(false)
          if (idx === 2) setTest3Status(false)
          if (idx === 3) setTest4Status(false)
        }
      }
    })
  }

  function handleNextQuestion(e) {
    e.preventDefault();
    if (question_type === "multiple") {
      if (currentQuestion < mulChoiceQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        setQuestion_type("test")
        setCode(testQuestions[0].question.code)
        setCurrentQuestion(0)
      }
    } else {
      if (currentQuestion < testQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setCode(testQuestions[currentQuestion + 1].question.code)
      } else {
        navigate("/stage2")

      }
    }
    setView("question")
  }
  return (
    <Wrapper1>
      <Navbar />
      <Container>
        <Section>
          <p>{position.title}</p>
          <InsideSection>
            {view === "question" ?
              question_type === "multiple" ?
                <>
                  <p>Pregunta {currentQuestion + 1} de {solutions.length}</p>
                  <TextSection>
                    {mulChoiceQuestions[currentQuestion].question.description}
                  </TextSection>
                  {mulChoiceQuestions[currentQuestion]?.url === 'sin imagen' ? null : <Img src={mulChoiceQuestions[currentQuestion]?.url} />}
                  <OptionsSection onSubmit={handleSubmitMultipleChoice}>
                    {mulChoiceQuestions[currentQuestion].options && mulChoiceQuestions[currentQuestion].options.map(option => {
                      if (showStyledInput && inputID === option.id) {
                        return <Option key={`key${option.id}`} value={option.correct} border={`1px solid ${colors.orange}`} id={option.id} background={`${colors.orange}`} label={option.description} onClick={handleRadio} />
                      } else {
                        return <Option key={`key${option.id}`} value={option.correct} border={`1px solid ${colors.gray[600]}`} id={option.id} background={`none`} label={option.description} onClick={handleRadio} />
                      }
                    })
                    }
                    <Option key={`key`} value={true} border={`1px solid ${dontKnow ? colors.orange : colors.gray[600]}`} id={"id-dontknow"} background={`${dontKnow ? colors.orange : "none"}`} label={"No se"} onClick={handleDontKnow} />
                    <Button
                      width='88px'
                      style={{background: `${unblockSend ? colors.orange : colors.gray[600]}`, alignSelf: 'center', marginTop: '20px' } } > Enviar </Button>

                  </OptionsSection>
                </>
                :
                <>
                  <Wrapper2 style={{ maxWidth: "868px", gap: "37px", marginTop: "48px" }}>
                    <Wrapper2 style={{ gap: "32px" }}>
                      <Text1>Pregunta {currentQuestion + mulChoiceQuestions?.length + 1} de {solutions.length}</Text1>
                    </Wrapper2>
                    <Text2>{testQuestions[currentQuestion].question.description} </Text2>
                    <Wrapper2 style={{ height: "270px", alignItems: "center", justifyContent: "center", padding: "0px 30px" }}>
                      <Editor
                        language="javascript"
                        theme="vs-dark"
                        value={code}
                        onChange={code => setCode(code)}
                        width="100%"
                        height="100%"
                      />
                    </Wrapper2>
                    <Wrapper1>
                      <Button width="71px" onClick={runTests}>Test</Button>
                    </Wrapper1>
                    <TestsContainer>
                      {test1Status === null ?
                        <Option padding={`0px 19px`} border={`none`} id={`answer1`} value={`answer1`} background={`${colors.white}`} label={testQuestions[currentQuestion]?.tests[0].test} />
                        :
                        test1Status === true ?
                          <Option padding={`0px 19px`} border={`none`} id={`answer1`} value={`answer1`} background={`${colors.green}`} label={testQuestions[currentQuestion]?.tests[0].test} />
                          :
                          <Option padding={`0px 19px`} border={`none`} id={`answer1`} value={`answer1`} background={`${colors.red}`} label={testQuestions[currentQuestion]?.tests[0].test} />
                      }
                      {test2Status === null ?
                        <Option padding={`0px 19px`} border={`none`} id={`answer2`} value={`answer2`} background={`${colors.white}`} label={testQuestions[currentQuestion]?.tests[1].test} />
                        :
                        test2Status === true ?
                          <Option padding={`0px 19px`} border={`none`} id={`answer2`} value={`answer2`} background={`${colors.green}`} label={testQuestions[currentQuestion]?.tests[1].test} />
                          :
                          <Option padding={`0px 19px`} border={`none`} id={`answer2`} value={`answer2`} background={`${colors.red}`} label={testQuestions[currentQuestion]?.tests[1].test} />
                      }
                      {test3Status === null ?
                        <Option padding={`0px 19px`} border={`none`} id={`answer3`} value={`answer3`} background={`${colors.white}`} label={testQuestions[currentQuestion]?.tests[2].test} />
                        :
                        test3Status === true ?
                          <Option padding={`0px 19px`} border={`none`} id={`answer3`} value={`answer3`} background={`${colors.green}`} label={testQuestions[currentQuestion]?.tests[2].test} />
                          :
                          <Option padding={`0px 19px`} border={`none`} id={`answer3`} value={`answer3`} background={`${colors.red}`} label={testQuestions[currentQuestion]?.tests[2].test} />
                      }
                      {test4Status === null ?
                        <Option padding={`0px 19px`} border={`none`} id={`answer4`} value={`answer4`} background={`${colors.white}`} label={testQuestions[currentQuestion]?.tests[3].test} />
                        :
                        test4Status === true ?
                          <Option padding={`0px 19px`} border={`none`} id={`answer4`} value={`answer4`} background={`${colors.green}`} label={testQuestions[currentQuestion]?.tests[3].test} />
                          :
                          <Option padding={`0px 19px`} border={`none`} id={`answer4`} value={`answer4`} background={`${colors.red}`} label={testQuestions[currentQuestion]?.tests[3].test} />
                      }
                    </TestsContainer>
                    <Wrapper1>
                      <Button width="90px" onClick={handleSubmitTest}>
                        Enviar
                      </Button>
                    </Wrapper1>
                  </Wrapper2>
                </>
              :
              <>
                <p>Solución {question_type === "multiple" ? currentQuestion + 1 : currentQuestion + 1 + mulChoiceQuestions.length} de 10</p>
                <TextSection>
                  {question_type === "multiple" ? solutions[currentQuestion].solution.description : solutions[currentQuestion + mulChoiceQuestions.length].solution.description}
                </TextSection>
                {question_type === "multiple" ?
                  solutions[currentQuestion]?.url === 'sin imagen' ?
                    null :
                    <Img src={solutions[currentQuestion]?.url} />
                  :
                  solutions[currentQuestion + 1 + solutions.length]?.url === 'sin imagen' ?
                    null :
                    <Img src={solutions[currentQuestion + 5]?.url} />
                }
                <Button
                  width='88px'
                  style={{ alignSelf: 'center', marginTop: '20px' }}
                  onClick={handleNextQuestion}
                > Siguiente
                  </Button>
              </>
            }
          </InsideSection>

        </Section>
      </Container>
    </Wrapper1>
  )
}

export default MultipleChoicePage;
