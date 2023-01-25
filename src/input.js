import styled from "@emotion/styled";
import { colors, typography } from "./styles";

const Label = styled.label`
color: #677294;
`;

const StyledInput = styled.input`
  padding: 0.25rem 0.5rem;
  ${typography.lg};
  border: 1px solid #677294;
  background-color: white;
  color: #677294;

`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
`;

const Error = styled.p`
  color: #EF4444;
  padding-left: 1rem;
`;

function Input({
  id,
  name,
  type = "text",
  placeholder,
  label,
  error,
  ...rest
}) {
  name ||= id;

  return (
    <InputContainer>
      {label && <Label htmlFor={id}>{label}</Label>}
      <StyledInput
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        {...rest}
      />
      {error && <Error size="sm">{error}</Error>}
    </InputContainer>
  );
}

export default Input;
