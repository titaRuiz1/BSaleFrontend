import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Navbar } from "../components/navbar";
import { typography, colors } from "../styles";
import { Button } from "../components/buttons";
import { useNavigate } from "react-router";
import { useAuth } from "../context/auth-context";
import Table1 from "../components/table1";
import { Option } from "../components/option";
import { sendDataTestE2E, sendGithubUrl, sendUrl } from "../services/teste2e-service";
import { FiCheckCircle } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md"
import { updateUser } from "../services/user-service";
import { sendResults } from "../services/results-service";

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
  align-items:center;
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
  const [testStatus, setTestStatus] = useState(null);  
  const [projectUrl, setProjectUrl] = useState("");
  const [githubRepoUrl, setGithubRepoUrl]=useState("")
  const [statusGithub, setStatusGithub] = useState(null)
  const navigate = useNavigate();
  const { challengeEvaluations, setUser, position, setSumTest, sumTest, testDescription } = useAuth();

  function handleNextButtonClick() {
    updateUser({
      "current_stage": 3,  
    })
      .then(response=>{
      setUser(response)
    }).catch(console.log())
    
    sendDataTestE2E({
      link:projectUrl,
      github: statusGithub
    }).then(console.log).catch(console.log)
    navigate("/feedback")
    sendResults({
      stage2: sumTest
    }).then().catch((error) => console.log(error))
    
  }

  function handleTeste2e(event){
    let sumCurrentTest = 0;
    event.preventDefault();
    sendUrl({url: projectUrl})
      .then(response=> {
        setTestStatus(response)
        response.tests.forEach(test=>{
          if(test) sumCurrentTest += 1;
        })
        setSumTest(sumCurrentTest)
      })
      .catch(error=> console.log(error))
    
  }

  function handleGithub(e){
    e.preventDefault();
    sendGithubUrl({repo: githubRepoUrl})
      .then(response=>{
        setStatusGithub(response.response)
      })
      .catch(error=> console.log(error))
  }

  return (
    <Wrapper1>
      <Navbar />
      <Wrapper2 style={{ width: "58%", gap: "32px", marginTop:"48px"}}>
        <Text1>{position.title} </Text1>
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
          {testStatus ?
            testStatus.tests.map((test, index)=>{
              console.log(testDescription[index])
              return <Option key={index} padding={`0px 19px`} border={`1px solid ${ test ? colors.green: colors.red}`} id={`Test${index+1}`} value={`Test${index+1}`} background={`${ test ? colors.green: colors.red}`} label={testDescription[index].test_description} />
          }):
            <>
              <Option padding={`0px 19px`} border={`1px solid ${ colors.gray[600]}`} id={`Test1`} value={`Test1`} background={`${colors.white}`} label={testDescription[0].test_description} />
              <Option padding={`0px 19px`} border={`1px solid ${ colors.gray[600]}`} id={`Test2`} value={`Test2`} background={`${colors.white}`} label={testDescription[1].test_description} />
              <Option padding={`0px 19px`} border={`1px solid ${ colors.gray[600]}`} id={`Test3`} value={`Test3`} background={`${colors.white}`} label={testDescription[2].test_description} />
              <Option padding={`0px 19px`} border={`1px solid ${ colors.gray[600]}`} id={`Test4`} value={`Test4`} background={`${colors.white}`} label={testDescription[3].test_description} />
            </>
          }
          
          
          
        </TestsContainer>
        <Text2>Envio de proyecto</Text2>
        <Text3>Para poder revisar el código deployado en su proyecto necesitamos que ingrese el link de su repositorio en GITHUB teniendo en cuenta la siguiente nomenclatura:
          "nombre_usuario/nombre_repositorio"
        NOTA: No deberá incluir un "/" al final del link. Puede extraer la url desde el mismo repositorio.
        </Text3>
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
            { statusGithub === null ?
                null
              :
                statusGithub ?
                  <FiCheckCircle style={{color:"green", width:25, height:25}}/>
                :
                  <MdOutlineCancel style={{color:"red", width:30, height:30}}/>
            }
            <Input
              name="github-repo-url"
              id="github-repo-url"
              type="text"
              placeholder="github-repo-url"
              value={githubRepoUrl}
              onChange={(e)=> setGithubRepoUrl(e.target.value)}
            />
            <Button width="83px" onClick={handleGithub}>
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
