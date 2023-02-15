import styled from "@emotion/styled";
import { useState } from "react";
import { colors, typography } from "../../styles";
import Input from "../../components/input";
import TextArea from "../../components/textArea";
import { useAuth } from "../../context/auth-context"
import { Navbar } from "../../components/navbar";
import { Button } from "../../components/buttons";
import MultipleChoiceQuestionForm from "../../components/new-multiple-question-form";
import TestQuestionForm from "../../components/test-question-form";
import ChallengeEvluationForm from "../../components/challenge-evaluation-form";
import Confirmation from "../../components/confirmation-page"

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

function NewPositionPage() {
  // const [newPosition, setNewPosition] = useState({ title: '', description: '' });
  const { view, setView, newPosition, setNewPosition } = useAuth();

  function handleSubmitPosition(event) {
    event.preventDefault();
  }

  function handleChange(event) {
    const { name, value } = event.target
    setNewPosition({ ...newPosition, [name]: value })

  }

  function handleSubmitPosition(event) {
    event.preventDefault();

    setView('multiple_choice')
  }

  return (
    <>
      <Navbar />
      <Container>
        {view === 'position' ?
          <FormContainer>
            <Title>Create New Position</Title>
            <Form onSubmit={handleSubmitPosition}>
              <FieldSet>
                <Legend>Posición</Legend>
                <Input
                  label={"Nombre de la nueva Posición"}
                  id="position"
                  name="title"
                  type="text"
                  value={newPosition.title}
                  onChange={handleChange}
                  placeholder="New Position"
                  style={{ borderRadius: '8px' }} />

                <TextArea
                  label={"Deescripción de la nueva Posición"}
                  id="description"
                  name="description"
                  cols='60'
                  value={newPosition.description}
                  onChange={handleChange}
                  placeholder="This position..." />
              </FieldSet>
              <Button>Siguiente</Button>
            </Form>
          </FormContainer>
          : view === 'multiple_choice' ?
            <MultipleChoiceQuestionForm /> :
            view === 'test_question' ?
              <TestQuestionForm /> :
              view === 'challenge_evaluation' ? <ChallengeEvluationForm /> :
                view === 'confirmation' ? <Confirmation /> : null
        }

      </Container>
    </>
  )

}
export default NewPositionPage;