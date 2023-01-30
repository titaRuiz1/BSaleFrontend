import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Navbar } from "../components/navbar";
import { typography, colors } from "../styles";
import { Button } from "../components/buttons";
import { useNavigate } from "react-router";
import { useAuth } from "../context/auth-context";
import { Option } from "../components/option";
// import Editor from 'react-simple-code-editor';
import Editor from "@monaco-editor/react";

const Wrapper1 = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper2 = styled.div`
  display: flex;
  flex-direction: row;
`;

const TestsContainer = styled.div`
  background: rgba(230, 232, 235, 0.31);
  border-radius: 16px;
  padding: 22px 0px;
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
  const [code, setCode] = useState(
    `function myFunction(param1, param2) {\n  //happy coding\n\n\n}`
  );
  const [test1Status, setTest1Status] = useState(null);
  const [test2Status, setTest2Status] = useState(true);
  const [test3Status, setTest3Status] = useState(false);
  const [test4Status, setTest4Status]= useState(false);


  return (
    <Wrapper1 style={{alignItems:"center", justifyContent:"center"}}>
      <Navbar />
      <Wrapper1 style={{ maxWidth: "868px", gap: "37px", marginTop: "48px" }}>
        <Wrapper1 style={{gap: "32px"}}>
          <Text1>{position.title}</Text1>
          <Text1>Pregunta 6 de 10</Text1>
        </Wrapper1>
        <Text2>Eget mollis mauris vivamus eget cursus tincidunt mauris nisi. Adipiscing sit dolor blandit et mattis. Sagittis non ultrices viverra non ac tempor. Posuere felis at ultricies purus libero diam. Non non urna tellus vehicula auctor ut massa malesuada. Nulla fermentum in donec mi maecenas iaculis amet mauris est.</Text2>
        <Wrapper1 style={{height:"270px", alignItems:"center", justifyContent:"center", padding:"0px 30px"}}>
          <Editor
            language="javascript"
            theme="vs-dark"
            value={code}
            onChange={code => setCode(code)}
            width="100%"
            height="100%"
          />
        </Wrapper1>
        <Wrapper1 style={{ justifyContent: "center", alignItems: "center" }}>
          <Button
            width="71px"
            >
            Test
          </Button>
        </Wrapper1>
        <TestsContainer>
            {test1Status === null?
             <Option padding={`0px 19px`} border={`none`} id={`answer1`} background={`${colors.white}`} label={`Descripcion de Opcion`} />
              :
             test1Status === true?
              <Option padding={`0px 19px`} border={`none`} id={`answer1`} background={`${colors.green}`} label={`Descripcion de Opcion`} />
              :
              <Option padding={`0px 19px`} border={`none`} id={`answer1`} background={`${colors.red}`} label={`Descripcion de Opcion`} />
            }
            {test2Status === null?
              <Option padding={`0px 19px`} border={`none`} id={`answer2`} background={`${colors.white}`} label={`Descripcion de Opcion`} />
              :
             test2Status === true?
              <Option padding={`0px 19px`} border={`none`} id={`answer2`} background={`${colors.green}`} label={`Descripcion de Opcion`} />
              :
              <Option padding={`0px 19px`} border={`none`} id={`answer2`} background={`${colors.red}`} label={`Descripcion de Opcion`} />
            }
            {test3Status === null?
              <Option padding={`0px 19px`} border={`none`} id={`answer3`} background={`${colors.white}`} label={`Descripcion de Opcion`} />
              :
             test3Status === true?
              <Option padding={`0px 19px`} border={`none`} id={`answer3`} background={`${colors.green}`} label={`Descripcion de Opcion`} />
              :
              <Option padding={`0px 19px`} border={`none`} id={`answer3`} background={`${colors.red}`} label={`Descripcion de Opcion`} />
            }
            {test4Status === null?
              <Option padding={`0px 19px`} border={`none`} id={`answer4`} background={`${colors.white}`} label={`Descripcion de Opcion`} />
              :
             test4Status === true?
              <Option padding={`0px 19px`} border={`none`} id={`answer4`} background={`${colors.green}`} label={`Descripcion de Opcion`} />
              :
              <Option padding={`0px 19px`} border={`none`} id={`answer4`} background={`${colors.red}`} label={`Descripcion de Opcion`} />
            }
        </TestsContainer>
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
