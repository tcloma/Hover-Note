// Hooks and interfaces
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useAwaitPoll } from '../functions'
import { IDirData } from '../interfaces'

// Dependencies
import MarkdownEditor from '../components/MarkdownEditor';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { Flex } from '@chakra-ui/react';

type Props = {
   isSticky: Dispatch<SetStateAction<boolean>>,
   previewNote: boolean
}

const StickyNote = ({ isSticky, previewNote }: Props) => {
   // Local state
   const defaultObj = { id: 1, name: 'Loading', content: 'Loading...' }
   const [editorValue, setEditorValue] = useState('# Hello!')
   const [noteData, setNoteData] = useState<IDirData>(defaultObj)

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
      <Flex minH='100vh' h='fit-content' w='100vw' p='10vw' pt='50px' bg='gray.800'>
         {previewNote ?
            <MarkdownPreview
               source={editorValue}
               style={{
                  backgroundColor: 'transparent',
                  height: '100%',
                  width: '100%',
                  fontSize: '1em',
               }}
            />
            :
            <MarkdownEditor
               value={editorValue}
               onChange={setEditorValue}
            />

         }
      </Flex>
   )
}

export default StickyNote