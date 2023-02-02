import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "@emotion/styled";
import { useAuth } from "../context/auth-context";
import { colors, typography } from "../styles";
import { Navbar } from "../components/navbar";
import { Button } from "../components/buttons";
import { Option } from "../components/option";
import Editor from "@monaco-editor/react";

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
  text-align: justify
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


function MultipleChoicePage() {
  const navigate = useNavigate();
  const [showStyledInput, setShowStyledInput] = useState(false);
  const [inputID, setInputID] = useState(null);
  const { position, mulChoiceQuestions, sumCorrectAnswer, setSumCorrectAnswer, solutions } = useAuth();
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [ view, setView ] = useState("question")


  function handleRadio(event) {
    event.preventDefault();
    setInputID(+event.target.id);
    setShowStyledInput(true)
    setCorrectAnswer(event.target.value)
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (correctAnswer === 'true') setSumCorrectAnswer(sumCorrectAnswer + 1);
    setView("solution")
   
  }

  function handleNextQuestion(e){
    e.preventDefault();
    if (currentQuestion < mulChoiceQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setView("question")
    } else {
      navigate("/test-question")
    }
  }
  return (
    <Wrapper1>
      <Navbar />
      <Container>
        <Section>
          <p>{position.title}</p>
          <InsideSection>
            { view === "question" ?
            <>
                <p>Pregunta {currentQuestion + 1} de 10</p>
                <TextSection>
                  {mulChoiceQuestions[currentQuestion].question.description}
                </TextSection>
                {mulChoiceQuestions[currentQuestion]?.url === 'sin imagen' ? null : <Img src={mulChoiceQuestions[currentQuestion]?.url} />}
                <OptionsSection onSubmit={handleSubmit}>
                  {mulChoiceQuestions[currentQuestion].options && mulChoiceQuestions[currentQuestion].options.map(option => {
                    if (showStyledInput && inputID === option.id) {
                      return <Option key={`key${option.id}`} value={option.correct} border={`1px solid ${colors.orange}`} id={option.id} background={`${colors.orange}`} label={option.description} onClick={handleRadio} />
                    } else {
                      return <Option key={`key${option.id}`} value={option.correct} border={`1px solid ${colors.gray[600]}`} id={option.id} background={`none`} label={option.description} onClick={handleRadio} />
                    }
                  })
                  }
                  <Button
                    width='88px'
                    style={{ alignSelf: 'center', marginTop: '20px' }}
                    onClick={handleSubmit}
                  > Enviar </Button>

                </OptionsSection>
            </>
             : 
            // view === "question"?
            <>
                <p>Solución {currentQuestion + 1} de 10</p>
                <TextSection>
                  {solutions[currentQuestion].solution.description}
                </TextSection>
                {solutions[currentQuestion]?.url === 'sin imagen' ? null : <Img src={solutions[currentQuestion]?.url} />}
                <Button
                  width='88px'
                  style={{ alignSelf: 'center', marginTop: '20px' }}
                  onClick={handleNextQuestion}
                > Siguiente 
                </Button>
            </>
            //  :
            // <>
            //   <Wrapper2 style={{ maxWidth: "868px", gap: "37px", marginTop: "48px" }}>
            //     <Wrapper2 style={{ gap: "32px" }}>
            //       <Text1>{position.title}</Text1>
            //       {/* <Text1>Pregunta {currentTestQuestion + mulChoiceQuestions?.length + 1} de 10</Text1> */}
            //     </Wrapper2>
            //     {/* {testQuestions[currentTestQuestion].question.description} */}
            //     <Text2>Eget mollis mauris vivamus eget cursus tincidunt mauris nisi. Adipiscing sit dolor blandit et mattis. Sagittis non ultrices viverra non ac tempor. Posuere felis at ultricies purus libero diam. Non non urna tellus vehicula auctor ut massa malesuada. Nulla fermentum in donec mi maecenas iaculis amet mauris est.</Text2>
            //     <Wrapper2 style={{ height: "270px", alignItems: "center", justifyContent: "center", padding: "0px 30px" }}>
            //       <Editor
            //         language="javascript"
            //         theme="vs-dark"
            //         // value={code}
            //         // onChange={code => setCode(code)}
            //         width="100%"
            //         height="100%"
            //       />
            //     </Wrapper2>
            //     <Wrapper1>
            //       {/* <Button width="71px" onClick={runTests}>Test</Button> */}
            //     </Wrapper1>
            //     <TestsContainer>
            //       {/* {testQuestions[currentTestQuestion].tests && testQuestions[currentTestQuestion].tests.map((option, idx )=> { */}
            //       {test1Status === null ?
            //         <Option padding={`0px 19px`} border={`none`} id={`answer1`} value={`answer1`} background={`${colors.white}`} label={`Descripcion de Opcion`} />
            //         :
            //         test1Status === true ?
            //           <Option padding={`0px 19px`} border={`none`} id={`answer1`} value={`answer1`} background={`${colors.green}`} label={`Descripcion de Opcion`} />
            //           :
            //           <Option padding={`0px 19px`} border={`none`} id={`answer1`} value={`answer1`} background={`${colors.red}`} label={`Descripcion de Opcion`} />
            //       }
            //       {test2Status === null ?
            //         <Option padding={`0px 19px`} border={`none`} id={`answer2`} value={`answer2`} background={`${colors.white}`} label={`Descripcion de Opcion`} />
            //         :
            //         test2Status === true ?
            //           <Option padding={`0px 19px`} border={`none`} id={`answer2`} value={`answer2`} background={`${colors.green}`} label={`Descripcion de Opcion`} />
            //           :
            //           <Option padding={`0px 19px`} border={`none`} id={`answer2`} value={`answer2`} background={`${colors.red}`} label={`Descripcion de Opcion`} />
            //       }
            //       {test3Status === null ?
            //         <Option padding={`0px 19px`} border={`none`} id={`answer3`} value={`answer3`} background={`${colors.white}`} label={`Descripcion de Opcion`} />
            //         :
            //         test3Status === true ?
            //           <Option padding={`0px 19px`} border={`none`} id={`answer3`} value={`answer3`} background={`${colors.green}`} label={`Descripcion de Opcion`} />
            //           :
            //           <Option padding={`0px 19px`} border={`none`} id={`answer3`} value={`answer3`} background={`${colors.red}`} label={`Descripcion de Opcion`} />
            //       }
            //       {test4Status === null ?
            //         <Option padding={`0px 19px`} border={`none`} id={`answer4`} value={`answer4`} background={`${colors.white}`} label={`Descripcion de Opcion`} />
            //         :
            //         test4Status === true ?
            //           <Option padding={`0px 19px`} border={`none`} id={`answer4`} value={`answer4`} background={`${colors.green}`} label={`Descripcion de Opcion`} />
            //           :
            //           <Option padding={`0px 19px`} border={`none`} id={`answer4`} value={`answer4`} background={`${colors.red}`} label={`Descripcion de Opcion`} />
            //       }
            //     </TestsContainer>
            //     <Wrapper1>
            //       <Button width="90px" onClick={handleSubmit}>
            //         Enviar
            //       </Button>
            //     </Wrapper1>
            //   </Wrapper2> 
            //     </>
            }
          </InsideSection>

        </Section>
      </Container>
    </Wrapper1>
  )
}

export default MultipleChoicePage;
