// Hooks
import React, { Dispatch, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'

// Dependencies / libraries
import MarkdownPreview from '@uiw/react-markdown-preview';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Box, Button, Container } from '@chakra-ui/react';

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
      <Container h='20vw' w='20vw' p='1em' pt='2.5em' pos='relative' border='3px' borderColor='gray.500' borderStyle='solid' borderRadius='lg' overflow='scroll'>
         <Button pos='absolute' variant='ghost' color='whiteAlpha.900' right='5' top='0'
            _hover={{ color: 'purple.400' }}
            onClick={() => stickyWindowPopup()}>
            <FontAwesomeIcon icon={faPlus} />
         </Button>
         <Button pos='absolute' variant='ghost' color='whiteAlpha.900' right='0' top='0'
            _hover={{ color: 'purple.400' }}
            onClick={() => console.log('clicked')}>
            <FontAwesomeIcon icon={faEllipsisVertical} />
         </Button>
         <Box onClick={() => notePageRoute()}>
            <MarkdownPreview
               source={content}
               style={{
                  backgroundColor: 'transparent',
                  height: '100vh'
               }}
            />
         </Box>
      </Container>
   )
}

export default Note