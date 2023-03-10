import styled from "@emotion/styled";
import { useState } from "react";
import { colors, typography } from "../styles";
import Input from "../components/input";
import { Button } from "./buttons";
import { useAuth } from "../context/auth-context";

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
      </FormContainer>
    </>
  )
}
export default TestDescriptions;