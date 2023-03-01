import styled from "@emotion/styled";
import { useState, useEffect, useRef } from "react";
import { colors, typography } from "../../styles";
import Input from "../../components/input";
import TextArea from "../../components/textArea";
import { useAuth } from "../../context/auth-context"
import { Navbar } from "../../components/navbar";
import { Button } from "../../components/buttons";
import MultipleChoiceQuestionForm from "../../components/new-multiple-question-form";
import TestQuestionForm from "../../components/test-question-form";
import ChallengeEvluationForm from "../../components/challenge-evaluation-form";
import Confirmation from "../../components/confirmation-page";
import NewStage1Page from "../../components/stages-form";
import NewStage2Page from "../../components/stage2-form";
import NewStage3Page from "../../components/stage3-form";
import TestDescriptions from "../../components/test_descriptions-stage2";

import { useQuill } from 'react-quilljs';
import toolbar from "../../components/toolbar";
import 'quill/dist/quill.snow.css'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 50px;
  justify-content: center;
  align-items: center;
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
  width: 100%; 
  ${typography.lg};
  border: 1px solid ${colors.gray[600]};
  display:flex;
  flex-direction:column;
  background-color: white;
  gap:8px;
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

function NewPositionPage() {
  const { view, setView, newPosition, setNewPosition } = useAuth();
  const [editorContent, setEditorContent] = useState('');
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: toolbar
    }
  })
  quill?.on('text-change', handleTextChange);

  function handleChange(event) {
    const { name, value } = event.target
    setNewPosition({ ...newPosition, [name]: value })

  }

  function handleSubmitPosition(event) {
    event.preventDefault();
    const data = JSON.stringify(quill.getContents())
    setNewPosition({ ...newPosition, description: data })
    setView('stage1')
  }


  function handleTextChange() {
    setEditorContent(quill.root.innerHTML);
  }

  return (
    <>
      <Navbar />
      <Container>
        {view === 'position' ?
          <FormContainer>
            <Title>Crear nueva posición</Title>
            <Form onSubmit={handleSubmitPosition}>
              <FieldSet>
                <Legend>Posición</Legend>
                <Input
                  label={"Nombre de la nueva Posición"}
                  id="position"
                  name="title"
                  type="text"
                  required
                  value={newPosition.title}
                  onChange={handleChange}
                  placeholder="New Position"
                  style={{ borderRadius: '8px' }} />
                <div ref={quillRef} />
              </FieldSet>
              {editorContent.trim() ?
                <Button>Siguiente</Button> :
                <Button disabled color={`${colors.lowOrange}`}>Siguiente</Button>
              }
            </Form>
          </FormContainer>
          : view === 'stage1' ?
            <NewStage1Page />
            : view === 'multiple_choice' ?
              <MultipleChoiceQuestionForm /> :
              view === 'test_question' ?
                <TestQuestionForm /> :
                view === 'stage2' ?
                  <NewStage2Page /> :
                  view === 'test_descriptions' ?
                    <TestDescriptions /> :
                    view === 'stage3' ?
                      <NewStage3Page /> :
                      view === 'challenge_evaluation' ? <ChallengeEvluationForm /> :
                        view === 'confirmation' ? <Confirmation /> : null
        }

      </Container>
    </>
  )

}
export default NewPositionPage;