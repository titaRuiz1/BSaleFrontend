import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Navbar } from "../components/navbar";
import { typography, colors } from "../styles";
import { Button } from "../components/buttons";
import { useNavigate } from "react-router";
import { useAuth } from "../context/auth-context";
import { Option } from "../components/option"

const Wrapper1 = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper2 = styled.div`
  display: flex;
  flex-direction: row;
`;

const StageResultsContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #677294;
  border-radius: 8px;
  padding: 12px 32px;
  justify-content: space-between;
  align-items:center;
`;

const Text1 = styled.p`
  ${typography.head.md}
  font-size: 1.5rem;
  line-height: 27.6px;
  color: #051441;
`;

const Text2 = styled.p`
  ${typography.text.lg}
  line-height: 28px;
  color: #677294;
`;


function TestQuestionPage() {
  const navigate = useNavigate();
  const { position } = useAuth();
  const [test1Status, setTest1Status] = useState(true);
  const [test2Status, setTest2Status] = useState(true);
  const [test3Status, setTest3Status] = useState(false);
  const [test4Status, setTest4Status]= useState(false);

  return (
    <Wrapper1 style={{alignItems:"center", justifyContent:"center"}}>
      <Navbar />
      <Wrapper1 style={{ maxWidth:"868px", gap: "32px", marginTop:"48px"}}>
        <Text1>{position.title}</Text1>
        <Text1>Pregunta 6 de 10</Text1>
        <Text2>Eget mollis mauris vivamus eget cursus tincidunt mauris nisi. Adipiscing sit dolor blandit et mattis. Sagittis non ultrices viverra non ac tempor. Posuere felis at ultricies purus libero diam. Non non urna tellus vehicula auctor ut massa malesuada. Nulla fermentum in donec mi maecenas iaculis amet mauris est.</Text2>
        <div>
            {test1Status ?
              <Option border={`none`} id={`answer1`} background={`${colors.green}`} label={`Descripcion de Opcion`} />
              :
              <Option border={`none`} id={`answer1`} background={`${colors.red}`} label={`Descripcion de Opcion`} />
            }
            {test2Status ?
              <Option border={`none`} id={`answer1`} background={`${colors.green}`} label={`Descripcion de Opcion`} />
              :
              <Option border={`none`} id={`answer1`} background={`${colors.red}`} label={`Descripcion de Opcion`} />
            }
            {test3Status ?
              <Option border={`none`} id={`answer1`} background={`${colors.green}`} label={`Descripcion de Opcion`} />
              :
              <Option border={`none`} id={`answer1`} background={`${colors.red}`} label={`Descripcion de Opcion`} />
            }
            {test4Status ?
              <Option border={`none`} id={`answer1`} background={`${colors.green}`} label={`Descripcion de Opcion`} />
              :
              <Option border={`none`} id={`answer1`} background={`${colors.red}`} label={`Descripcion de Opcion`} />
            }
        </div>
        <Wrapper1  style={{justifyContent:"center", alignItems:"center"}}>
          <Button
            width="90px"
            onClick={() => navigate("/results")}>
            Enviar
          </Button>
        </Wrapper1>
      </Wrapper1>
    </Wrapper1>
  )
}

export default TestQuestionPage;
