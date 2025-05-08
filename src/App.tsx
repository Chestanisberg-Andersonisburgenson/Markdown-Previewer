import { useState } from 'react'
import './App.css'

function App() {
  const [editorText, setEditorText] = useState<string>('');

  const handleEditorChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditorText(event.target.value);
  };

  return (
    <>
      <div id="main">
        <h1>Markdown Previewer</h1>
        <textarea id="editor" placeholder="Type here..." onChange={handleEditorChange}></textarea>
        <div id="preview">{editorText}</div>
      </div>
    </>
  )
}

export default App
