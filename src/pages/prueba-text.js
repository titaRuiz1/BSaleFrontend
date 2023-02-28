import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth-context";
import { getMultipleChoiceQuestions, getPositions, getSolutions, getTestQuestions, getChallengeEvaluations } from "../services/position-service";


function PruebaText() {
  const { position, setPosition, user, setMulChoiceQuestions, mulChoiceQuestions, value } = useAuth();

  const { quill, quillRef } = useQuill({
    readOnly: true,
    modules: {
      toolbar: false
    }
  })
  useEffect(() => {
    getPositions().then(response => {
      setPosition(response);
    }).catch()

    getMultipleChoiceQuestions().then(response => {
      quill?.setContents(JSON.parse(response[0].question.description))
      setMulChoiceQuestions(response);
    }).catch()

  }, [user, quill]);

  return (
    <>
      <p>Aqui renderea</p>
      {mulChoiceQuestions ? <article ref={quillRef}></article> : <p>no entra</p>}
    </>
  )
}
export default PruebaText;