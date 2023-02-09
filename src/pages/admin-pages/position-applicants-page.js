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
import { useParams } from "react-router";
import Table2 from "../../components/table2/table2"

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
  ${typography.text.md}
  line-height: 27.9px;
  color: #677294;
`;

const Text5 = styled.p`
  ${typography.text.md}
  color: ${colors.gray[600]};
`;

function PositionApplicantsPage() {
  // const { id } = useParams();
  // // let id = 1
  // console.log("APP ID", id);

  const navigate = useNavigate();
  const { positionApplicants,
    // setPositionApplicants,
    // user
  } = useAuth();

  // useEffect(() => {
    // getPositionApplicants(id).then(response=> {
    //   console.log("RESPONSE", response)
    //   setPositionApplicants(response)
    // }).catch()
  // }, []);


  return (
    <Wrapper1>
      <Wrapper2 style={{ width: "68%", gap: "32px", marginTop: "48px", padding: "12px 32px" }}>
        <Text2>Position: </Text2>
        {positionApplicants ? (
          <>
            <Text5> {positionApplicants.position.title}</Text5>

            <Wrapper3 style={{justifyContent:"space-between", alignItems:"center"}}>
              <Text2>Applicants: </Text2>
              <Button style={{ padding: "8px 12px" }} onClick={() => navigate("/new-user")}>
                <Text3>New user</Text3>
              </Button>
            </Wrapper3>

            <Table2 records={positionApplicants.users} />
          </>

        ) : <Text5> Loading...</Text5>}

      </Wrapper2>
    </Wrapper1>
  )
}

export default PositionApplicantsPage;
