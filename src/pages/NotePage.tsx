// Hooks and interfaces
import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { IUserData } from '../interfaces'
// Libraries
import MarkdownPreview from '@uiw/react-markdown-preview';
import MarkdownEditor from '../components/MarkdownEditor';
import styles from '../styles/pages/NotePage.module.scss'
import { Box, Flex } from '@chakra-ui/react';

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
      <Flex minH='100vh' h='fit-content' align='flex-start' bgColor='gray.800' pt='50px'>
         <Box w='50%' fontSize='1.5em' fontFamily='sans-serif'>
            <MarkdownEditor
               value={editorValue}
               onChange={setEditorValue}
            />
         </Box>
         <Box w='50%' pl='1em' pt='1em'>
            <MarkdownPreview
               source={editorValue}
               style={{
                  backgroundColor: 'transparent',
                  height: '100%',
                  fontSize: '16px'
               }}
            />
         </Box>
      </Flex>
   )
}

export default NotePage