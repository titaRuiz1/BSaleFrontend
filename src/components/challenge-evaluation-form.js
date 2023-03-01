import styled from "@emotion/styled";
import { useState } from "react";
import { useQuill } from 'react-quilljs';
import { useNavigate } from "react-router";
import { colors, typography } from "../styles";
import Input from "../components/input";
import { Button } from "./buttons";
import { useAuth } from "../context/auth-context";
import toolbar from "./toolbar";
import 'quill/dist/quill.snow.css'

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
  display:flex;
  flex-direction:column;
  padding: 8px;
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

const DivButtons = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100% ;
  gap:4px
`;

function ChallengeEvluationForm() {
  const [newChallengeEvaluation1, setNewChallengeEvaluation1] = useState({ description: '', category: '', criteria: '', weighting: '' });
  const [newChallengeEvaluation2, setNewChallengeEvaluation2] = useState({ description: '', category: '', criteria: '', weighting: '' });
  const [newChallengeEvaluation3, setNewChallengeEvaluation3] = useState({ description: '', category: '', criteria: '', weighting: '' });
  const [newChallengeEvaluation4, setNewChallengeEvaluation4] = useState({ description: '', category: '', criteria: '', weighting: '' });
  const [criteria, setCriteria] = useState(1);
  const [editorContent, setEditorContent] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const { setView, objStages, newPosition, setNewPosition, arrMultiChoiceQuestion, arrTestQuestion } = useAuth();
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: toolbar
    }
  })
  quill?.on('text-change', handleTextChange);

  function handleChange(event) {
    const { name, value } = event.target
    if (event.target.id === 'criterio1') {
      setNewChallengeEvaluation1({ ...newChallengeEvaluation1, [name]: value })
    } else if (event.target.id === 'criterio2') {
      setNewChallengeEvaluation2({ ...newChallengeEvaluation2, [name]: value })
    } else if (event.target.id === 'criterio3') {
      setNewChallengeEvaluation3({ ...newChallengeEvaluation3, [name]: value })
    }
    else {
      setNewChallengeEvaluation4({ ...newChallengeEvaluation4, [name]: value })
    }
  };

  function handleCriterio1(event) {
    event.preventDefault();
    console.log('hace submit')
    const data = JSON.stringify(quill.getContents())
    setNewChallengeEvaluation1({ ...newChallengeEvaluation1, description: data });
    quill.setText('');
    setEditorContent('');
    setCriteria(2)
  };

  function handleCriterio2(event) {
    event.preventDefault();
    console.log('hace submit2')
    const data = JSON.stringify(quill.getContents());
    setNewChallengeEvaluation2({ ...newChallengeEvaluation2, description: data });
    quill.setText('');
    setEditorContent('');
    setCriteria(3)
  };

  function handleCriterio3(event) {
    event.preventDefault();
    console.log('hace submit')
    const data = JSON.stringify(quill.getContents());
    setNewChallengeEvaluation3({ ...newChallengeEvaluation3, description: data });
    quill.setText('');
    setEditorContent('');
    setCriteria(4)
  };

  function handleCriterio4(event) {
    event.preventDefault();
    console.log('hace submit')
    const data = JSON.stringify(quill.getContents());
    setNewChallengeEvaluation4({ ...newChallengeEvaluation4, description: data });
    setShowAdd(true)
  };

  function handleAdd(event) {
    event.preventDefault();
    setNewPosition({
      ...newPosition, stage_attributes: objStages, multiple_choice_questions_attributes: arrMultiChoiceQuestion,
      test_questions_attributes: arrTestQuestion,
      challenge_evaluations_attributes: [newChallengeEvaluation1, newChallengeEvaluation2, newChallengeEvaluation3, newChallengeEvaluation4]
    })
    setShowAdd(false);
    quill.setText('');
    setEditorContent('');
    setView('confirmation')
  };

  function handleTextChange() {
    setEditorContent(quill.root.innerHTML);
  }
  return (
    <>
      <FormContainer>
        <FieldSet>
          <Legend>Crear los Criterios de Evaluación</Legend>
          {criteria === 1 ?
            <Form onSubmit={handleCriterio1}>
              <FieldSet>
                <Legend2>Criterio 1</Legend2>
                <Input
                  label={"Categoría"}
                  id="criterio1"
                  name="category"
                  type="text"
                  value={newChallengeEvaluation1.category}
                  onChange={handleChange}
                  placeholder="La categoría es..."
                  style={{ borderRadius: '8px' }}
                  required />
                <Input
                  label={"Criterio"}
                  id="criterio1"
                  name="criteria"
                  type="text"
                  value={newChallengeEvaluation1.criteria}
                  onChange={handleChange}
                  placeholder="El criterio a evaluar es..."
                  style={{ borderRadius: '8px' }}
                  required />
                <div ref={quillRef}></div>
                <Input
                  label={"Peso"}
                  id="criterio1"
                  name="weighting"
                  type="text"
                  value={newChallengeEvaluation1.weighting}
                  onChange={handleChange}
                  placeholder="0.25"
                  style={{ borderRadius: '8px' }}
                  required />
                {editorContent.trim() ?
                  <Button color={`${colors.teal}`} style={{marginTop:"8px"}}>Agregar</Button> :
                  <Button disabled color={`${colors.lowOrange}`} style={{marginTop:"8px"}}>Agregar</Button>
                }
              </FieldSet>

            </Form>

            : criteria === 2 ?
              <Form onSubmit={handleCriterio2}>
                <FieldSet>
                  <Legend2>Criterio 2</Legend2>
                  <Input
                    label={"Categoría"}
                    id="criterio2"
                    name="category"
                    type="text"
                    value={newChallengeEvaluation2.category}
                    onChange={handleChange}
                    placeholder="La categoría es..."
                    style={{ borderRadius: '8px' }}
                    required />
                  <Input
                    label={"Criterio"}
                    id="criterio2"
                    name="criteria"
                    type="text"
                    value={newChallengeEvaluation2.criteria}
                    onChange={handleChange}
                    placeholder="El criterio a evaluar es..."
                    style={{ borderRadius: '8px' }}
                    required />
                  <div ref={quillRef}></div>

                  <Input
                    label={"Peso"}
                    id="criterio2"
                    name="weighting"
                    type="text"
                    value={newChallengeEvaluation2.weighting}
                    onChange={handleChange}
                    placeholder="0.25"
                    style={{ borderRadius: '8px' }}
                    required />
                  {editorContent.trim() ?
                    <Button color={`${colors.teal}`} style={{marginTop:"8px"}}>Agregar</Button> :
                    <Button disabled color={`${colors.lowOrange}`} style={{marginTop:"8px"}}>Agregar</Button>
                  }
                </FieldSet>

              </Form>

              : criteria === 3 ?
                <Form onSubmit={handleCriterio3}>
                  <FieldSet>
                    <Legend2>Criterio 3</Legend2>
                    <Input
                      label={"Categoría"}
                      id="criterio3"
                      name="category"
                      type="text"
                      value={newChallengeEvaluation3.category}
                      onChange={handleChange}
                      placeholder="La categoría es..."
                      style={{ borderRadius: '8px' }}
                      required />
                    <Input
                      label={"Criterio"}
                      id="criterio3"
                      name="criteria"
                      type="text"
                      value={newChallengeEvaluation3.criteria}
                      onChange={handleChange}
                      placeholder="El criterio a evaluar es..."
                      style={{ borderRadius: '8px' }}
                      required />
                    <div ref={quillRef}></div>

                    <Input
                      label={"Peso"}
                      id="criterio3"
                      name="weighting"
                      type="text"
                      value={newChallengeEvaluation3.weighting}
                      onChange={handleChange}
                      placeholder="0.25"
                      style={{ borderRadius: '8px' }}
                      required />
                    {editorContent.trim() ?
                      <Button color={`${colors.teal}`} style={{marginTop:"8px"}}>Agregar</Button> :
                      <Button disabled color={`${colors.lowOrange}`} style={{marginTop:"8px"}}>Agregar</Button>
                    }
                  </FieldSet>

                </Form>
                :
                <Form onSubmit={handleCriterio4}>
                  <FieldSet>
                    <Legend2>Criterio 4</Legend2>
                    <Input
                      label={"Categoría"}
                      id="criterio4"
                      name="category"
                      type="text"
                      value={newChallengeEvaluation4.category}
                      onChange={handleChange}
                      placeholder="La categoría es..."
                      style={{ borderRadius: '8px' }}
                      required />
                    <Input
                      label={"Criterio"}
                      id="criterio4"
                      name="criteria"
                      type="text"
                      value={newChallengeEvaluation4.criteria}
                      onChange={handleChange}
                      placeholder="El criterio a evaluar es..."
                      style={{ borderRadius: '8px' }}
                      required />
                    <div ref={quillRef}></div>

                    <Input
                      label={"Peso"}
                      id="criterio4"
                      name="weighting"
                      type="text"
                      value={newChallengeEvaluation4.weighting}
                      onChange={handleChange}
                      placeholder="0.25"
                      style={{ borderRadius: '8px' }}
                      required />
                    {editorContent.trim() ?
                      <Button color={`${colors.teal}`} style={{marginTop:"8px"}}>Agregar</Button> :
                      <Button disabled color={`${colors.lowOrange}`} style={{marginTop:"8px"}}>Agregar</Button>
                    }

                  </FieldSet>

                </Form>
          }

        </FieldSet>

        <DivButtons>
          {showAdd ? <Button width='100%' onClick={handleAdd}>Finalizar Proceso</Button> : null}
        </DivButtons>
      </FormContainer>
    </>
  )

}
export default ChallengeEvluationForm;