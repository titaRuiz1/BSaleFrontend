import { useState } from "react";
import styled from "@emotion/styled";
import example from "../assets/example.svg";
import { colors, typography } from "../styles";
import { Navbar } from "../components/navbar";
import { Button } from "../components/buttons"

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
  const [showStyledInput, setShowStyledInput] = useState(false);
  const [inputID, setInputID] = useState(null);

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
          <p>Desarrollador Web Junior</p>
          <InsideSection>
            <p>Pregunta 1 de 10</p>
            <TextSection>
              Eget mollis mauris vivamus eget cursus tincidunt mauris nisi. Adipiscing sit dolor blandit et mattis. Sagittis non ultrices viverra non ac tempor. Posuere felis at ultricies purus libero diam. Non non urna tellus vehicula auctor ut massa malesuada. Nulla fermentum in donec mi maecenas iaculis amet mauris est.
            </TextSection>
            <Img src={example} />
            <OptionsSection >

              {showStyledInput && (inputID === 'answer1') ?
                <Options border={`1px solid ${colors.orange}`}>
                  <InputRadio type='radio' name='opcion' id='answer1' value='answer1' onClick={handleRadio} />
                  <Label htmlFor='answer1' background={`${colors.orange}`}>  Descripcion de Opcion</Label>
                </Options>
                : <Options border={`1px solid ${colors.gray[600]}`}>
                  <InputRadio type='radio' name='opcion' id='answer1' value='answer1' onClick={handleRadio} />
                  <Label htmlFor='answer1' background='none'>  Descripcion de Opcion</Label>
                </Options>
              }

              {showStyledInput && (inputID === 'answer2') ?
                <Options border={`1px solid ${colors.orange}`}>
                  <InputRadio type='radio' name='opcion' id='answer2' value='answer2' onClick={handleRadio} />
                  <Label htmlFor='answer2' background={`${colors.orange}`}>  Descripcion de Opcion</Label>
                </Options>
                : <Options border={`1px solid ${colors.gray[600]}`}>
                  <InputRadio type='radio' name='opcion' id='answer2' value='answer2' onClick={handleRadio} />
                  <Label htmlFor='answer2' background='none'>  Descripcion de Opcion</Label>
                </Options>
              }
              {showStyledInput && (inputID === 'answer3') ?
                <Options border={`1px solid ${colors.orange}`}>
                  <InputRadio type='radio' name='opcion' id='answer3' value='answer3' onClick={handleRadio} />
                  <Label htmlFor='answer3' background={`${colors.orange}`}>  Descripcion de Opcion</Label>
                </Options>
                : <Options border={`1px solid ${colors.gray[600]}`}>
                  <InputRadio type='radio' name='opcion' id='answer3' value='answer3' onClick={handleRadio} />
                  <Label htmlFor='answer3' background='none'>  Descripcion de Opcion</Label>
                </Options>
              }
              {showStyledInput && (inputID === 'answer4') ?
                <Options border={`1px solid ${colors.orange}`}>
                  <InputRadio type='radio' name='opcion' id='answer4' value='answer4' onClick={handleRadio} />
                  <Label htmlFor='answer4' background={`${colors.orange}`}>  Descripcion de Opcion</Label>
                </Options>
                : <Options border={`1px solid ${colors.gray[600]}`}>
                  <InputRadio type='radio' name='opcion' id='answer4' value='answer4' onClick={handleRadio} />
                  <Label htmlFor='answer4' background='none'>  Descripcion de Opcion</Label>
                </Options>
              }
              <Button width='88px' style={{ alignSelf: 'center', marginTop: '20px' }}> Enviar </Button>
            </OptionsSection>
          </InsideSection>

        </Section>
      </Container>
    </>
  )
}

export default MultipleChoicePage;
