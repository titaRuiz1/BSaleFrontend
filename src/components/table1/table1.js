import FieldRow from "./field-row"
import RecordRow from "./record-row"
import styled from "@emotion/styled";

const Wrapper1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function Table1({records}) {
  return (
    <Wrapper1 style={{maxWidth:"824px"}}>
      <FieldRow />
      <RecordRow />
      <RecordRow />
      <RecordRow />
      <RecordRow />
    </Wrapper1>
  );
}

export default Table1;
