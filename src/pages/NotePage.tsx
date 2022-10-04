// Hooks and interfaces
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { IDirData } from '../interfaces'
// Libraries
import MarkdownPreview from '@uiw/react-markdown-preview';
import MarkdownEditor from '../components/MarkdownEditor';
import { Box, Button, Flex } from '@chakra-ui/react';
import BreadCrumbWrapper from '../components/BreadCrumbWrapper';
import Toolbar from '../components/Toolbar';

type Props = {
   noteData: IDirData,
   dirName: string,
   setDirName: Dispatch<SetStateAction<string>>,
   processFiles(): any
}

const NotePage = ({ noteData = { id: 1, name: 'test', content: 'test' }, dirName, setDirName, processFiles }: Props) => {
   const [editorValue, setEditorValue] = useState<string>('# Hello!')
   const { id, name, content } = noteData

   useEffect(() => {
      setEditorValue(content)
   }, [])

   return (
      <>
         <BreadCrumbWrapper
            directory={dirName}
            noteName={name}
            setDirName={setDirName}
            processFiles={processFiles}
         />
         <Toolbar />
         <Flex minH='100vh' h='fit-content' align='flex-start' bgColor='gray.800' pt='100px'>
            <Button pos='absolute' zIndex='overlay' onClick={() => {
               window.electron.filesApi.writeFile(name, editorValue)
            }}>
               Save
            </Button>
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
      </>
   )
}

export default NotePage