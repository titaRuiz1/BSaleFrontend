import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import {Link} from "react-router-dom"
import { getAllPositions } from "../../services/position-service"
import { useAuth } from "../../context/auth-context"
import { colors, typography } from "../../styles";
import { Navbar } from "../../components/navbar";
import Unauthorized from "../../components/unauthorized";
import { getPositionApplicants } from "../../services/user-service";
import PositionApplicantsPage from "./position-applicants-page";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 270px;
  gap:32px;
  justify-content: center;
  align-items: center;
`;

const Title = styled.p`
  ${typography.head.md};
  color: ${colors.blue};
  margin: ${(props) => props.marginB || '32px'};
`;

const Subtitle = styled.a`
  ${typography.text.xl};
  color: ${colors.blue};
  cursor:pointer;
  &:hover{
    color: ${colors.orange}
  }
`;

const Wrapper1 = styled.div`
  display: flex;
  flex-direction: row;
  padding: 12px 32px;
  align-items: center;
  border: 1px solid ${colors.black};
  border-radius: 8px;
  gap: 16px;
  width:100%;

`;

function PositionsListPage() {
  const { user, allPositions, setAllPositions, results, setPositionApplicants } = useAuth();
  const navigate = useNavigate();
  const [showTable, setShowTable]= useState(false);

  console.log("POSITIONSSSSSSSSSS",allPositions)

  useEffect(() => {
    if (user.user_type === "admin") {
      getAllPositions().then(response => {
        setAllPositions(response);
        console.log("estado",response)
      }).catch()
    }

  }, [user]);

  function handlePosition(event) {
    event.preventDefault();


    console.log("ID", event.target.id)

    getPositionApplicants(event.target.id).then(response=> {
      console.log("RESPONSE", response)
      setPositionApplicants(response)
    }).catch(error=>{
      console.log("ERROR",error)
    })

    setShowTable(true);
    // navigate(`/admin/applicants`)
  }

  return (
    <>
      <Navbar />
      {user.user_type === "admin" ?
        <>
          { showTable? <PositionApplicantsPage /> : (
              <Container>
                <Title>Posiciones</Title>
                {!allPositions ? "Loading..." : (allPositions.map((pos, index) =>
                  <Wrapper1 key={index}>
                      <Subtitle
                        onClick={handlePosition}
                        id={pos.id}>• {pos.title}</Subtitle>
                  </Wrapper1>
                ))}
              </Container>
            )}
        </>
        :
        <Unauthorized />
      }
    </>
  )
}

export default PositionsListPage
