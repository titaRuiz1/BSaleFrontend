import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getAllPositions } from "../../services/position-service"
import { useAuth } from "../../context/auth-context"
import { colors, typography } from "../../styles";
import { Navbar } from "../../components/navbar";
import Unauthorized from "../../components/unauthorized"

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
`;

const Wrapper1 = styled.div`
  display: flex;
  flex-direction: row;
  padding: 12px 32px;
  align-items: center;
  border: 1px solid ${colors.black};
  border-radius: 8px; 
  gap: 16px;
  width:100%
`;

function PositionsListPage() {
  const { user, allPositions, setAllPositions, results } = useAuth();

  console.log('RESULTADOS en ADMI', results)
  useEffect(() => {
    if (user?.email.includes('test3')) {
      getAllPositions().then(response => {
        setAllPositions(response);
        console.log(response)
      }).catch()
    }

  }, [user]);

  function handlePosition(event) {
    event.preventDefault();
    console.log(event.target.id)
    console.log('ENTRE AL CLICK')
  }
  console.log('POSISIONES', allPositions)
  return (
    <>
      <Navbar />
      {user?.email.includes('test3') ?
        <Container>
          <Title>Posiciones</Title>
          {!allPositions ? "Loading..." : (allPositions.map((pos) =>
            <Wrapper1>
              <Subtitle onClick={handlePosition} id={pos.id}>• {pos.title}</Subtitle>
            </Wrapper1>
          ))}
        </Container> :
        <Unauthorized />
      }
    </>
  )
}

export default PositionsListPage