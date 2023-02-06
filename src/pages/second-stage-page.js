import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Navbar } from "../components/navbar";
import { typography, colors } from "../styles";
import { Button } from "../components/buttons";
import { useNavigate } from "react-router";
import { useAuth } from "../context/auth-context";

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
  flex-direction: row;
  border: 1px solid #677294;
  border-radius: 8px;
  padding: 12px 32px;
  justify-content: space-between;
  align-items:center;
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


function SecondStagePage() {
  const navigate = useNavigate();
  // const {position} = useAuth();

  return (
    <Wrapper1>
      <Navbar />
      <Wrapper2 style={{ maxWidth:"868px", gap: "32px", marginTop:"48px"}}>
        <Text1>Desarrollador Web Junior </Text1>
        <Text1>Etapa 2:Desarrollo web</Text1>
        <Text2>Requerimientos</Text2>
        <Text3>With almost every business application process being linked with a web portal, the website has become an integral part of any organization. Satisfying the end user's needs is one of the key principles of designing an effective website. Because there are different users for any given website, there are different criteria to consider for ranking the website. Therefore, the evaluation the website will proceed as a multi-criteria process</Text3>
        <Text2>Criterio de evaluacion</Text2>
        <Text3>Some people consider only the aesthetics or beauty of a website. Others are only concerned with accuracy of the information on webpages. The purpose of this stage is to approach a more wholistic and well rounded set of evaluation criteria. Let’s start with the criteria listed below:</Text3>
      </Wrapper2>
    </Wrapper1>
  )
}

export default SecondStagePage;
