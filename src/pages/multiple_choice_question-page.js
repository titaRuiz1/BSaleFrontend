import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "@emotion/styled";
import example from "../assets/example.svg";
import { useAuth } from "../context/auth-context";
import { colors, typography } from "../styles";
import { Navbar } from "../components/navbar";
import { Button } from "../components/buttons";
import { Option } from "../components/option"

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

const Options = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 32px;
  gap: 16px;

  width: 868px;
  height: 52px;

  border: ${(props) => props.border};
  border-radius: 8px;
`;

const InputRadio = styled.input`
  display:none;
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
  const {position, mulChoiceQuestions } = useAuth();
  const [correctAnswer, setCorrectAnswer] = useState(null);

  console.log('PREGUNTAS EN OTRA MCPG', mulChoiceQuestions)
  console.log( 'PREGUNTAS EN OTRA MCPG', mulChoiceQuestions.options )


  function handleRadio(event) {
    event.preventDefault();
    setInputID(event.target.id)
    setShowStyledInput(true)
  }

  return (
    <>
      <Navbar />
      <Container>
        <Section>
          <p>{position.title}</p>
          <InsideSection>
            <p>Pregunta 1 de 10</p>
            <TextSection>
              {mulChoiceQuestions[0].question.description}
            </TextSection>
            <Img src={example} />
            <OptionsSection >
              {mulChoiceQuestions.options && mulChoiceQuestions.options.map(option=>{
                {showStyledInput && (inputID === 'answer1') ?
                  <Option border={`1px solid ${colors.orange}`} id={`answer1`} background={`${colors.orange}`} label={`Descripcion de Opcion`} onClick={handleRadio} />
                  :
                  <Option border={`1px solid ${colors.gray[600]}`} id={`answer1`} background={`none`} label={`Descripcion de Opcion`} onClick={handleRadio} />
                }
              })
              }
{/*
              {showStyledInput && (inputID === 'answer2') ?
                <Option border={`1px solid ${colors.orange}`} id={`answer2`} background={`${colors.orange}`} label={`Descripcion de Opcion`} onClick={handleRadio} />
                :
                <Option border={`1px solid ${colors.gray[600]}`} id={`answer2`} background={`none`} label={`Descripcion de Opcion`} onClick={handleRadio} />
              }
              {showStyledInput && (inputID === 'answer3') ?
                <Option border={`1px solid ${colors.orange}`} id={`answer3`} background={`${colors.orange}`} label={`Descripcion de Opcion`} onClick={handleRadio} />
                :
                <Option border={`1px solid ${colors.gray[600]}`} id={`answer3`} background={`none`} label={`Descripcion de Opcion`} onClick={handleRadio} />
              }
              {showStyledInput && (inputID === 'answer4') ?
                <Option border={`1px solid ${colors.orange}`} id={`answer4`} background={`${colors.orange}`} label={`Descripcion de Opcion`} onClick={handleRadio} />
                :
                <Option border={`1px solid ${colors.gray[600]}`} id={`answer4`} background={`none`} label={`Descripcion de Opcion`} onClick={handleRadio} />
              } */}
              <Button
                width='88px'
                style={{ alignSelf: 'center', marginTop: '20px' }}
                onClick={() => navigate("/test-question")}
              > Enviar </Button>
            </OptionsSection>
          </InsideSection>

        </Section>
      </Container>
    </>
  )
}

export default MultipleChoicePage;
