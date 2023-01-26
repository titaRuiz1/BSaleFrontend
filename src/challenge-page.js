import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { HiOutlineChevronDown } from "react-icons/hi";
import { Navbar } from "./components/navbar";
import { Button } from "./components/buttons";
import { typography } from "./styles";

const Wrapper1 = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper2 = styled.div`
  display: flex;
  flex-direction: row;
`;

const Text1 = styled.p`
  ${typography.head.md}
  font-size: 1.5rem;
  color: #051441;
`;

const Text2 = styled.p`
  ${typography.head.md}
  font-size: 1.25rem;
  line-height: 28px;
  color: #051441;
`;

const Text3 = styled.p`
  ${typography.head.xxs}
  line-height: 16px;
  color: #FFFFFF;
`;

const Text4 = styled.p`
  ${typography.text.md}
  line-height: 27.9px;
  color: #677294;
`;

const Text5 = styled.p`
  ${typography.text.md}
  font-weight: 600;
  line-height: 27.9px;
  color: #677294;
`;

function ChallengePage() {
  const [show, setShow] = useState(false);

  return (
    <Wrapper1 style={{alignItems:"center", justifyContent:"center"}}>
      <Navbar />
      <Wrapper1 style={{ width: "68%", gap: "32px", marginTop:"48px"}}>
        <Text1>Retos asignados</Text1>
        <Wrapper1 style={{ padding: "12px 32px", border: "1px solid #1E1E1E", borderRadius: "8px", gap: "16px" }}>
          <Wrapper2 style={{ justifyContent: "space-between", alignItems: "center" }}>
            <Text2>Desarrollador Web Junior</Text2>
            <Wrapper2 style={{ gap: "38px", justifyContent: "center", alignItems: "center" }}>
              <Button style={{ padding: "8px 12px" }}>
                <Text3>Iniciar</Text3>
              </Button>
              <HiOutlineChevronDown onClick={() => setShow(!show)} />
            </Wrapper2>
          </Wrapper2>

          {show === true ? (
            <Wrapper1 style={{ gap: "16px" }}>
              <Text4>Tincidunt elit vitae urna viverra fermentum. Egestas nam mauris id ipsum orci congue. Non tincidunt viverra lacus et vitae vel netus. Neque interdum semper donec viverra ipsum mi amet ullamcorper. Senectus odio magna sit id mauris quis pretium. Odio enim volutpat aliquet ac mauris. Senectus netus amet feugiat egestas eu. Gravida urna nunc ut fringilla non. Quis suspendisse gravida nibh maecenas lacus quisque. Malesuada lorem arcu aliquam aliquet in viverra. Neque nunc purus ullamcorper vel sed blandit. Volutpat at amet etiam commodo mi arcu. Pellentesque velit in blandit duis diam amet habitant auctor. Cras urna lacinia lectus nunc. Morbi nec non aenean sed feugiat malesuada at ultrices eu.</Text4>
              <Text5>Tincidunt elit vitae urna viverra fermentum.</Text5>
              <ul>
                <li style={{ listStyleType: "disc", marginLeft:"17px" }}>
                  <Text4>Senectus netus amet feugiat egestas eu. Gravida urna nunc ut fringilla non.</Text4>
                </li>
                <li style={{ listStyleType: "disc", marginLeft:"17px" }}>
                  <Text4>Senectus netus amet feugiat egestas eu. Gravida urna nunc ut fringilla non.</Text4>
                </li>
                <li style={{ listStyleType: "disc", marginLeft:"17px" }}>
                  <Text4>Senectus netus amet feugiat egestas eu. Gravida urna nunc ut fringilla non.</Text4>
                </li>
              </ul>
              <Text4>Neque nunc purus ullamcorper vel sed blandit. Volutpat at amet etiam commodo mi arcu. Pellentesque velit in blandit duis diam amet habitant auctor. Cras urna lacinia lectus nunc. Morbi nec non aenean sed feugiat malesuada at ultrices eu.</Text4>
            </Wrapper1>
          ) : null}
        </Wrapper1>
      </Wrapper1>
    </Wrapper1>
  )
}

export default ChallengePage;
