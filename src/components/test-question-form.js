import styled from "@emotion/styled";
import { useState } from "react";
import Editor from "@monaco-editor/react";
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

const EditorWrapp = styled.div`
  display: flex;
  flex-direction: column;
  height: 270px; 
  width:500px;
  align-items: center; 
  justify-content: center; 
  padding: 0px 30px 
`;

const DivInput = styled.div`
  display: flex;
  flex-direction: row; 
  gap: 8px 
`;

const DivButtons = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100% ;
  gap:4px
`;
const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
`;
const LabelSelect = styled.label`
color: ${colors.gray[600]};
`;

const StyledSelect = styled.select`
  padding: 0.25rem 0.5rem;
  ${typography.lg};
  border: 1px solid ${colors.gray[600]};
  border-radius: 8px;
  background-color: white;
  color: ${colors.gray[600]};

`;

function TestQuestionForm() {
  const [newTestQuestion, setNewTestQuestion] = useState({ description: '', code: '', tests_attributes: [], solution_attributes: null });
  const [test1, setTest1] = useState({ test: '', input: '', output: '', input_type: '', output_type: '' });
  const [test2, setTest2] = useState({ test: '', input: '', output: '', input_type: '', output_type: '' });
  const [test3, setTest3] = useState({ test: '', input: '', output: '', input_type: '', output_type: '' });
  const [test4, setTest4] = useState({ test: '', input: '', output: '', input_type: '', output_type: '' });
  const [showSol, setShowSol] = useState(false);
  const [showButtonTest, setShowButtonTest] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  const { setView, arrTestQuestion, setArrTestQuestion } = useAuth();
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: toolbar
    }
  });
  quill?.on('text-change', handleTextChange);


  function handleSubmitTestQuestion(event) {
    event.preventDefault();
    console.log('hace submit')
    const data = JSON.stringify(quill.getContents())
    setNewTestQuestion({ ...newTestQuestion, description: data, tests_attributes: [test1, test2, test3, test4] });
    quill.setText('');
    setEditorContent('');
    setShowSol(true)
    
  };

  function handleSubmitSolution(event) {
    event.preventDefault();
    console.log('hace submit2')
    const data = JSON.stringify(quill.getContents())
    setNewTestQuestion({ ...newTestQuestion, solution_attributes: { description: data } })
    setShowAdd(true)
    setShowButtonTest(false)
  }

  function handleAdd(event) {
    setShowButtonTest(true)
    event.preventDefault();
    arrTestQuestion.length === 0 ? setArrTestQuestion([newTestQuestion])
      : setArrTestQuestion([...arrTestQuestion, newTestQuestion]);

    setNewTestQuestion({ description: '', code: '', tests_attributes: [], solution_attributes: null });
    setTest1({ test: '', input: '', output: '', input_type: '', output_type: '' });
    setTest2({ test: '', input: '', output: '', input_type: '', output_type: '' });
    setTest3({ test: '', input: '', output: '', input_type: '', output_type: '' });
    setTest4({ test: '', input: '', output: '', input_type: '', output_type: '' });
    quill.setText('');
    setEditorContent('');
    setShowSol(false);
    setShowAdd(false);
  };

  function handleNext(event) {
    setShowButtonTest(true)
    event.preventDefault();
    arrTestQuestion.length === 0 ? setArrTestQuestion([newTestQuestion])
      : setArrTestQuestion([...arrTestQuestion, newTestQuestion]);
    setView('stage2');
    quill.setText('');
    setEditorContent('');
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
            {showButtonTest ? 
              editorContent.trim() ?
              <Button style={{height:"50px"}}>Añadir Solución</Button> :
              <Button disabled color={`${colors.lowOrange}`} style={{height:"50px"}}>Añadir Solución</Button>
              : 
              null
            }
          </Form>
          :
          <Form onSubmit={handleSubmitTestQuestion}>
            <FieldSet>
              <Legend>Crear Preguntas de tipo Test </Legend>
              <div ref={quillRef}></div>
              <FieldSet>
                <Legend2>Código base</Legend2>
                <EditorWrapp>
                  <Editor
                    language="javascript"
                    theme="vs-dark"
                    name="code"
                    value={newTestQuestion.code}
                    onChange={value => setNewTestQuestion({ ...newTestQuestion, code: value })}
                    width="100%"
                    height="100%"
                  />
                </EditorWrapp>
              </FieldSet>

              <FieldSet>
                <Legend2>Test1</Legend2>
                <Input
                  label={"Descripción"}
                  id="test1"
                  name="test"
                  type="text"
                  value={test1.test}
                  onChange={event => setTest1({ ...test1, test: event.target.value })}
                  placeholder="Test: sum(x,y)"
                  style={{ borderRadius: '8px' }}
                  required />

                <DivInput>
                  <Input
                    label={"Input"}
                    id="test1"
                    name="input"
                    type="text"
                    value={test1.input}
                    onChange={event => setTest1({ ...test1, input: event.target.value })}
                    placeholder="x,y"
                    style={{ borderRadius: '8px' }}
                    required />
                  <SelectContainer>
                    <LabelSelect htmlFor="input_types">Tipo de Input</LabelSelect>
                    <StyledSelect onChange={event => setTest1({ ...test1, input_type: event.target.value })} name="input_types" id="input_types" defaultValue={'DEFAULT'} required>
                      <option value="DEFAULT" disabled >Tipo de input...</option>
                      <option value="array_number">Array Number</option>
                      <option value="array_string">Array String</option>
                      <option value="boolean">Boolean</option>
                      <option value="number">Number</option>
                      <option value="string">String</option>
                    </StyledSelect>
                  </SelectContainer>
                </DivInput>

                <DivInput>
                  <Input
                    label={"Output"}
                    id="test1"
                    name="output"
                    type="text"
                    value={test1.output}
                    onChange={event => setTest1({ ...test1, output: event.target.value })}
                    placeholder="xy"
                    style={{ borderRadius: '8px' }}
                    required />
                  <SelectContainer>
                    <LabelSelect htmlFor="output_types">Tipo de Output</LabelSelect>
                    <StyledSelect onChange={event => setTest1({ ...test1, output_type: event.target.value })} name="output_types" id="output_types" defaultValue={'DEFAULT'} required>
                      <option value="DEFAULT" disabled >Tipo de output...</option>
                      <option value="array_number">Array Number</option>
                      <option value="array_string">Array String</option>
                      <option value="boolean">Boolean</option>
                      <option value="number">Number</option>
                      <option value="string">String</option>
                    </StyledSelect>
                  </SelectContainer>
                </DivInput>
              </FieldSet>

              <FieldSet>
                <Legend2>Test2</Legend2>
                <Input
                  label={"Descripción"}
                  id="test2"
                  name="test"
                  type="text"
                  value={test2.test}
                  onChange={event => setTest2({ ...test2, test: event.target.value })}
                  placeholder="Test: sum(x,y)"
                  style={{ borderRadius: '8px' }}
                  required />

                <DivInput>
                  <Input
                    label={"Input"}
                    id="test2"
                    name="input"
                    type="text"
                    value={test2.input}
                    onChange={event => setTest2({ ...test2, input: event.target.value })}
                    placeholder="x,y"
                    style={{ borderRadius: '8px' }}
                    required />
                  <SelectContainer>
                    <LabelSelect htmlFor="input_types">Tipo de Input</LabelSelect>
                    <StyledSelect onChange={event => setTest2({ ...test2, input_type: event.target.value })} name="input_types" id="input_types" defaultValue={'DEFAULT'} required>
                      <option value="DEFAULT" disabled >Tipo de input...</option>
                      <option value="array_number">Array Number</option>
                      <option value="array_string">Array String</option>
                      <option value="boolean">Boolean</option>
                      <option value="number">Number</option>
                      <option value="string">String</option>
                    </StyledSelect>
                  </SelectContainer>
                </DivInput>

                <DivInput>
                  <Input
                    label={"Output"}
                    id="test2"
                    name="output"
                    type="text"
                    value={test2.output}
                    onChange={event => setTest2({ ...test2, output: event.target.value })}
                    placeholder="xy"
                    style={{ borderRadius: '8px' }}
                    required />
                  <SelectContainer>
                    <LabelSelect htmlFor="output_types">Tipo de Output</LabelSelect>
                    <StyledSelect onChange={event => setTest2({ ...test2, output_type: event.target.value })} name="output_types" id="output_types" defaultValue={'DEFAULT'} required>
                      <option value="DEFAULT" disabled >Tipo de output...</option>
                      <option value="array_number">Array Number</option>
                      <option value="array_string">Array String</option>
                      <option value="boolean">Boolean</option>
                      <option value="number">Number</option>
                      <option value="string">String</option>
                    </StyledSelect>
                  </SelectContainer>
                </DivInput>
              </FieldSet>

              <FieldSet>
                <Legend2>Test3</Legend2>
                <Input
                  label={"Descripción"}
                  id="test3"
                  name="test"
                  type="text"
                  value={test3.test}
                  onChange={event => setTest3({ ...test3, test: event.target.value })}
                  placeholder="Test: sum(x,y)"
                  style={{ borderRadius: '8px' }}
                  required />

                <DivInput>
                  <Input
                    label={"Input"}
                    id="test3"
                    name="input"
                    type="text"
                    value={test3.input}
                    onChange={event => setTest3({ ...test3, input: event.target.value })}
                    placeholder="x,y"
                    style={{ borderRadius: '8px' }}
                    required />

                  <SelectContainer>
                    <LabelSelect htmlFor="input_types">Tipo de Input</LabelSelect>
                    <StyledSelect onChange={event => setTest3({ ...test3, input_type: event.target.value })} name="input_types" id="input_types" defaultValue={'DEFAULT'} required>
                      <option value="DEFAULT" disabled >Tipo de input...</option>
                      <option value="array_number">Array Number</option>
                      <option value="array_string">Array String</option>
                      <option value="boolean">Boolean</option>
                      <option value="number">Number</option>
                      <option value="string">String</option>
                    </StyledSelect>
                  </SelectContainer>
                </DivInput>

                <DivInput>
                  <Input
                    label={"Output"}
                    id="test3"
                    name="output"
                    type="text"
                    value={test3.output}
                    onChange={event => setTest3({ ...test3, output: event.target.value })}
                    placeholder="xy"
                    style={{ borderRadius: '8px' }}
                    required />
                  <SelectContainer>
                    <LabelSelect htmlFor="output_types">Tipo de Output</LabelSelect>
                    <StyledSelect onChange={event => setTest3({ ...test3, output_type: event.target.value })} name="output_types" id="output_types" defaultValue={'DEFAULT'} required>
                      <option value="DEFAULT" disabled >Tipo de output...</option>
                      <option value="array_number">Array Number</option>
                      <option value="array_string">Array String</option>
                      <option value="boolean">Boolean</option>
                      <option value="number">Number</option>
                      <option value="string">String</option>
                    </StyledSelect>
                  </SelectContainer>
                </DivInput>
              </FieldSet>

              <FieldSet>
                <Legend2>Test4</Legend2>
                <Input
                  label={"Descripción"}
                  id="test4"
                  name="test"
                  type="text"
                  value={test4.test}
                  onChange={event => setTest4({ ...test4, test: event.target.value })}
                  placeholder="Test: sum(x,y)"
                  style={{ borderRadius: '8px' }}
                  required />

                <DivInput>
                  <Input
                    label={"Input"}
                    id="test4"
                    name="input"
                    type="text"
                    value={test4.input}
                    onChange={event => setTest4({ ...test4, input: event.target.value })}
                    placeholder="x,y"
                    style={{ borderRadius: '8px' }}
                    required />
                  <SelectContainer>
                    <LabelSelect htmlFor="input_types">Tipo de Input</LabelSelect>
                    <StyledSelect onChange={event => setTest4({ ...test4, input_type: event.target.value })} name="input_types" id="input_types" defaultValue={'DEFAULT'} required>
                      <option value="DEFAULT" disabled >Tipo de input...</option>
                      <option value="array_number">Array Number</option>
                      <option value="array_string">Array String</option>
                      <option value="boolean">Boolean</option>
                      <option value="number">Number</option>
                      <option value="string">String</option>
                    </StyledSelect>
                  </SelectContainer>
                </DivInput>

                <DivInput>
                  <Input
                    label={"Output"}
                    id="test4"
                    name="output"
                    type="text"
                    value={test4.output}
                    onChange={event => setTest4({ ...test4, output: event.target.value })}
                    placeholder="xy"
                    style={{ borderRadius: '8px' }}
                    required />
                  <SelectContainer>
                    <LabelSelect htmlFor="output_types">Tipo de Output</LabelSelect>
                    <StyledSelect onChange={event => setTest4({ ...test4, output_type: event.target.value })} name="output_types" id="output_types" defaultValue={'DEFAULT'} required>
                      <option value="DEFAULT" disabled >Tipo de output...</option>
                      <option value="array_number">Array Number</option>
                      <option value="array_string">Array String</option>
                      <option value="boolean">Boolean</option>
                      <option value="number">Number</option>
                      <option value="string">String</option>
                    </StyledSelect>
                  </SelectContainer>
                </DivInput>
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
            <Button width='100%' onClick={handleAdd}>Añadir nueva pregunta tipo test</Button>
            <Button onClick={handleNext}>Siguiente</Button>
          </DivButtons>
          :
          null
        }
      </FormContainer>
    </>
  )

}
export default TestQuestionForm;