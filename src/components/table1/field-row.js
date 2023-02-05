import styled from "@emotion/styled";
import { typography, colors } from "../../styles";

const Wrapper3 = styled.div`
  display: flex;
  flex-direction: row;
`;

const Text4 = styled.p`
  ${typography.head.xxs}
  color: ${colors.black};
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.06);
  border-style: solid;
  border-color: #B9B9B9;
  padding: 10px 12px 10px 12px;
`;

function FieldRow() {
  return (
    <Wrapper3>
      <FieldContainer style={{width:"182px", borderWidth:"1px 0px 1px 1px"}}>
        <Text4>
        Categoria
        </Text4>
      </FieldContainer>
      <FieldContainer style={{width: "241px", borderWidth:"1px 0px 1px 1px"}}>
        <Text4>
        Criterio
        </Text4>
      </FieldContainer>
      <FieldContainer style={{width: "401px", borderWidth:"1px 1px 1px 1px"}}>
        <Text4>
        Ponderacion
        </Text4>
      </FieldContainer>
    </Wrapper3>
  );
}

export default FieldRow;
