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
   previewNote: boolean,
   setWindowId: Dispatch<SetStateAction<number>>
}

interface INoteData {
   winId: number,
   data: IDirData
}

const StickyNote = ({ isSticky, previewNote, setWindowId }: Props) => {
   // Local state
   // const defaultObj = { winId: 1, content: { id: 1, name: 'Loading', content: 'Loading...' } }
   const [editorValue, setEditorValue] = useState('# Hello!')
   const [noteData, setNoteData] = useState<INoteData>()

   // Shorthand definitions
   const stickyNoteApi = window.electron.stickyNoteApi
   isSticky(true)

   useEffect(() => {
      stickyNoteApi.initData()
      useAwaitPoll(stickyNoteApi.getChildData, setNoteData)
   }, [])

   useEffect(() => {
      setWindowId(noteData?.winId)
      setEditorValue(noteData?.data?.content)
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