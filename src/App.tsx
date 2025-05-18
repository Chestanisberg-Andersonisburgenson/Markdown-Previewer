import { useState } from 'react'
import './App.scss'
import DOMPurify  from 'dompurify';
import { marked } from 'marked';
import { FaExpandArrowsAlt, FaCompressArrowsAlt } from 'react-icons/fa';

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

  const [isEditorExpanded, setIsEditorExpanded] = useState<boolean>(false);
  const [isPreviewExpanded, setIsPreviewExpanded] = useState<boolean>(false);


  const handleEditorChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setEditorText(newText);
    const sanitizedHtml = DOMPurify.sanitize(marked.parse(newText) as string) as string;
    setPreviewText(sanitizedHtml);   
  };

  const handleEditorExpand = () => {
    setIsEditorExpanded((prev) => !prev);
  }

  const handlePreviewExpand = () => {
    setIsPreviewExpanded((prev) => !prev);
  }

  const editorClass = isEditorExpanded ? "expanded" : "editor";
  const previewClass = isPreviewExpanded ? "expanded" : "preview";
  
  return (
    
      <div id="main">
        <div className={`${isPreviewExpanded ? "hidden" : "editor-container"}`}>
          <div className="title-box">
            <h1 className="title">Editor</h1>
            <button className="expand-button"  onClick={handleEditorExpand}>
              {isEditorExpanded ? <FaCompressArrowsAlt /> : <FaExpandArrowsAlt />}
            </button>
          </div>
          <textarea id="editor" className={editorClass} value={editorText} onChange={handleEditorChange}/>
        </div>
        
        <div className={`${isEditorExpanded ? "hidden" : "preview-container"}`}>
          <div className="title-box">
            <h1 className="title">Preview</h1>
            <button className="expand-button" onClick={handlePreviewExpand}>
              {isPreviewExpanded ? <FaCompressArrowsAlt /> : <FaExpandArrowsAlt />}
            </button>
          </div>
          <div id="preview" className={previewClass} dangerouslySetInnerHTML={{__html: previewText}}/>
        </div>
      </div>

      
  )
}

export default App
