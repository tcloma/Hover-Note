// Hooks
import React, { Dispatch, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'

// Dependencies / libraries
import MarkdownPreview from '@uiw/react-markdown-preview';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Box, Button, Code, Container, Divider, Flex, Heading, Spacer } from '@chakra-ui/react';

type Props = {
   id: number,
   title: string,
   content: string,
   setCurrentNoteId: Dispatch<SetStateAction<number>>,
}


const Note = ({ title, content, id, setCurrentNoteId }: Props) => {
   // Shorthand definitions
   const navigate = useNavigate()
   const windowAPi = window.electron.windowApi

   const notePageRoute = () => {
      setCurrentNoteId(id)
      navigate(`/note/${id}`)
   }

   const stickyWindowPopup = () => {
      windowAPi.newWindow(id)
   }

   return (
      <Container h='20vw' w='20vw' p='1em' pos='relative' border='3px' borderColor='gray.500' borderStyle='solid' borderRadius='lg' overflow='scroll'>
         <Flex pos='sticky' backgroundColor='gray.800' top='-1em' pt='1em' zIndex='overlay' align='center'>
            <Code color='whiteAlpha.900' backgroundColor='purple.500' fontSize='xl'> {title}</Code>
            <Spacer />
            <Button variant='ghost' color='whiteAlpha.900'
               _hover={{ color: 'purple.400' }}
               onClick={() => stickyWindowPopup()}>
               <FontAwesomeIcon icon={faPlus} />
            </Button>
            <Button variant='ghost' color='whiteAlpha.900'
               _hover={{ color: 'purple.400' }}
               onClick={() => console.log('clicked')}>
               <FontAwesomeIcon icon={faEllipsisVertical} />
            </Button>
         </Flex>
         <Box pos='sticky' top='2.5em' zIndex='overlay'>
            <Divider />
         </Box>
         <Box pt='1.5em' onClick={() => notePageRoute()}>
            <MarkdownPreview
               source={content}
               style={{
                  backgroundColor: 'transparent',
                  height: '100%'
               }}
               rehypeRewrite={(node, index, parent) => {
                  if (node.tagName === "a" && parent && /^h(1|2|3|4|5|6)/.test(parent.tagName)) {
                     parent.children = [parent.children[1]];
                  }
               }}
            />
         </Box>
      </Container>
   )
}

export default Note