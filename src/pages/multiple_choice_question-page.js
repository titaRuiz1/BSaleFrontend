import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "@emotion/styled";
import { useAuth } from "../context/auth-context";
import { colors, typography } from "../styles";
import { Navbar } from "../components/navbar";
import { Button } from "../components/buttons";
import { Option } from "../components/option"

const Wrapper1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center
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
  const { position, mulChoiceQuestions, sumCorrectAnswer, setSumCorrectAnswer } = useAuth();
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  function handleRadio(event) {
    event.preventDefault();
    setInputID(+event.target.id);
    setShowStyledInput(true)
    setCorrectAnswer(event.target.value)
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (correctAnswer === 'true') setSumCorrectAnswer(sumCorrectAnswer + 1);
    // if (currentQuestion < 4) {
    if (currentQuestion < 4) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // por mientras!!!!
      navigate("/test-question")
      // setCurrentQuestion(0)
    }
  }
  return (
    <Wrapper1>
      <Navbar />
      <Container>
        <Section>
          <p>{position.title}</p>
          <InsideSection>
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
          </InsideSection>

        </Section>
      </Container>
    </Wrapper1>
  )
}

export default MultipleChoicePage;
