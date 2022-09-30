// Hooks and interfaces
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useAwaitPoll } from '../functions'
import { IUserData } from '../interfaces'

// Dependencies
import MarkdownEditor from '../components/MarkdownEditor';
import MarkdownPreview from '@uiw/react-markdown-preview';
import styles from '../styles/pages/StickyNote.module.scss'

type Props = {
   isSticky: Dispatch<SetStateAction<boolean>>,
   previewNote: boolean
}

const StickyNote = ({ isSticky, previewNote }: Props) => {
   // Local state
   const defaultObj = { id: 1, title: 'Loading', content: 'Loading...' }
   const [editorValue, setEditorValue] = useState('# Hello!')
   const [noteData, setNoteData] = useState<IUserData>(defaultObj)

   // Shorthand definitions
   const stickyNoteApi = window.electron.stickyNoteApi
   isSticky(true)

   useEffect(() => {
      stickyNoteApi.initData()
      useAwaitPoll(stickyNoteApi.getChildData, setNoteData)
   }, [])

   useEffect(() => {
      setEditorValue(noteData.content)
   }, [noteData])

   return (
      <div className={styles.note}>
         {previewNote ?
            <MarkdownPreview
               source={editorValue}
               style={{
                  backgroundColor: 'transparent',
                  height: '100%',
                  fontSize: '16px',
               }}
            />
            :
            <MarkdownEditor
               value={editorValue}
               onChange={setEditorValue}
            />
         }
      </div>
   )
}

export default StickyNote