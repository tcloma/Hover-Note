// Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faXmark, faPencil, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction } from 'react';
import { Flex, Spacer, Box, HStack, Button } from "@chakra-ui/react";

type Props = {
   previewNote: boolean,
   setPreviewNote: Dispatch<SetStateAction<boolean>>,
   windowId: number | undefined
}

const StickyNoteTitle = ({ previewNote, setPreviewNote, windowId }: Props) => {
   const titleBar = window.electron.titleBarApi

   return (
      <Flex
         h='40px' w='100%'
         bg='gray.900' color='whiteAlpha.900'
         align='center' pl='1em' pr='1em'
         pos='fixed' zIndex='sticky'
         sx={{
            'WebkitUserSelect': 'none',
            'WebkitAppRegion': 'drag',
         }}
      >
         <Box fontSize='xl' color='teal.400'>
            <FontAwesomeIcon icon={faPaperPlane} /> {windowId}
         </Box>
         <Spacer />
         <HStack>
            <Button
               onClick={() => setPreviewNote(!previewNote)}
               _hover={{ bg: 'gray.500' }}
               variant='ghost'
               title={previewNote ? 'Edit' : 'Confirm'}
               sx={{
                  'WebkitAppRegion': 'no-drag'
               }}
            >
               {previewNote ?
                  <FontAwesomeIcon icon={faPencil} />
                  :
                  <FontAwesomeIcon icon={faCheck} />
               }
            </Button>
            <Button
               onClick={() => titleBar.quit(windowId)}
               _hover={{ bg: 'red.500' }}
               variant='ghost'
               title='Quit'
               sx={{
                  'WebkitAppRegion': 'no-drag'
               }}
            >
               <FontAwesomeIcon icon={faXmark} />
            </Button>
         </HStack>
      </Flex>
   )
}

export default StickyNoteTitle