import styled from "@emotion/styled";


const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0px 270px;
  height: 80px;
  border: 3px solid #051441;
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
  border: 3px solid #EF4444;
`;

export function Navbar() {

  return (
    <NavbarContainer>
      <NavbarSection>

      </NavbarSection>
    </NavbarContainer>
  );
}