import styled from "@emotion/styled";
import { GrClose } from "react-icons/gr";
import { useState, useEffect } from "react";
import { GrAddCircle } from "react-icons/gr";
import { Navigate, useNavigate } from "react-router";
import { Link } from "react-router-dom"
import { getAllPositions, getSolutions, getSolutionsByPosition } from "../../services/position-service"
import { useAuth } from "../../context/auth-context"
import { colors, typography } from "../../styles";
import { Navbar } from "../../components/navbar";
import Unauthorized from "../../components/unauthorized";
import { getPositionApplicants } from "../../services/user-service";
import { getApplicantResult } from "../../services/results-service";
import PositionApplicantsPage from "./position-applicants-page";
import { getResult } from "../../services/results-service";


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
  display: flex;
  cursor:pointer;
  &:hover{
    color: ${colors.orange}
  };
  gap: 4px
`;

const Wrapper1 = styled.div`
  display: flex;
  flex-direction: row;
  padding: 12px 32px;
  align-items: center;
  border-width: 1px;
  border-color: ${colors.black};
  border-style: ${(props) => props.border || 'solid'};
  border-radius: 8px; 
  gap: 16px;
  width:100%;

`;

function PositionsListPage() {
  const { user, allPositions, setAllPositions, results, setPositionApplicants, setSolutions } = useAuth();
  const navigate = useNavigate();
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    if (user.user_type === "admin") {
      getAllPositions().then(response => {
        setAllPositions(response);
      }).catch()
    }

  }, [user]);

  function handlePosition(event) {
    event.preventDefault();

    getPositionApplicants(event.target.id).then(response => {
      setPositionApplicants(response)
    }).catch(error => {
      console.log("ERROR", error)
    })

    getSolutionsByPosition(event.target.id).then(response => {
      setSolutions(response)
    }).catch(error => {
      console.log("ERROR", error)
    })
    setShowTable(true);
  }

  function handleAddPosition(event) {
    event.preventDefault();

    navigate(`/new-position`)
  }
  return (
    <>
      <Navbar />
      {user.user_type === "admin" ?
        <>

          {showTable ? <PositionApplicantsPage /> : (
            <Container>
              <Title>Posiciones</Title>
              {!allPositions ? "Loading..." : (allPositions.map((pos) =>
                <Wrapper1>
                  <Subtitle
                    onClick={handlePosition}
                    id={pos.id}>• {pos.title}</Subtitle>
                </Wrapper1>
              ))}
              <Wrapper1 border='dashed' style={{ justifyContent: 'center' }}>
                <Subtitle onClick={handleAddPosition}>Add new position <GrAddCircle style={{ alignSelf: 'center' }} /> </Subtitle>
              </Wrapper1>
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
