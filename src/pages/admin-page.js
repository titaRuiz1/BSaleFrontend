import { useNavigate } from "react-router-dom";

export default function AdminPage(){

  const navigate = useNavigate();

  function handleCreate(event){
    event.preventDefault();
    navigate("/new-user");    
  }

  return (
    <> 
    <button onClick={handleCreate}>Create Candidate</button>
    
    </>
  )
  }



