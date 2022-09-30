// Hooks and interfaces
import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { IUserData } from '../interfaces'
// Libraries
import MarkdownPreview from '@uiw/react-markdown-preview';
import MarkdownEditor from '../components/MarkdownEditor';
import styles from '../styles/pages/NotePage.module.scss'

type Props = {
   noteData: IUserData,
}

const NotePage = ({ noteData = { id: 1, title: 'test', content: 'test' } }: Props) => {
   const [editorValue, setEditorValue] = useState<string>('# Hello!')
   const { id, title, content } = noteData
   const navigate = useNavigate()

   useEffect(() => {
      setEditorValue(content)
   }, [])

   return (
      <div className={styles.page}>
         <button onClick={() => {
            navigate('/home')
         }}>Go back</button>
         <div className={styles.editor}>
            <MarkdownEditor
               value={editorValue}
               onChange={setEditorValue}
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