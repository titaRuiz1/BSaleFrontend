import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { HiOutlineChevronDown } from "react-icons/hi";
import { Navbar } from "../../components/navbar";
import { Button } from "../../components/buttons";
import { typography, colors } from "../../styles";
import { useAuth } from "../../context/auth-context";
import { getPositionApplicants } from "../../services/user-service"
import { tokenKey } from "../../config";
import { useNavigate } from "react-router";
import { Link , useParams } from "react-router-dom";
import Table2 from "../../components/table2/table2";
import Feedbacks from "../../components/feedbacks";

const Wrapper1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center
`;

const Wrapper2 = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper3 = styled.div`
  display: flex;
  flex-direction: row;
`;

const Text1 = styled.p`
  ${typography.head.md}
  font-size: 1.5rem;
  color: #051441;
`;

const Text2 = styled.p`
  ${typography.head.md}
  font-size: 1.25rem;
  line-height: 28px;
  color: #051441;
`;

const Text3 = styled.p`
  ${typography.head.xxs}
  line-height: 16px;
  color: #FFFFFF;
`;

const Text4 = styled.p`
  ${typography.head.xxs}
  color: ${colors.black};
  font-size: 0.8rem;
`;

const Text5 = styled.p`
  ${typography.text.xxs}
  color: ${colors.gray[600]};
`;

const FeedbacksModal = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgb(23 23 23 / 75%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function PositionApplicantsPage() {

  const navigate = useNavigate();
  const { positionApplicants, isOpenFeedback, selectedUserFeedbacks, setIsOpenFeedback } = useAuth();

  function handleFeedbacksClose() {
    setIsOpenFeedback(false);
  }

  return (
    <>
      <Navbar />
      <Wrapper1>
        <Wrapper2 style={{ width: "68%", gap: "32px", marginTop: "48px", padding: "12px 32px" }}>
          <Text2>Position: </Text2>
          {positionApplicants.position ?
          (
            <>
              <Text5> {positionApplicants.position.title}</Text5>

              <Wrapper3 style={{justifyContent:"space-between", alignItems:"center"}}>
                <Text2>Applicants: </Text2>
                <Button style={{ padding: "8px 12px" }} onClick={() => navigate("/new-user")}>
                  <Text3>New user</Text3>
                </Button>
              </Wrapper3>

              <Table2 records={positionApplicants.users} />
              {isOpenFeedback ? (
                  <FeedbacksModal>
                    <Feedbacks
                      feedbacks={selectedUserFeedbacks}
                      onCloseClick={handleFeedbacksClose}
                    />
                  </FeedbacksModal>
              ) : null}

            </>

          )
          :
          <Text5> Loading...</Text5>}

        </Wrapper2>
      </Wrapper1>
    </>
  )
}

export default PositionApplicantsPage;
