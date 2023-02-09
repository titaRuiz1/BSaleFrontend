import styled from "@emotion/styled";
import { typography, colors } from "../../styles";

const Wrapper3 = styled.div`
  display: flex;
  flex-direction: row;
`;

const RecordContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.002);
  border-style: solid;
  border-color: #B9B9B9;
  padding: 10px 12px 10px 12px;
`;

const Text5 = styled.p`
  ${typography.text.md}
  color: ${colors.gray[600]};
`;


function RecordRow({record}) {
  return (
    <Wrapper3>
      <RecordContainer style={{width:"182px", borderWidth:"0px 1px 1px 1px"}}>
        <Text5>
          {record.id}
        </Text5>
      </RecordContainer>
      <RecordContainer style={{width:"182px", borderWidth:"0px 1px 1px 0px"}}>
        <Text5>
          {record.email}
        </Text5>
      </RecordContainer>
      <RecordContainer style={{width:"182px", borderWidth:"0px 0px 1px 0px"}}>
        <Text5>
          state
        </Text5>
      </RecordContainer>
      <RecordContainer style={{width:"182px", borderWidth:"0px 1px 1px 1px"}}>
        <Text5>
          progress
        </Text5>
      </RecordContainer>
    </Wrapper3>
  );
}

export default RecordRow;
