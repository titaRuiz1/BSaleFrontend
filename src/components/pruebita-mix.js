import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';
import MarkdownInput from './pruebita';
import MarkdownViewer from './pruebita-show';

function Prueba() {
  const [markdown, setMarkdown] = useState('');

  const handleMarkdownSubmit = (newMarkdown) => {
    setMarkdown(newMarkdown);
  };

  return (
    <div>
      <MarkdownInput onSubmit={handleMarkdownSubmit} />
      {/* <Link to="/preview">Ver vista previa</Link> */}
      {/* <Route path="/preview"> */}
      <MarkdownViewer markdown={markdown} />
      {/* </Route> */}
    </div>
  );
}

export default Prueba;