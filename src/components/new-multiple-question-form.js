import styled from "@emotion/styled";
import { useState } from "react";
import { colors, typography } from "../styles";
import Input from "../components/input";
import TextArea from "../components/textArea"
import { Button } from "./buttons";
import { useAuth } from "../context/auth-context";
import { useQuill } from 'react-quilljs';
import toolbar from "../components/toolbar";
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

function MultipleChoiceQuestionForm() {
  const [newMultiQuestion, setNewMultiQuestion] = useState({ description: '', options_attributes: [], solution_attributes: null });
  const [option1, setOption1] = useState({ description: '', correct: 'false' });
  const [option2, setOption2] = useState({ description: '', correct: 'false' });
  const [option3, setOption3] = useState({ description: '', correct: 'false' });
  const [option4, setOption4] = useState({ description: '', correct: 'false' });
  const [editorContent, setEditorContent] = useState('');
  const [showSol, setShowSol] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const { view, setView, arrMultiChoiceQuestion, setArrMultiChoiceQuestion, newPosition } = useAuth();
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: toolbar
    }
  })
  quill?.on('text-change', handleTextChange);

  function handleChange(event) {
    const { name, value } = event.target
    if (event.target.id === 'mchq1') {
      setNewMultiQuestion({ ...newMultiQuestion, [name]: value })
    } else {
      name === 'op1' ?
        setOption1({ ...option1, description: value })
        : name === 'op2' ?
          setOption2({ ...option2, description: value })
          : name === 'op3' ?
            setOption3({ ...option3, description: value })
            : setOption4({ ...option4, description: value })
    }
  };

  function handleCorrect(questionId, event) {
    const { value, id } = event.target
    if (id === 'true1') {
      setOption1({ ...option1, correct: value })
      setSelectedOptions({ ...selectedOptions, [questionId]: id })
    } else if (id === 'false1') {
      setOption1({ ...option1, correct: value })
      setSelectedOptions({ ...selectedOptions, [questionId]: id })
    } else if (id === 'true2') {
      setOption2({ ...option2, correct: value })
      setSelectedOptions({ ...selectedOptions, [questionId]: id })
    } else if (id === 'false2') {
      setOption2({ ...option2, correct: value })
      setSelectedOptions({ ...selectedOptions, [questionId]: id })
    } else if (id === 'true3') {
      setOption3({ ...option3, correct: value })
      setSelectedOptions({ ...selectedOptions, [questionId]: id })
    } else if (id === 'false3') {
      setOption3({ ...option3, correct: value })
      setSelectedOptions({ ...selectedOptions, [questionId]: id })
    } else if (id === 'true4') {
      setOption4({ ...option4, correct: value })
      setSelectedOptions({ ...selectedOptions, [questionId]: id })
    } else {
      setOption4({ ...option4, correct: value })
      setSelectedOptions({ ...selectedOptions, [questionId]: id })
    }
  };

  function handleSubmitMultipleChoiceQuestion(event) {
    event.preventDefault();
    const data = JSON.stringify(quill.getContents())
    setNewMultiQuestion({ ...newMultiQuestion, description: data, options_attributes: [option1, option2, option3, option4] })
    quill.setText('');
    setEditorContent('');
    setShowSol(true);
  };

  function handleSubmitSolution(event) {
    event.preventDefault();
    const data = JSON.stringify(quill.getContents())
    setNewMultiQuestion({ ...newMultiQuestion, solution_attributes: { description: data } })
    setShowAdd(true)
  }

  function handleAdd(event) {
    event.preventDefault();
    arrMultiChoiceQuestion.length === 0 ? setArrMultiChoiceQuestion([newMultiQuestion])
      : setArrMultiChoiceQuestion([...arrMultiChoiceQuestion, newMultiQuestion]);

    setNewMultiQuestion({ description: '', options_attributes: [] });
    setOption1({ description: '', correct: 'false' });
    setOption2({ description: '', correct: 'false' });
    setOption3({ description: '', correct: 'false' });
    setOption4({ description: '', correct: 'false' });
    setSelectedOptions({});
    setShowSol(false);
    setShowAdd(false);
    quill?.setText('');
    setEditorContent('');
  };

  function handleNext(event) {
    event.preventDefault();
    arrMultiChoiceQuestion.length === 0 ? setArrMultiChoiceQuestion([newMultiQuestion])
      : setArrMultiChoiceQuestion([...arrMultiChoiceQuestion, newMultiQuestion]);
    quill.setText('');
    setEditorContent('');
    setView('test_question')
  }

  function handleTextChange() {
    setEditorContent(quill.root.innerHTML);
  }

  return (
    <>
      <FormContainer>
        {showSol ?
          <Form onSubmit={handleSubmitSolution}>
            <FieldSet>
              <Legend>Solución</Legend>
              <div ref={quillRef}></div>
            </FieldSet>
            {editorContent.trim() ?
              <Button>Añadir Solución</Button> :
              <Button disabled color={`${colors.lowOrange}`}>Añadir Solución</Button>
            }
          </Form>
          :
          <Form onSubmit={handleSubmitMultipleChoiceQuestion}>
            <FieldSet>
              <Legend>Crear Preguntas de Opción Multiple </Legend>
              <div ref={quillRef}></div>
              <FieldSet>
                <Legend2>Opción1</Legend2>
                <Input
                  label={"Descripción"}
                  id="mchq_op1"
                  name="op1"
                  type="text"
                  value={option1.description}
                  onChange={handleChange}
                  placeholder="Opción 1"
                  style={{ borderRadius: '8px' }}
                  required />
                <p>Opción correcta</p>
                <div>
                  <label htmlFor="true">Sí</label>
                  <input
                    id="true1"
                    name="correct1"
                    type="radio"
                    value={true}
                    checked={selectedOptions.question1 === 'true1'}
                    onClick={event => handleCorrect("question1", event)}
                    placeholder="Pregunta"
                    style={{ accentColor: colors.green }} />
                  <label htmlFor="false">No</label>
                  <input
                    id="false1"
                    name="correct1"
                    type="radio"
                    value={false}
                    checked={selectedOptions.question1 === 'false1'}
                    onClick={event => handleCorrect("question1", event)}
                    placeholder="Pregunta"
                    style={{ accentColor: colors.red }} />
                </div>
              </FieldSet>
              <FieldSet>
                <Legend2>Opción2</Legend2>
                <Input
                  label={"Descripción"}
                  id="mchq_op2"
                  name="op2"
                  type="text"
                  value={option2.description}
                  onChange={handleChange}
                  placeholder="Opción 1"
                  style={{ borderRadius: '8px' }}
                  required />
                <p>Opción correcta</p>
                <div>
                  <label htmlFor="true">Sí</label>
                  <input
                    id="true2"
                    name="correct2"
                    type="radio"
                    value={true}
                    checked={selectedOptions.question2 === 'true2'}
                    onClick={event => handleCorrect("question2", event)}
                    placeholder="Pregunta"
                    style={{ accentColor: colors.green }} />
                  <label htmlFor="false">No</label>
                  <input
                    id="false2"
                    name="correct2"
                    type="radio"
                    value={false}
                    checked={selectedOptions.question2 === 'false2'}
                    onClick={event => handleCorrect("question2", event)}
                    placeholder="Pregunta"
                    style={{ accentColor: colors.red }} />
                </div>
              </FieldSet>
              <FieldSet>
                <Legend2>Opción3</Legend2>
                <Input
                  label={"Descripción"}
                  id="mchq_op3"
                  name="op3"
                  type="text"
                  value={option3.description}
                  onChange={handleChange}
                  placeholder="Opción 1"
                  style={{ borderRadius: '8px' }}
                  required />
                <p>Opción correcta</p>
                <div>
                  <label htmlFor="true">Sí</label>
                  <input
                    id="true3"
                    name="correct3"
                    type="radio"
                    value={true}
                    checked={selectedOptions.question3 === 'true3'}
                    onClick={event => handleCorrect("question3", event)}
                    placeholder="Pregunta"
                    style={{ accentColor: colors.green }} />
                  <label htmlFor="false">No</label>
                  <input
                    id="false3"
                    name="correct3"
                    type="radio"
                    value={false}
                    checked={selectedOptions.question3 === 'false3'}
                    onClick={event => handleCorrect("question3", event)}
                    placeholder="Pregunta"
                    style={{ accentColor: colors.red }} />
                </div>
              </FieldSet>
              <FieldSet>
                <Legend2>Opción4</Legend2>
                <Input
                  label={"Descripción"}
                  id="mchq_op4"
                  name="op4"
                  type="text"
                  value={option4.description}
                  onChange={handleChange}
                  placeholder="Opción 1"
                  style={{ borderRadius: '8px' }}
                  required />
                <p>Opción correcta</p>
                <div>
                  <label htmlFor="true">Sí</label>
                  <input
                    id="true4"
                    name="correct4"
                    type="radio"
                    value={true}
                    checked={selectedOptions.question4 === 'true4'}
                    onClick={event => handleCorrect("question4", event)}
                    placeholder="Pregunta"
                    style={{ accentColor: colors.green }} />
                  <label htmlFor="false">No</label>
                  <input
                    id="false4"
                    name="correct4"
                    type="radio"
                    value={false}
                    checked={selectedOptions.question4 === 'false4'}
                    onClick={event => handleCorrect("question4", event)}
                    placeholder="Pregunta"
                    style={{ accentColor: colors.red }} />
                </div>
              </FieldSet>
            </FieldSet>
            {editorContent.trim() ?
              <Button color={`${colors.teal}`}>Agregar</Button> :
              <Button disabled color={`${colors.lowOrange}`}>Agregar</Button>
            }
          </Form>
        }
        {showAdd ?
          <DivButtons>
            <Button width='100%' onClick={handleAdd}>Añadir nueva pregunta multiple</Button>
            <Button onClick={handleNext}>Siguiente</Button>
          </DivButtons>
          :
          null
        }
      </FormContainer>
    </>
  )

}
export default MultipleChoiceQuestionForm;