import styled from "@emotion/styled";
import { colors, typography } from "../styles";

const Label = styled.label`
color: ${colors.gray[900]};
`;

const StyledInput = styled.input`
  padding: 0.25rem 0.5rem;
  ${typography.text.md};
  border: 1px solid ${colors.gray[600]};
  background-color: white;
  color: ${colors.gray[900]};

`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
`;

const Error = styled.p`
  color: ${colors.red};
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
