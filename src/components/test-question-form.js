import styled from "@emotion/styled";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import { colors, typography } from "../styles";
import Input from "../components/input";
import TextArea from "../components/textArea"
import { Button } from "./buttons";
import { useAuth } from "../context/auth-context"

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
  const [showAdd, setShowAdd] = useState(false);
  const [newSolution, setNewSolution] = useState({ description: '' })
  const { setView, arrTestQuestion, setArrTestQuestion } = useAuth();

  function handleChange(event) {
    const { name, value } = event.target
    if (event.target.id === 'testQ1') {
      setNewTestQuestion({ ...newTestQuestion, [name]: value })
    }
    else {
      setNewSolution({ description: value })
    }
  };

  function handleSubmitTestQuestion(event) {
    event.preventDefault();
    console.log('hace submit')
    setNewTestQuestion({ ...newTestQuestion, tests_attributes: [test1, test2, test3, test4], solution_attributes: newSolution })
    setShowAdd(true)
  };

  function handleBack(event) {
    event.preventDefault();
    console.log('back')
    setView('multiple_choice')
  };

  function handleAdd(event) {
    event.preventDefault();
    arrTestQuestion.length === 0 ? setArrTestQuestion([newTestQuestion])
      : setArrTestQuestion([...arrTestQuestion, newTestQuestion]);

    setNewTestQuestion({ description: '', code: '', tests_attributes: [], solution_attributes: null });
    setTest1({ test: '', input: '', output: '', input_type: '', output_type: '' });
    setTest2({ test: '', input: '', output: '', input_type: '', output_type: '' });
    setTest3({ test: '', input: '', output: '', input_type: '', output_type: '' });
    setTest4({ test: '', input: '', output: '', input_type: '', output_type: '' });
    setNewSolution({ description: '' })
    setShowAdd(false)
  };

  function handleNext(event) {
    event.preventDefault();
    arrTestQuestion.length === 0 ? setArrTestQuestion([newTestQuestion])
      : setArrTestQuestion([...arrTestQuestion, newTestQuestion]);
    setView('challenge_evaluation');
  }

  console.log('INPUT TYPE1', test1)
  console.log('INPUT TYPE2', test2)
  console.log('INPUT TYPE3', test3)
  console.log('INPUT TYPE4', test4)
  console.log('sol', newSolution)
  return (
    <>
      <FormContainer>
        <Form onSubmit={handleSubmitTestQuestion}>
          <FieldSet>
            <Legend>Crear Preguntas de tipo Test </Legend>
            <TextArea
              label={"Pregunta de tipo Test"}
              id="testQ1"
              name="description"
              cols='40'
              value={newTestQuestion.description}
              onChange={handleChange}
              placeholder="La pregunta se trata de..." />

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
                style={{ borderRadius: '8px' }} />

              <DivInput>
                <Input
                  label={"Input"}
                  id="test1"
                  name="input"
                  type="text"
                  value={test1.input}
                  onChange={event => setTest1({ ...test1, input: event.target.value })}
                  placeholder="x,y"
                  style={{ borderRadius: '8px' }} />
                <SelectContainer>
                  <LabelSelect htmlFor="input_types">Tipo de Input</LabelSelect>
                  <StyledSelect onChange={event => setTest1({ ...test1, input_type: event.target.value })} name="input_types" id="input_types" defaultValue={'DEFAULT'}>
                    <option value="" value="DEFAULT" disabled >Tipo de input...</option>
                    <option value="array">Array</option>
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
                  style={{ borderRadius: '8px' }} />
                <SelectContainer>
                  <LabelSelect htmlFor="output_types">Tipo de Output</LabelSelect>
                  <StyledSelect onChange={event => setTest1({ ...test1, output_type: event.target.value })} name="output_types" id="output_types" defaultValue={'DEFAULT'}>
                    <option value="" value="DEFAULT" disabled >Tipo de output...</option>
                    <option value="array">Array</option>
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
                style={{ borderRadius: '8px' }} />

              <DivInput>
                <Input
                  label={"Input"}
                  id="test2"
                  name="input"
                  type="text"
                  value={test2.input}
                  onChange={event => setTest2({ ...test2, input: event.target.value })}
                  placeholder="x,y"
                  style={{ borderRadius: '8px' }} />
                {/* <Input
                  label={"Tipo de Input"}
                  id="test2"
                  name="input_type"
                  type="text"
                  value={test2.input_type}
                  onChange={event => setTest2({ ...test2, input_type: event.target.value })}
                  placeholder="string"
                  style={{ borderRadius: '8px' }} /> */}
                <SelectContainer>
                  <LabelSelect htmlFor="input_types">Tipo de Input</LabelSelect>
                  <StyledSelect onChange={event => setTest2({ ...test2, input_type: event.target.value })} name="input_types" id="input_types" defaultValue={'DEFAULT'}>
                    <option value="" value="DEFAULT" disabled >Tipo de input...</option>
                    <option value="array">Array</option>
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
                  style={{ borderRadius: '8px' }} />
                {/* <Input
                  label={"Tipo de Output"}
                  id="test2"
                  name="output_type"
                  type="text"
                  value={test2.output_type}
                  onChange={event => setTest2({ ...test2, output_type: event.target.value })}
                  placeholder="string"
                  style={{ borderRadius: '8px' }} /> */}
                <SelectContainer>
                  <LabelSelect htmlFor="output_types">Tipo de Output</LabelSelect>
                  <StyledSelect onChange={event => setTest2({ ...test2, output_type: event.target.value })} name="output_types" id="output_types" defaultValue={'DEFAULT'}>
                    <option value="" value="DEFAULT" disabled >Tipo de output...</option>
                    <option value="array">Array</option>
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
                style={{ borderRadius: '8px' }} />

              <DivInput>
                <Input
                  label={"Input"}
                  id="test3"
                  name="input"
                  type="text"
                  value={test3.input}
                  onChange={event => setTest3({ ...test3, input: event.target.value })}
                  placeholder="x,y"
                  style={{ borderRadius: '8px' }} />
                {/* <Input
                  label={"Tipo de Input"}
                  id="test3"
                  name="input_type"
                  type="text"
                  value={test3.input_type}
                  onChange={event => setTest3({ ...test3, input_type: event.target.value })}
                  placeholder="string"
                  style={{ borderRadius: '8px' }} /> */}

                <SelectContainer>
                  <LabelSelect htmlFor="input_types">Tipo de Input</LabelSelect>
                  <StyledSelect onChange={event => setTest3({ ...test3, input_type: event.target.value })} name="input_types" id="input_types" defaultValue={'DEFAULT'}>
                    <option value="" value="DEFAULT" disabled >Tipo de input...</option>
                    <option value="array">Array</option>
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
                  style={{ borderRadius: '8px' }} />
                {/* <Input
                  label={"Tipo de Output"}
                  id="test3"
                  name="output_type"
                  type="text"
                  value={test3.output_type}
                  onChange={event => setTest3({ ...test3, output_type: event.target.value })}
                  placeholder="string"
                  style={{ borderRadius: '8px' }} /> */}
                <SelectContainer>
                  <LabelSelect htmlFor="output_types">Tipo de Output</LabelSelect>
                  <StyledSelect onChange={event => setTest3({ ...test3, output_type: event.target.value })} name="output_types" id="output_types" defaultValue={'DEFAULT'}>
                    <option value="" value="DEFAULT" disabled >Tipo de output...</option>
                    <option value="array">Array</option>
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
                style={{ borderRadius: '8px' }} />

              <DivInput>
                <Input
                  label={"Input"}
                  id="test4"
                  name="input"
                  type="text"
                  value={test4.input}
                  onChange={event => setTest4({ ...test4, input: event.target.value })}
                  placeholder="x,y"
                  style={{ borderRadius: '8px' }} />
                {/* <Input
                  label={"Tipo de Input"}
                  id="test4"
                  name="input_type"
                  type="text"
                  value={test4.input_type}
                  onChange={event => setTest4({ ...test4, input_type: event.target.value })}
                  placeholder="string"
                  style={{ borderRadius: '8px' }} /> */}

                <SelectContainer>
                  <LabelSelect htmlFor="input_types">Tipo de Input</LabelSelect>
                  <StyledSelect onChange={event => setTest4({ ...test4, input_type: event.target.value })} name="input_types" id="input_types" defaultValue={'DEFAULT'}>
                    <option value="" value="DEFAULT" disabled >Tipo de input...</option>
                    <option value="array">Array</option>
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
                  style={{ borderRadius: '8px' }} />
                {/* <Input
                  label={"Tipo de Output"}
                  id="test4"
                  name="output_type"
                  type="text"
                  value={test4.output_type}
                  onChange={event => setTest4({ ...test4, output_type: event.target.value })}
                  placeholder="string"
                  style={{ borderRadius: '8px' }} /> */}
                <SelectContainer>
                  <LabelSelect htmlFor="output_types">Tipo de Output</LabelSelect>
                  <StyledSelect onChange={event => setTest4({ ...test4, output_type: event.target.value })} name="output_types" id="output_types" defaultValue={'DEFAULT'}>
                    <option value="" value="DEFAULT" disabled >Tipo de output...</option>
                    <option value="array">Array</option>
                    <option value="boolean">Boolean</option>
                    <option value="number">Number</option>
                    <option value="string">String</option>
                  </StyledSelect>
                </SelectContainer>
              </DivInput>
            </FieldSet>


            <FieldSet>
              <Legend2>Solución</Legend2>
              <TextArea
                label={"Solución"}
                id="solutionT1"
                name="description"
                cols='40'
                value={newSolution.description}
                onChange={handleChange}
                placeholder="The solution is..." />
            </FieldSet>

          </FieldSet>
          <Button color={`${colors.teal}`}>Agregar</Button>
        </Form>
        {showAdd ?
          <DivButtons>
            <Button onClick={handleBack}>Atras</Button>
            <Button width='100%' onClick={handleAdd}>Añadir nueva pregunta tipo test</Button>
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
export default TestQuestionForm;