import React, { useEffect, useState } from 'react'
import styles from '../styles/pages/NotePage.module.scss'
import { IUserData } from '../interfaces'
import { atomone } from '@uiw/codemirror-themes-all'
import CodeMirror from '@uiw/react-codemirror'
import { loadLanguage } from '@uiw/codemirror-extensions-langs'

type Props = {
   noteData: IUserData
}

const NotePage = ({ noteData }: Props) => {
   const [editorValue, setEditorValue] = useState('# Hello!')
   const { id, title, content } = noteData

   useEffect(() => {
      setEditorValue(content)
   }, [])

   return (
      <div className={styles.page}>
         <CodeMirror
            value={editorValue}
            height='100vh'
            width='100vw'
            theme={atomone}
            extensions={[loadLanguage('markdown')]}
            basicSetup={{
               foldGutter: false,
               dropCursor: false,
               allowMultipleSelections: false,
               indentOnInput: false,
            }}
         />
      </div>
   )
}

export default NotePage