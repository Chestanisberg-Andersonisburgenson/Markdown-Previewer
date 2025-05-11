import { useState } from 'react'
import './App.scss'
import DOMPurify  from 'dompurify';
import { marked } from 'marked';

marked.setOptions({
  breaks: true, // interpret line breaks as <br>
  gfm: true     // GitHub Flavored Markdown
});

function App() {
  const [editorText, setEditorText] = useState<string>('');

  const handleEditorChange = async(event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const html = await marked(event.target.value);
    const sanitizedHtml = DOMPurify.sanitize(html);   
    console.log('Raw HTML:', sanitizedHtml); //REMOVE WHEN FINISHED
    setEditorText(sanitizedHtml);
  };



  return (
    <>
      <div id="main">
        <h1>Markdown Previewer</h1>
        <textarea id="editor" placeholder="Type here..." onChange={handleEditorChange}></textarea>
        <h2>Preview</h2>
        <div id="preview" dangerouslySetInnerHTML={{__html: editorText}}></div>
      </div>
    </>
  )
}

export default App
