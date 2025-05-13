import { useState } from 'react'
import './App.scss'
import DOMPurify  from 'dompurify';
import { marked } from 'marked';

marked.setOptions({
  breaks: true, // interpret line breaks as <br>
  gfm: true     // GitHub Flavored Markdown
});

const defaultMarkdown = `# Markdown Previewer

## Welcome to my React Markdown Previewer!

### Type code here

[Link to FreeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/#basic-html-and-html5)

Here is some inline code: \`console.log('Hello World!');\`

Here is a list:
- Item 1
- Item 2
- Item 3

> "The only limit to our realization of tomorrow is our doubts of today."  
> – Franklin D. Roosevelt

\`\`\`js
const hello = "Hello World!";
console.log(hello);
\`\`\`

Here is an image:  
![oof](https://i.kinja-img.com/image/upload/c_fit,q_60,w_645/77275af33e4165c1f07a612184d16b55.jpg)

**This is bold**
`

function App() {
  const [editorText, setEditorText] = useState<string>(defaultMarkdown);
  const initialHtml = DOMPurify.sanitize(marked.parse(defaultMarkdown) as string) as string;
  const [previewText, setPreviewText] = useState<string>(initialHtml);



  const handleEditorChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setEditorText(newText);
    const sanitizedHtml = DOMPurify.sanitize(marked.parse(newText) as string) as string;
    setPreviewText(sanitizedHtml);   
  };

  return (
    <>
      <div id="main">
        <textarea id="editor" value={editorText} onChange={handleEditorChange}/>
        <h2>Preview</h2>
        <div id="preview" dangerouslySetInnerHTML={{__html: previewText}}/>
      </div>
    </>
  )
}

export default App
