import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { HiOutlineChevronDown } from "react-icons/hi";
import { Navbar } from "../components/navbar";
import { Button } from "../components/buttons";
import { typography } from "../styles";
import { useAuth } from "../context/auth-context";
import { getMultipleChoiceQuestions, getPositions } from "../services/position-service";
import { tokenKey } from "../config";
import { useNavigate } from "react-router";

const Wrapper1 = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper2 = styled.div`
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
  ${typography.head.xs}
  line-height: 27.9px;
  color: #677294;
`;

function ChallengePage() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const {position, setPosition, user, setMulChoiceQuestions} = useAuth();

  useEffect(() => {
    getPositions().then(response =>{
      setPosition(response);
    }).catch()

    getMultipleChoiceQuestions().then(response =>{
      setMulChoiceQuestions(response);
    }).catch()

  }, [user]);

  return (
    <Wrapper1 style={{alignItems:"center", justifyContent:"center"}}>
      <Navbar />
      <Wrapper1 style={{ width: "68%", gap: "32px", marginTop:"48px"}}>
        <Text1>Retos asignados</Text1>
        <Wrapper1 style={{ padding: "12px 32px", border: "1px solid #1E1E1E", borderRadius: "8px", gap: "16px" }}>
          <Wrapper2 style={{ justifyContent: "space-between", alignItems: "center" }}>
            <Text2>{position ? position.title : "Loading..."}</Text2>
            <Wrapper2 style={{ gap: "38px", justifyContent: "center", alignItems: "center" }}>
              <Button style={{ padding: "8px 12px" }} onClick={()=> navigate("/first-stage")}>
                <Text3>Iniciar</Text3>
              </Button>
              <HiOutlineChevronDown onClick={() => setShow(!show)} />
            </Wrapper2>
          </Wrapper2>

          {show === true ? (
            <Wrapper1 style={{ gap: "16px" }}>
              <Text4>{position.description}</Text4>
            </Wrapper1>
          ) : null}
        </Wrapper1>
      </Wrapper1>
    </Wrapper1>
  )
}

export default ChallengePage;