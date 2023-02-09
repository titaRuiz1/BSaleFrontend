import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Navbar } from "../components/navbar";
import { typography, colors } from "../styles";
import { Button } from "../components/buttons";
import { useNavigate } from "react-router";
import { useAuth } from "../context/auth-context";
import Table1 from "../components/table1";
import { Option } from "../components/option";
import { sendUrl } from "../services/teste2e-service";

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

const TestsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 16px;
`;

const Text1 = styled.p`
  ${typography.head.md}
  line-height: 27.6px;
  color: ${colors.blue};
`;

const Text2 = styled.p`
  ${typography.head.sm}
  line-height: 140%;
  color: ${colors.blue};
`;

const Text3 = styled.p`
  ${typography.text.lg}
  color: ${colors.gray[600]};
`;

const Text4 = styled.p`
  ${typography.head.xxs}
  color: ${colors.black};
`;

const Text5 = styled.p`
  ${typography.text.md}
  color: ${colors.gray[600]};
`;

const Text6 = styled.p`
  ${typography.text.lg}
  line-height: 28px;
  color: ${colors.blue};
`;


const Input = styled.input`
  padding: 0.5rem;
  ${typography.lg};
  border-radius: 4px;
  border: 1px solid ${colors.gray[600]};
  background-color: white;
  color: ${colors.gray[600]};
  width: 280px;
`;

function SecondStagePage() {
  const [test1Status, setTest1Status] = useState(null);
  const [test2Status, setTest2Status] = useState(true);
  const [test3Status, setTest3Status] = useState(false);
  const [test4Status, setTest4Status] = useState(false);
  const [projectUrl, setProjectUrl] = useState("");
  const [githubRepoUrl, setGithubRepoUrl]=useState(null)
  const navigate = useNavigate();
  const { challengeEvaluations } = useAuth();

  function handleNextButtonClick() {
    navigate("/feedback")
  }

  function handleTeste2e(event){
    event.preventDefault();
    console.log(projectUrl)
    sendUrl({url: projectUrl})
      .then(response=> console.log(response))
      .catch(error=> console.log(error))
  }

  return (
    <Wrapper1>
      <Navbar />
      <Wrapper2 style={{ width: "58%", gap: "32px", marginTop:"48px"}}>
        <Text1>Desarrollador Web Junior </Text1>
        <Text1>Etapa 2:Desarrollo web</Text1>
        <Text2>Requerimientos</Text2>
        <Text3>With almost every business application process being linked with a web portal, the website has become an integral part of any organization. Satisfying the end user's needs is one of the key principles of designing an effective website. Because there are different users for any given website, there are different criteria to consider for ranking the website. Therefore, the evaluation of the website will proceed as a multi-criteria process</Text3>
        <Text2>Criterio de evaluacion</Text2>
        <Text3>Some people consider only the aesthetics or beauty of a website. Others are only concerned with accuracy of the information on webpages. The purpose of this stage is to approach a more wholistic and well rounded set of evaluation criteria. Let’s start with the criteria listed below:</Text3>
        <Table1 records={challengeEvaluations} />
        <Text2>Tests</Text2>
        <Text3>El testing de software es una de las actividades más importantes y fundamentales en el desarrollo de un proyecto, ya que posibilita los procesos, métodos de trabajo y herramientas necesarias para garantizar la calidad de cualquier desarrollo. A continuacion, se mostraran los test por los que pasara tu challenge! </Text3>
        <Wrapper1>
          <Wrapper3 style={{gap:"4px"}}>
            <Input
              name="github-repo-url"
              id="github-repo-url"
              type="text"
              placeholder="project-url"
              value={projectUrl}
              onChange={(e)=> setProjectUrl(e.target.value)}
            />
            <Button onClick={handleTeste2e} width="127px" style={{background:"#31B9DD"}}>
              Iniciar tests
            </Button>
          </Wrapper3>
        </Wrapper1>
        <TestsContainer>
          {test1Status === null ?
            <Option padding={`0px 19px`} border={`1px solid ${colors.gray[600]}`} id={`Test1`} value={`Test1`} background={`${colors.white}`} label={`Descripcion de Test1`} />
            :
            test1Status === true ?
            <Option padding={`0px 19px`} border={`1px solid ${colors.green}`} id={`Test1`} value={`Test1`} background={`${colors.green}`} label={`Descripcion de Test1`} />
            :
            <Option padding={`0px 19px`} border={`1px solid ${colors.red}`} id={`Test1`} value={`Test1`} background={`${colors.red}`} label={`Descripcion de Test1`} />
          }
          {test2Status === null ?
            <Option padding={`0px 19px`} border={`1px solid ${colors.gray[600]}`} id={`answer2`} value={`answer2`} background={`${colors.white}`} label={`Descripcion de Test2`} />
            :
            test2Status === true ?
            <Option padding={`0px 19px`} border={`1px solid ${colors.green}`} id={`answer2`} value={`answer2`} background={`${colors.green}`} label={`Descripcion de Test2`} />
            :
            <Option padding={`0px 19px`} border={`1px solid ${colors.red}`} id={`answer2`} value={`answer2`} background={`${colors.red}`} label={`Descripcion de Test2`} />
          }
          {test3Status === null ?
            <Option padding={`0px 19px`} border={`1px solid ${colors.gray[600]}`} id={`answer3`} value={`answer3`} background={`${colors.white}`} label={`Descripcion de Test3`} />
            :
            test3Status === true ?
            <Option padding={`0px 19px`} border={`1px solid ${colors.green}`} id={`answer3`} value={`answer3`} background={`${colors.green}`} label={`Descripcion de Test3`} />
            :
            <Option padding={`0px 19px`} border={`1px solid ${colors.red}`} id={`answer3`} value={`answer3`} background={`${colors.red}`} label={`Descripcion de Test3`} />
          }
          {test4Status === null ?
            <Option padding={`0px 19px`} border={`1px solid ${colors.gray[600]}`} id={`answer4`} value={`answer4`} background={`${colors.white}`} label={`Descripcion de Test4`} />
            :
            test4Status === true ?
            <Option padding={`0px 19px`} border={`1px solid ${colors.green}`} id={`answer4`} value={`answer4`} background={`${colors.green}`} label={`Descripcion de Test4`} />
            :
            <Option padding={`0px 19px`} border={`1px solid ${colors.red}`} id={`answer4`} value={`answer4`} background={`${colors.red}`} label={`Descripcion de Test4`} />
          }
        </TestsContainer>
        <Text2>Envio de proyecto</Text2>
        <Text3>Eget mollis mauris vivamus eget cursus tincidunt mauris nisi. Adipiscing sit dolor blandit et mattis. </Text3>
        <Wrapper2>
          <ul>
            <li style={{ listStyleType: "disc", marginLeft:"17px" }}>
              <Text6>Brindar acceso a Bsale-IO a tu repositorio privado de GitHub</Text6>
            </li>
            <li style={{ listStyleType: "disc", marginLeft:"17px" }}>
              <Text6>Registra la URL de tu proyecto en el siguiente campo</Text6>
            </li>
          </ul>
        </Wrapper2>
        <Wrapper1 style={{marginBottom:"32px"}}>
          <Wrapper3 style={{gap:"4px"}}>
            <Input
              name="github-repo-url"
              id="github-repo-url"
              type="text"
              placeholder="github-repo-url"
              value={githubRepoUrl}
            />
            <Button width="83px">
              Enviar
            </Button>
          </Wrapper3>
        </Wrapper1>
        <Wrapper1>
          <Button width="119px" onClick={handleNextButtonClick}>
            Siguiente
          </Button>
        </Wrapper1>
      </Wrapper2>
    </Wrapper1>
  )
}

export default SecondStagePage;
