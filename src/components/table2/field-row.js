import styled from "@emotion/styled";
import { typography, colors } from "../../styles";

const Wrapper2 = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper3 = styled.div`
  display: flex;
  flex-direction: row;
`;

const Text4 = styled.p`
  ${typography.head.xxs}
  color: ${colors.black};
  font-size: 0.8rem;
  line-height: 120%;
  text-align: center
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.06);
  border-style: solid;
  border-color: #B9B9B9;
  padding: 10px 12px 10px 12px;
`;

function FieldRow() {
  return (
    <Wrapper3>
      <FieldContainer style={{ width: "150px", borderWidth: "1px 0px 1px 1px" }}>
        <Text4>
          CORREO
        </Text4>
      </FieldContainer>
      <Wrapper2>
        <FieldContainer style={{ width: "300px", borderWidth: "1px 0px 0px 1px" }}>
          <Text4>
            PUNTAJE
            </Text4>
        </FieldContainer>
        <Wrapper3>
          <FieldContainer style={{ width: "100px", borderWidth: "1px 0px 1px 1px" }}>
            <Text4>
              ETAPA 1
            </Text4>
          </FieldContainer>
          <FieldContainer style={{ width: "100px", borderWidth: "1px 0px 1px 1px" }}>
            <Text4>
              ETAPA 2
            </Text4>
          </FieldContainer>
          <FieldContainer style={{ width: "100px", borderWidth: "1px 0px 1px 1px" }}>
            <Text4>
              ETAPA 3
            </Text4>
          </FieldContainer>
        </Wrapper3>
      </Wrapper2>
      <FieldContainer style={{ width: "100px", borderWidth: "1px 0px 1px 1px" }}>
        <Text4>
          # PRGTAS QUE NO SABIA
        </Text4>
      </FieldContainer>
      <FieldContainer style={{ width: "100px", borderWidth: "1px 0px 1px 1px" }}>
        <Text4>
          ENLACE DEL PROYECTO
        </Text4>
      </FieldContainer>
      <FieldContainer style={{ width: "100px", borderWidth: "1px 0px 1px 1px" }}>
        <Text4>
          ENLACE DE GITHUB
        </Text4>
      </FieldContainer>
      <FieldContainer style={{ width: "100px", borderWidth: "1px 0px 1px 1px" }}>
        <Text4>
          ESTADO
        </Text4>
      </FieldContainer>
      <FieldContainer style={{ width: "100px", borderWidth: "1px 1px 1px 1px" }}>
        <Text4 style={{ textAlign: "center" }}>
          COMENTARIOS
        </Text4>
      </FieldContainer>
      <FieldContainer style={{ width: "100px", border: "none", backgroundColor: "#FFFFFF" }}/>
    </Wrapper3>
  );
}

export default FieldRow;
