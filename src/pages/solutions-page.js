// import { useState } from "react";
// import { useNavigate } from "react-router";
// import styled from "@emotion/styled";
// import { useAuth } from "../context/auth-context";
// import { colors, typography } from "../styles";
// import { Navbar } from "../components/navbar";
// import { Button } from "../components/buttons";


// const Wrapper1 = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center
// `;

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   padding: 0px 270px;
//   justify-content: center;
//   align-items: center;
// `;

// const Section = styled.div`
//   display: flex;
//   flex-direction: column;
//   padding: 48px 16px 64px 16px;
//   width: 900px;
//   height: 1080px;
//   ${typography.head.md};
//   color: ${colors.blue};
// `;

// const InsideSection = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 868px;
//   height: 908px;
//   margin-top: 32px;
// `;

// const TextSection = styled.p`
//   margin-top: 36px;
//   color: ${colors.gray[600]};
//   ${typography.text.lg};
//   text-align: justify
// `;
// const Img = styled.img`
//   margin: 36px 0px;
//   width:700px;
//   align-self: center;
// `;

// const OptionsSection = styled.form`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   padding: 0px;
//   gap: 16px;

//   width: 868px;
// `;



// const Label = styled.label`
//   color: ${colors.blue};
//   display: inline-block;
//   padding: 5px 0px 5px 44px;
//   position:relative;
//   ${typography.text.lg};
//   cursor:pointer;
//   &:before{
//     content:'';
//     width: 28px;
//     height: 28px;
//     display: inline-block;
//     background: ${(props) => props.background};
//     border: 1px solid ${colors.orange};
//     border-radius: 50%;
//     position:absolute;
//     left: 0px;
//   }
// `;


// function SolutionsPage() {
  
//   function handleSubmit(event) {
//     event.preventDefault();
//     if (currentSolution < solutions.length - 1) {
//       setCurrentSolution(currentSolution + 1)
//     } else {
//       navigate("/test-question")
//     }
//   }
//   return (
//     <Wrapper1>
//       <Navbar />
//       <Container>
//         <Section>
//           <p>{position.title}</p>
//           <InsideSection>
//             <p>Pregunta {currentSolution + 1} de 10</p>
//             <TextSection>
//               {solutions[currentSolution].solution.description}
//             </TextSection>
//             {solutions[currentSolution]?.url === 'sin imagen' ? null : <Img src={solutions[currentSolution]?.url} />}
//             <Button
//               width='88px'
//               style={{ alignSelf: 'center', marginTop: '20px' }}
//               onClick={handleSubmit}
//             > Siguiente 
//             </Button>
//           </InsideSection>
//         </Section>
//       </Container>
//     </Wrapper1>
//   )
// }

// export default SolutionsPage;
