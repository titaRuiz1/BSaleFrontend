import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useAuth } from "../context/auth-context"

// { markdown }
function MarkdownViewer() {
  const { newPosition } = useAuth();
  console.log('CHALLENGE EVAL', newPosition.challenge_evaluations_attributes)
  const pos = newPosition.challenge_evaluations_attributes
  console.log('POS', pos)
  return (
    <>
      <p>Hola</p>
      {pos.map((p, idx) => <ReactMarkdown key={idx}>{p.criteria}</ReactMarkdown>)}
      {/* <ReactMarkdown>{newPosition.challenge_evaluations_attributes[0].criteria}</ReactMarkdown> */}

    </>
  )
}
export default MarkdownViewer;