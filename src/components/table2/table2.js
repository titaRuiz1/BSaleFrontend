import FieldRow from "./field-row"
import RecordRow from "./record-row"
import styled from "@emotion/styled";
import { typography, colors } from "../../styles";

const Wrapper1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Text5 = styled.p`
  ${typography.text.xxs}
  color: ${colors.gray[600]};
`;

function Table2({ records }) {

  return (
    <>
      {records.length> 0? (
      <Wrapper1 style={{maxWidth:"824px"}}>
        <FieldRow/>
        {records
          .map((record) => (
          <RecordRow record={record}/>
        ))}
      </Wrapper1>
      ): (
      <Text5>
        No se han encontrado candidatos para esta posicion
      </Text5>
      )}
    </>
  );
}

export default Table2;
