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
    <Wrapper1 style={{maxWidth:"824px"}}>
      <FieldRow />
      {records
        .sort((a, b) => (a.id > b.id) ? 1 : -1)
        .map((record) => (
        <RecordRow record={record}/>
      ))}
    </Wrapper1>
  );
}

export default Table2;
