import styled from "@emotion/styled";
import { useState } from "react";
import { useQuill } from 'react-quilljs';
import { Navigate, useNavigate } from "react-router";
import { colors, typography } from "../styles";
import Input from "../components/input";
import TextArea from "../components/textArea"
import { Button } from "./buttons";
import { useAuth } from "../context/auth-context";
import TextEditor from "./text-editor";
import toolbar from "./toolbar";
import 'quill/dist/quill.snow.css'

const DivButtons = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100% ;
  gap:4px
`;

const FormContainer = styled.div`
  background:white;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  display:flex;
  flex-direction:column;
  align-items:center;
  padding:50px;
`;

const FieldSet = styled.fieldset`
  padding: 0.25rem 0.5rem;
  width: 100% 
  ${typography.lg};
  border: 1px solid ${colors.gray[600]};
  background-color: white;
  color: ${colors.gray[600]}
`;

const Legend = styled.legend`
  ${typography.text.xl}
  color: ${colors.blue}
`;

const Legend2 = styled.legend`
  ${typography.text.md}
  color: ${colors.blue}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 258px;
  align-items:center;
`;

const Title = styled.p`
  ${typography.text.xxl};
  color: ${colors.blue};
  margin: ${(props) => props.marginB || '32px'};
`;

function NewStagePage() {
  const [currentStage, setCurrentStage] = useState(1)
  const [showAdd, setShowAdd] = useState(false);
  const { view, setView, newPosition, setNewPosition, objStages, setObjStages } = useAuth();
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: toolbar
    }
  })

  function handleChange(event) {
    const { name, value } = event.target
    console.log('NOMBRE EN EL CHANGE', name)
    console.log('VALOR CHANGE', value)
    setNewPosition({ ...newPosition, [name]: value })

  }

  function handleCurrentStage1(event) {
    event.preventDefault();
    const data = JSON.stringify(quill.getContents())
    setObjStages({ ...objStages, stage1: data })
    setCurrentStage(2)
    // setShowAdd(true)
  };

  function handleCurrentStage2(event) {
    event.preventDefault();
    console.log('hace submit2')
    const data = JSON.stringify(quill.getContents())
    setObjStages({ ...objStages, stage2: data })
    setCurrentStage(3)
    // setShowAdd(true)
  };

  function handleCurrentStage3(event) {
    event.preventDefault();
    console.log('hace submit')
    const data = JSON.stringify(quill.getContents())
    setObjStages({ ...objStages, stage3: data })
    setShowAdd(true)
  };

  function handleBack(event) {
    event.preventDefault();
    console.log('back')
    setView('position')
  };

  function handleNext(event) {
    event.preventDefault();
    console.log('next')
    setView('multiple_choice')
  }

  console.log('EL OBJETO', objStages)
  return (
    <>
      <FormContainer>
        <FieldSet>
          <Legend>Crear las Etapas de Evaluación</Legend>
          {currentStage === 1 ?
            <Form onSubmit={handleCurrentStage1}>
              <FieldSet>
                <Legend2>Etapa 1</Legend2>
                <div ref={quillRef}></div>
                <Button color={`${colors.teal}`}>Agregar</Button>
              </FieldSet>

            </Form>

            : currentStage === 2 ?
              <Form onSubmit={handleCurrentStage2}>
                <FieldSet>
                  <Legend2>Etapa 2</Legend2>
                  <div ref={quillRef}></div>

                  <Button color={`${colors.teal}`}>Agregar</Button>
                </FieldSet>

              </Form>

              :
              <Form onSubmit={handleCurrentStage3}>
                <FieldSet>
                  <Legend2>Etapa 3</Legend2>
                  <div ref={quillRef}></div>
                  <Button color={`${colors.teal}`}>Agregar</Button>
                </FieldSet>

              </Form>
          }

        </FieldSet>

        {showAdd ?
          <DivButtons>
            <Button onClick={handleBack}>Atras</Button>
            <Button onClick={handleNext}>Siguiente</Button>
          </DivButtons>
          :
          <DivButtons>
            <Button onClick={handleBack}>Atras</Button>
          </DivButtons>
        }

      </FormContainer>
    </>
  )
}
export default NewStagePage;