
import { colors, typography } from "../styles"
import styled from "@emotion/styled"
import { useState } from "react"
import { createUser } from "../services/user-service"
import Input from "./input"
import { useNavigate } from "react-router-dom"
import { Button } from "./buttons"

const Section = styled.div`
  margin: 96px auto;
  align-items: center;
`;

const Container = styled.div`
background:white;
box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
border-radius: 8px;
display:flex;
flex-direction:column;
align-items:center;
padding:50px;

`;

const H1 = styled.h1`
${typography.head.sm};
width:246px;
height:32px;
margin-top:-40px;
color: #051441;
text-align:center;

`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 258px;
  align-items:center;
`;


export default function NewUserForm(){
    const navigate = useNavigate();
    const [formdata, setFormdata] = useState({
        email:"",
        password:"",
        position_id:"2"
      })


      function handleChange(event){
        const {name, value} = event.target
        setFormdata({...formdata, [name]:value})
      }
      
      function handleSubmit(event){
        event.preventDefault();
       
        createUser(formdata).then(console.log).catch(console.log)
        console.log(formdata)
        navigate("/admin-page");
      }

  return (
    <Section>
      <Container>
        <Form onSubmit={handleSubmit}>
          <H1>New Candidate</H1>
          <Input
            label={"Email"}
            id="email"
            name="email"
            type="email"
            value={formdata.email}
            onChange={handleChange}
            placeholder="user@mail.com" />
          <Input
            label={"Password"}
            id="password"
            name="password" 
            type="text" 
            value={formdata.password}
            onChange={handleChange}
            placeholder="******"/>
          <Input
            label={"Position"}
            id="position"
            name="position"
            type="text"
            value={formdata.position_id}
            onChange={handleChange}
            placeholder="asignar position" />
          <Button>Create</Button>
        </Form>
      </Container>
    </Section>

  )
}

