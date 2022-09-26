import React, { useState } from 'react'
import styles from '../../styles/components/NotePage.module.scss'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { atomone } from '@uiw/codemirror-themes-all'

type Props = {
   noteData: {
      id: number,
      title: string,
      content: string
   }
}

const NotePage = ({ noteData }: Props) => {
   const [editorValue, setEditorValue] = useState('')


   const { id, title, content } = noteData
   // console.log(noteData)

   const createNewWindow = () => {
      console.log('clicked')
      // ipcRenderer.send('NEWWINDOW')
   }

   const onChange = React.useCallback((value, viewUpdate) => {
      console.log('value:', editorValue);
      setEditorValue(value)
   }, []);

   const extensions = [markdown({ base: markdownLanguage, codeLanguages: languages })]

   return (
      <div className={styles.page}>
         {/* <button onClick={() => createNewWindow()}>Popup</button>
         <h1>{title}</h1>
         <p>{content}</p> */}
         <div className={styles.editor}>
            <CodeMirror
               value={editorValue}
               height="93vh"
               width='98vw'
               theme={atomone}
               extensions={extensions}
               onChange={() => {
                  console.log(editorValue)
                  setEditorValue(editorValue)
               }}
            />
         </div>
      </div>
   )
}

export default NotePage