import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { HiOutlineChevronDown } from "react-icons/hi";
import { Navbar } from "./components/navbar"

const Wrapper1 = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper2 = styled.div`
  display: flex;
  flex-direction: row;
`;

const OrangeButton = styled("button")`
  border: none;
  background: orange;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

function ChallengePage() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Navbar />
      <Wrapper1 style={{ width: "60%", gap: "32px" }}>
        <p>Retos asignados</p>
        <Wrapper1 style={{ padding: "12px 32px", border: "1px solid #1E1E1E", borderRadius: "8px", gap: "16px" }}>
          <Wrapper2 style={{ justifyContent: "space-between", alignItems: "center" }}>
            <p>Desarrollador Web Junior</p>
            <Wrapper2 style={{ gap: "38px", justifyContent: "center", alignItems: "center" }}>
              <OrangeButton style={{ padding: "8px 12px" }}>
                <p>Iniciar</p>
              </OrangeButton>
              <HiOutlineChevronDown onClick={() => setShow(!show)} />
            </Wrapper2>
          </Wrapper2>

          {show === true ? (
            <Wrapper1 style={{ gap: "16px" }}>
              <p>Tincidunt elit vitae urna viverra fermentum. Egestas nam mauris id ipsum orci congue. Non tincidunt viverra lacus et vitae vel netus. Neque interdum semper donec viverra ipsum mi amet ullamcorper. Senectus odio magna sit id mauris quis pretium. Odio enim volutpat aliquet ac mauris. Senectus netus amet feugiat egestas eu. Gravida urna nunc ut fringilla non. Quis suspendisse gravida nibh maecenas lacus quisque. Malesuada lorem arcu aliquam aliquet in viverra. Neque nunc purus ullamcorper vel sed blandit. Volutpat at amet etiam commodo mi arcu. Pellentesque velit in blandit duis diam amet habitant auctor. Cras urna lacinia lectus nunc. Morbi nec non aenean sed feugiat malesuada at ultrices eu.</p>
              <p>Tincidunt elit vitae urna viverra fermentum.</p>
              <ul>
                <li style={{ listStyleType: "disc", listStylePosition: "inside" }}>
                  Senectus netus amet feugiat egestas eu. Gravida urna nunc ut fringilla non.
              </li>
                <li style={{ listStyleType: "disc", listStylePosition: "inside" }}>
                  Senectus netus amet feugiat egestas eu. Gravida urna nunc ut fringilla non.
              </li>
                <li style={{ listStyleType: "disc", listStylePosition: "inside" }}>
                  Senectus netus amet feugiat egestas eu. Gravida urna nunc ut fringilla non.
              </li>
              </ul>
              <p>Neque nunc purus ullamcorper vel sed blandit. Volutpat at amet etiam commodo mi arcu. Pellentesque velit in blandit duis diam amet habitant auctor. Cras urna lacinia lectus nunc. Morbi nec non aenean sed feugiat malesuada at ultrices eu.</p>
            </Wrapper1>
          ) : null}
        </Wrapper1>
      </Wrapper1>
    </>
  )
}

export default ChallengePage;
