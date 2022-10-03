// Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faXmark, faPencil, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction } from 'react';
import { Flex, Spacer, Box, HStack, Button } from "@chakra-ui/react";

type Props = {
   previewNote: boolean,
   setPreviewNote: Dispatch<SetStateAction<boolean>>
}

const StickyNoteTitle = ({ previewNote, setPreviewNote }: Props) => {
   const titleBar = window.electron.titleBarApi

   return (
      <Flex h='40px' w='100%' bg='gray.900' align='center' pl='1em' pr='1em' color='whiteAlpha.900' pos='fixed' zIndex='sticky'>
         <Box fontSize='xl' color='teal.400'>
            <FontAwesomeIcon icon={faPaperPlane} />
         </Box>
         <Spacer />
         <HStack>
            <Button
               variant='ghost'
               _hover={{ bg: 'gray.500' }}
               title={previewNote ? 'Edit' : 'Confirm'}
               onClick={() => {
                  setPreviewNote(!previewNote)
               }}
            >
               {previewNote ?
                  <FontAwesomeIcon icon={faPencil} />
                  :
                  <FontAwesomeIcon icon={faCheck} />
               }
            </Button>
            <Button
               variant='ghost'
               _hover={{ bg: 'red.500' }}
               title='Quit'
               onClick={() => {
                  titleBar.quit()
               }}
            >
               <FontAwesomeIcon icon={faXmark} />
            </Button>
         </HStack>
      </Flex>
   )
}

export default StickyNoteTitle