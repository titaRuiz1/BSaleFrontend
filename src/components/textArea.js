import styled from "@emotion/styled";
import { colors, typography } from "../styles";

const Label = styled.label`
color: ${colors.gray[600]};
`;

const StyledTextArea = styled.textarea`
  padding: 0.25rem 0.5rem;
  ${typography.lg};
  border: 1px solid ${colors.gray[600]};
  border-radius: 8px;
  background-color: white;
  color: ${colors.gray[600]};

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

function TextArea({
  id,
  name,
  placeholder,
  label,
  error,
  ...rest
}) {
  name ||= id;

  return (
    <InputContainer>
      {label && <Label htmlFor={id}>{label}</Label>}
      <StyledTextArea
        id={id}
        name={name}
        placeholder={placeholder}
        {...rest}
      />
      {error && <Error size="sm">{error}</Error>}
    </InputContainer>
  );
}

export default TextArea;
