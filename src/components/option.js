import styled from "@emotion/styled";
import { colors, typography } from "../styles";

const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${(props) => props.padding || '12px 32px'};
  gap: 16px;

  width: 868px;
  height: 52px;

  border: ${(props) => props.border};
  border-radius: 8px;
`;

const InputRadio = styled.input`
  display:none;
`;

const Label = styled.label`
  color: ${colors.blue};
  display: inline-block;
  padding: 5px 0px 5px 44px;
  position:relative;
  ${typography.text.lg};
  cursor:pointer;
  &:before{
    content:'';
    width: 28px;
    height: 28px;
    display: inline-block;
    background: ${(props) => props.background};
    border: 1px solid ${colors.orange};
    border-radius: 50%;
    position:absolute;
    left: 0px;
  }
`;

export function Option({padding, border, id, background, label, onClick}) {

  return (
    <OptionContainer padding={padding} border={border}>
      <InputRadio type='radio' name='opcion' id={id} value={id} onClick={onClick}/>
      <Label htmlFor={id} background={background}> {label} </Label>
    </OptionContainer>
  )
}
