import styled from "@emotion/styled";
import logo from "../assets/Logo-w-o-background.svg"
import { Button } from "./buttons"


const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0px 270px;
  height: 80px;
  background: rgba(230, 232, 235, 0.31)
`;

const NavbarSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  gap: 4px;

  width: 900px;
  height: 80px;
`;

const LeftDiv = styled.div`
  width: 270px;
  height: 44px;
  display: flex;
  gap: 12px;
`;

const Logo = styled.img`
  width: 120px;
  height: 36px;
`;

export function Navbar() {

  return (
    <NavbarContainer>
      <NavbarSection>
        <LeftDiv>
          <Logo src={logo} alt="BSale" />
          <p>Desafíate</p>
        </LeftDiv>
        <Button>Logout</Button>
      </NavbarSection>
    </NavbarContainer>
  );
}