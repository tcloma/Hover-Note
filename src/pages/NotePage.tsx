import React, { useEffect, useState, useCallback } from 'react'
import styles from '../styles/pages/NotePage.module.scss'
import { IUserData } from '../interfaces'
import CodeMirror from '@uiw/react-codemirror'
import MarkdownPreview from '@uiw/react-markdown-preview';
import { langs } from '@uiw/codemirror-extensions-langs'
import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';
import { useNavigate } from 'react-router-dom'


type Props = {
   noteData: IUserData
}

const myTheme = createTheme({
   theme: 'light',
   settings: {
      background: '#22272e',
      foreground: '#75baff',
      caret: '#5d00ff',
      selection: '#036dd626',
      selectionMatch: '#036dd626',
      lineHighlight: '#8a91991a',
      gutterBackground: '#22272e',
      gutterForeground: '#8a919966',
   },
   styles: [
      { tag: t.comment, color: '#787b8099' },
      { tag: t.variableName, color: '#0080ff' },
      { tag: [t.string, t.special(t.brace)], color: '#5c6166' },
      { tag: t.number, color: '#5c6166' },
      { tag: t.bool, color: '#5c6166' },
      { tag: t.null, color: '#5c6166' },
      { tag: t.keyword, color: '#5c6166' },
      { tag: t.operator, color: '#5c6166' },
      { tag: t.className, color: '#5c6166' },
      { tag: t.definition(t.typeName), color: '#5c6166' },
      { tag: t.typeName, color: '#5c6166' },
      { tag: t.angleBracket, color: '#5c6166' },
      { tag: t.tagName, color: '#5c6166' },
      { tag: t.attributeName, color: '#5c6166' },
   ],
});

const NotePage = ({ noteData }: Props) => {
   const [editorValue, setEditorValue] = useState('# Hello!')
   const { id, title, content } = noteData
   const navigate = useNavigate()

   useEffect(() => {
      setEditorValue(content)
   }, [])

   const onEditorChange = useCallback((value, viewupdate) => {
      console.log('value: ', value)
      setEditorValue(value)
      // console.log('view: ', viewupdate)
   }, [])

   return (
      <div className={styles.page}>
         <button onClick={() => {
            navigate('/home')
         }}>Go back</button>
         <div className={styles.editor}>
            <CodeMirror
               value={editorValue}
               onChange={onEditorChange}
               height='100%'
               width='100%'
               theme={myTheme}
               extensions={[langs.markdown()]}
               basicSetup={{
                  foldGutter: false,
                  dropCursor: false,
                  allowMultipleSelections: false,
                  indentOnInput: false,
               }}
            />
         </div>
         <div className={styles.preview}>
            <MarkdownPreview
               source={editorValue}
               style={{
                  backgroundColor: 'transparent',
                  height: '100%',
                  fontSize: '16px'
               }}
            />
         </div>

      </div>
   )
}

export default NotePage