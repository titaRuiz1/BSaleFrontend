import styled from "@emotion/styled";
import { useState } from "react";
import { useQuill } from 'react-quilljs';
import { Navigate, useNavigate } from "react-router";
import { colors, typography } from "../styles";
import Input from "./input";
import TextArea from "./textArea"
import { Button } from "./buttons";
import { useAuth } from "../context/auth-context";
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

function NewStage3Page() {
  const [editorContent, setEditorContent] = useState('');
  const { setView, objStages, setObjStages } = useAuth();
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: toolbar
    }
  })
  quill?.on('text-change', handleTextChange);

  function handleCurrentStage3(event) {
    event.preventDefault();
    const data = JSON.stringify(quill.getContents());
    setObjStages({ ...objStages, stage3: data });
    quill.setText('');
    setEditorContent('');
    setView('challenge_evaluation')
  };

  function handleTextChange() {
    setEditorContent(quill.root.innerHTML);
  }

  return (
    <>
      <FormContainer>
        <FieldSet>
          <Legend>Crear las Etapas de Evaluación</Legend>
          <Form onSubmit={handleCurrentStage3}>
            <FieldSet>
              <Legend2>Etapa 3: Revisión de código - Mejora continua</Legend2>
              <div ref={quillRef}></div>
              {editorContent.trim() ?
                <Button color={`${colors.teal}`} style={{marginTop:"8px"}}>Agregar</Button> :
                <Button disabled color={`${colors.lowOrange}`} style={{marginTop:"8px"}}>Agregar</Button>
              }
            </FieldSet>
          </Form>
        </FieldSet>

      </FormContainer>
    </>
  )
}
export default NewStage3Page;
