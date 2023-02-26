import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "@emotion/styled";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import video from "../assets/vid.svg";
import codigo from "../assets/example2.svg";
import { useAuth } from "../context/auth-context";
import { colors, typography } from "../styles";
import { Navbar } from "../components/navbar";
import { Button } from "../components/buttons";
import { sendFeedbacks } from "../services/feedback-service";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'
import { getResult, sendResults } from "../services/results-service"
import { updateUser } from "../services/user-service";
import { getChallengeEvaluations, getCriterias, getPositions } from "../services/position-service";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 270px;
  justify-content: center;
  align-items: center;
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 48px 16px 64px 16px;
  width: 900px;
  height: 1080px;
`;

const Title = styled.p`
  ${typography.head.md};
  color: ${colors.blue};
`;

const Text = styled.p`
  ${typography.text.lg};
  color: ${colors.gray[600]};
  margin-bottom: 32px;
`;

const InsideSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 868px;
  height: 908px;
  margin-top: 32px;
`;

const Img = styled.img`
  margin: 36px 0px;
  width:${(props) => props.width};
  heigth: 324px;
  align-self: center;
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px 0px;
`;

const StarsDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 128px;
  margin-bottom:32px;
`;

const Stars = styled.div`
  display: flex;
  gap: 60px;
`;

const StarCheck = styled.div`
  display: flex;
  flex-direction: column;
  width: 72px;
  height: 72px;

`;
const Labels = styled.div`
  display: flex;
  gap:100px;
  justify-content: space-between;
  width: 680px;
`;
const StarLabel = styled.p`
  ${typography.text.lg};
  color: ${colors.gray[600]};
  text-align:center;
  width: 140px;
  height: 56px;
`;
const Subtitle = styled.p`
  ${typography.text.xl};
  color: ${colors.blue};
  margin-bottom: ${(props) => props.marginB || '32px'};
`;

const InputDiv = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  margin-bottom: 76px;

  width: 868px;
`;

const Input = styled.input`
  width: 868px;
  height: 112px;
  padding: 16px
`;

const Wrapper1 = styled.div`
  display: flex;
  flex-direction: column;
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

const Video = styled.div`
display:flex;
justify-content:center;
height: 324px
width: 576px
`

function FeedbackPage() {
  const { position, challengeEvaluations, average, setAverage,
    results, setResults, user, setUser, criterias,
    setPosition, setSumCorrectAnswer, setSumTest, setCriterias, setChallengeEvaluations } = useAuth();
  const navigate = useNavigate();
  const [currentCriteria, setCurrentCriteria] = useState(user.current_question - 1);
  const [colorStar, setColorStar] = useState(false);
  const [id, setId] = useState(null);
  const [startTest, setStartTest] = useState(false)
  const [form, setForm] = useState({
    answerDidWell: "",
    answerToImprove: "",
    challenge_evaluation_id: challengeEvaluations[currentCriteria].id,
  });
  const { quill, quillRef } = useQuill({
    readOnly: true,
    modules: {
      toolbar: false
    }
  })
  function handleStar(event) {
    const icon = event.currentTarget;
    if (icon.hasAttribute("data-icon-id")) {
      const iconId = icon.getAttribute("data-icon-id");
      setId(iconId)
    }
    setColorStar(true);
  }

  function handleFormChange(event) {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateUser({
      "current_question": user.current_question + 1
    }).then(response => {
      setUser(response)
    }).catch(console.log())


    sendFeedbacks(form).then().catch((error) => console.log(error))
    sendResults(
      {
        stage3: average + (id * challengeEvaluations[currentCriteria].weighting)
      }
    ).then().catch((error) => console.log(error))
    setAverage(average + (id * challengeEvaluations[currentCriteria].weighting))
    quill?.setContents(JSON.parse(challengeEvaluations[currentCriteria].description))
    if (currentCriteria < challengeEvaluations.length - 1) {
      setCurrentCriteria(currentCriteria + 1)
      setColorStar(false);
      setForm({
        answerDidWell: "",
        answerToImprove: "",
        challenge_evaluation_id: challengeEvaluations[currentCriteria].id + 1,
      });
    } else {
      navigate("/results")
    }

  }

  useEffect(() => {
    quill?.setContents(JSON.parse(challengeEvaluations[currentCriteria].description))
  }, [quill, currentCriteria])

  useEffect(() => {
    getPositions().then(response => {
      setPosition(response);
    }).catch()

    getResult().then(response => {
      if (response !== []) {
        setSumCorrectAnswer(response.stage1);
        setAverage(response.stage3);
        setSumTest(response.stage2);
      }
    }).catch(error => console.log(error))

    getCriterias().then(response => {
      setCriterias(response)
    }).catch()

    getChallengeEvaluations().then(response => {
      setChallengeEvaluations(response);
    }).catch()

  }, []);


  return (
    <>
      <Navbar />
      {startTest ?
      <Container>
        <Section>
          <Title>{position.title}</Title>
          <InsideSection>
            <Title>Criterio {currentCriteria + 1} de 4: guidelines & principles of accesability</Title>
            {position.id > 4 ? <Text ref={quillRef}></Text> :
              <>
                <Img width='576px' src={video} alt="video" />
                <Text>Eget mollis mauris vivamus eget cursus tincidunt mauris nisi. Adipiscing sit dolor blandit et mattis. Sagittis non ultrices viverra non ac tempor. Posuere felis at ultricies purus libero diam. Non non urna tellus vehicula auctor ut massa malesuada. Nulla fermentum in donec mi maecenas iaculis amet mauris est.</Text>
                <Img width='700px' src={codigo} alt="video" />
                <Text>Eget mollis mauris vivamus eget cursus tincidunt mauris nisi. Adipiscing sit dolor blandit et mattis. Sagittis non ultrices viverra non ac tempor. Posuere felis at ultricies purus libero diam. Non non urna tellus vehicula auctor ut massa malesuada. Nulla fermentum in donec mi maecenas iaculis amet mauris est.</Text>
                <Text>Eget mollis mauris vivamus eget cursus tincidunt mauris nisi. Adipiscing sit dolor blandit et mattis. Sagittis non ultrices viverra non ac tempor. Posuere felis at ultricies purus libero diam. Non non urna tellus vehicula auctor ut massa malesuada. Nulla fermentum in donec mi maecenas iaculis amet mauris est.</Text>
              </>
            }

            <BottomSection>
              <Subtitle>
                En base a la explicación provista, ¿consideras que el código de tu aplicación nombra correctamente las variables y hace un uso adecuado de las mismas?
              </Subtitle >
              <StarsDiv>
                <Stars>
                  <StarCheck>
                    {colorStar ? <AiTwotoneStar onClick={handleStar} data-icon-id="1" style={{ color: `${colors.orange}`, width: '72px', height: '72px' }} />
                      : <AiTwotoneStar onClick={handleStar} data-icon-id="1" style={{ width: '72px', height: '72px', color: `${colors.lowOrange}` }} />
                    }
                  </StarCheck>
                  <StarCheck>
                    {(colorStar && (['2', '3', '4', '5'].includes(id))) ? <AiTwotoneStar onClick={handleStar} data-icon-id="2" style={{ color: `${colors.orange}`, width: '72px', height: '72px' }} />
                      : <AiOutlineStar onClick={handleStar} data-icon-id="2" style={{ width: '72px', height: '72px', color: `${colors.gray[600]}` }} />
                    }
                  </StarCheck>
                  <StarCheck>
                    {(colorStar && (['3', '4', '5'].includes(id))) ? <AiTwotoneStar onClick={handleStar} data-icon-id="3" style={{ color: `${colors.orange}`, width: '72px', height: '72px' }} />
                      : <AiOutlineStar onClick={handleStar} data-icon-id="3" style={{ width: '72px', height: '72px', color: `${colors.gray[600]}` }} />
                    }
                  </StarCheck>
                  <StarCheck>
                    {(colorStar && (['4', '5'].includes(id))) ? <AiTwotoneStar onClick={handleStar} data-icon-id="4" style={{ color: `${colors.orange}`, width: '72px', height: '72px' }} />
                      : <AiOutlineStar onClick={handleStar} data-icon-id="4" style={{ width: '72px', height: '72px', color: `${colors.gray[600]}` }} />
                    }
                  </StarCheck>
                  <StarCheck>
                    {(colorStar && (id === '5')) ? <AiTwotoneStar onClick={handleStar} data-icon-id="5" style={{ color: `${colors.orange}`, width: '72px', height: '72px' }} />
                      : <AiOutlineStar onClick={handleStar} data-icon-id="5" style={{ width: '72px', height: '72px', color: `${colors.gray[600]}` }} />
                    }
                  </StarCheck>
                </Stars>
                <Labels>
                  <StarLabel>En desacuerdo</StarLabel>
                  <StarLabel>Parcialmente de acuerdo</StarLabel>
                  <StarLabel>Totalmente de acuerdo</StarLabel>
                </Labels>
              </StarsDiv>

              <InputDiv onSubmit={handleSubmit}>
                <Subtitle marginB='0px'>¿Qué consideras que hiciste bien?</Subtitle>
                <Input
                  type='text'
                  id='answerDidWell'
                  name='answerDidWell'
                  value={form.answerDidWell}
                  onChange={handleFormChange}
                  placeholder='Escribe tu respuesta aqui'
                />

                <Subtitle marginB='0px'>¿Qué consideras que puedes mejorar?</Subtitle>
                <Input
                  type='text'
                  id='answerToImprove'
                  name='answerToImprove'
                  value={form.answerToImprove}
                  onChange={handleFormChange}
                  placeholder='Escribe tu respuesta aqui'
                />
                <Button width='120px' style={{ alignSelf: 'center', marginTop: '76px' }}>Siguiente</Button>
              </InputDiv>
            </BottomSection>
          </InsideSection>
        </Section>

      </Container>

      :
        <Wrapper1 style={{ alignItems: "center", justifyContent: "center" }}>
        <Wrapper1 style={{ maxWidth: "868px", gap: "32px", marginTop: "48px" }}>
          <Text1>{position.title}</Text1>
          <Text1>Etapa 3: Revision de codigo - mejora continua</Text1>
          <Video>
            <video controls src="https://youtu.be/ykGRYEX0n60" />
          </Video>
          <Text2>Según la necesidad o la complejidad de los algoritmos o instrucciones, se usan diferentes lenguajes y cada uno opera con un conjunto de reglas y estructuras distintos. Estas estructuras permiten acceder a variables, funciones, objetos, cadenas y otras herramientas que procesan la información.</Text2>
          <Wrapper1 style={{ justifyContent: "center", alignItems: "center" }}>
            <Button
              width="90px"
              onClick={() => setStartTest(true)}>
              Iniciar
              </Button>
          </Wrapper1>
        </Wrapper1>
      </Wrapper1>}

    </>
  )
};

export default FeedbackPage;
