import FieldRow from "./field-row"
import RecordRow from "./record-row"
import styled from "@emotion/styled";

const Wrapper1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function Table2({ records }) {

  return (
    <>
      {records.length> 0? (
      <Wrapper1 style={{maxWidth:"824px"}}>
        <FieldRow />
        {records
          .map((record) => (
          <RecordRow record={record} users="+0"/>
        ))}
      </Wrapper1>
      ): (
      <Wrapper1 style={{maxWidth:"824px"}}>
        <FieldRow />
        <RecordRow record={"No se han encontrado candidatos para esta posicion"} users="0"/>
      </Wrapper1>
      )}
    </>
  );
}

export default Table2;
