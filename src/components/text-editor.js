import styled from "@emotion/styled";
import { useState } from "react";
import { useQuill } from 'react-quilljs';
import { colors, typography } from "../styles";
import { Button } from "./buttons";
import { useAuth } from "../context/auth-context";
import toolbar from "./toolbar";
import { Navigate, useNavigate } from "react-router";
import 'quill/dist/quill.snow.css'

function TextEditor(handleChange) {
  const navigate = useNavigate();
  const { value, setValue } = useAuth()
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: toolbar
    }
  })
  function handleSubmit(event) {
    event.preventDefault();
    // const newData = quill.getContents()
    // console.log(newData)
    // setValue(newData)
    navigate(`/output`)
  }
  return (
    <form>
      <div style={{ width: '500px', padding: '10px' }}>
        <div ref={quillRef}></div>
      </div>
      <Button onSubmit={handleSubmit}>Añadir</Button>
    </form>
  )
}
export default TextEditor;