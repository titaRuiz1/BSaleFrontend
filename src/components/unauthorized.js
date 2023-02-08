import styled from "@emotion/styled";
import logo from "../assets/Logo-orange-WO-bg.svg";
import { colors, typography } from "../styles";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 270px;
  gap:80px;
  height:100%;
  justify-content: center;
  align-items: center;
`;

const Title = styled.p`
  ${typography.head.md};
  color: ${colors.blue};
  margin: ${(props) => props.marginB || '32px'};
`;

const Anchor = styled.a`
  text-decoration: none;
  ${typography.text.lg};
  color: ${colors.blue};
  margin: ${(props) => props.marginB || '32px'};
  cursor: pointer;ß
`;

const Img = styled.img`
  margin: 36px 0px;
  width:${(props) => props.width};
  heigth: 324px;
  align-self: center;
  opacity: 0.5
`;

function Unauthorized() {
  return (
    <Container>
      <Title>Page No Found</Title>
      <Img width='700px' src={logo} alt="video" />
      <Anchor href="/challenge">Challenge Page</Anchor>
    </Container>
  )
}

export default Unauthorized;