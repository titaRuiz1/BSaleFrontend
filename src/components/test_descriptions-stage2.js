mport styled from "@emotion/styled";
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

function TestDescriptions() {
  const [testDescription1, setTestDescription1] = useState({ test_description: '' });
  const [testDescription2, setTestDescription2] = useState({ test_description: '' });
  const [testDescription3, setTestDescription3] = useState({ test_description: '' });
  const [testDescription4, setTestDescription4] = useState({ test_description: '' });

  const { setView, newPosition, setNewPosition } = useAuth();

  function handleChange(event) {
    const { value } = event.target
    if (event.target.id === 'test1') {
      setTestDescription1({ test_description: value })
    } else if (event.target.id === 'test2') {
      setTestDescription2({ test_description: value })
    } else if (event.target.id === 'test3') {
      setTestDescription3({ test_description: value })
    }
    else {
      setTestDescription4({ test_description: value })
    }
  };

  function handleAdd(event) {
    event.preventDefault();
    setNewPosition({
      ...newPosition, stage2s_attributes: [testDescription1, testDescription2, testDescription3, testDescription4]
    })
    setView('stage3')
  };

  return (
    <>
      <FormContainer>
        <FieldSet>
          <Legend>Tests de la Etapa 2</Legend>

          <Form onSubmit={handleAdd}>
            <FieldSet>
              <Legend2>Test 1</Legend2>
              <Input
                label={"Test 1"}
                id="test1"
                name="test_decription1"
                type="text"
                value={testDescription1.test_description}
                onChange={handleChange}
                placeholder="Test..."
                style={{ borderRadius: '8px' }}
                required />
            </FieldSet>
            <FieldSet>
              <Legend2>Test 2</Legend2>
              <Input
                label={"Test 2"}
                id="test2"
                name="test_decription2"
                type="text"
                value={testDescription2.test_description}
                onChange={handleChange}
                placeholder="Test..."
                style={{ borderRadius: '8px' }}
                required />
            </FieldSet>

            <FieldSet>
              <Legend2>Test 3</Legend2>
              <Input
                label={"Test 3"}
                id="test3"
                name="test_decription3"
                type="text"
                value={testDescription3.test_description}
                onChange={handleChange}
                placeholder="Test..."
                style={{ borderRadius: '8px' }}
                required />
            </FieldSet>

            <FieldSet>
              <Legend2>Test 4</Legend2>
              <Input
                label={"Test 4"}
                id="test4"
                name="test_decription4"
                type="text"
                value={testDescription4.test_description}
                onChange={handleChange}
                placeholder="Test..."
                style={{ borderRadius: '8px' }}
                required />
            </FieldSet>
            <Button color={`${colors.teal}`}>Agregar</Button>
          </Form>
        </FieldSet>

        <DivButtons>
          <Button>Atras</Button>
          {showAdd ? <Button width='100%' onClick={handleAdd}>Finalizar Proceso</Button> : null}
        </DivButtons>
      </FormContainer>
    </>
  )
}
export default TestDescriptions;