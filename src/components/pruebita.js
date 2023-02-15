import React, { useState } from 'react';
import { Navigate, useNavigate } from "react-router";
import { useAuth } from "../context/auth-context"

function MarkdownInput({ onSubmit }) {
  const { value, setValue } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // onSubmit(value);
    navigate(`/admin`)
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={value} onChange={(event) => setValue(event.target.value)} />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default MarkdownInput;