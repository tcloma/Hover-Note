// Hooks
import React, { Dispatch, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'

// Dependencies / libraries
import MarkdownPreview from '@uiw/react-markdown-preview';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEllipsisVertical, faCopy, faTrash, faRemoveFormat, faRedo, faStar, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Box, Button, Code, Container, Divider, Flex, Spacer, Menu, MenuButton, MenuList, MenuItem, IconButton, useToast } from '@chakra-ui/react';

type Props = {
   id: number,
   title: string,
   content: string,
   setCurrentNoteId: Dispatch<SetStateAction<number>>,
   setDirFiles: any,
   dirFiles: any
}


const Note = ({ title, content, id, setCurrentNoteId, setDirFiles, dirFiles }: Props) => {
   // Shorthand definitions
   const navigate = useNavigate()
   const toast = useToast()
   const windowAPi = window.electron.windowApi
   const filesApi = window.electron.filesApi

   const notePageRoute = () => {
      setCurrentNoteId(id)
      navigate(`/note/${id}`)
   }

   const stickyWindowPopup = () => {
      windowAPi.newWindow(id)
   }

   return (
      <Container h='20vw' w='20vw' p='1em' pos='relative' border='3px' borderColor='gray.500' borderStyle='solid' borderRadius='lg' overflow='scroll'>
         <Flex pos='sticky' backgroundColor='gray.800' top='-1em' pt='1em' pb='.1em' zIndex='docked' align='center'>
            <Code maxW='65%' color='whiteAlpha.900' backgroundColor='purple.500' fontSize='lg' noOfLines={1}
               _hover={{
                  'noOfLines': 'max'
               }}
               transitionDuration='2s'
            > {title}
            </Code>
            <Spacer />
            <Button variant='ghost' color='whiteAlpha.900' fontSize='xl'
               minW='2.5vw'
               _hover={{ color: 'teal.400', 'backgroundColor': 'gray.900' }}
               _active={{ backgroundColor: 'gray.700' }}
               onClick={() => stickyWindowPopup()}>
               <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
            <Menu>
               <MenuButton
                  as={IconButton}
                  aria-label='Options'
                  icon={<FontAwesomeIcon icon={faEllipsisVertical} />}
                  variant='ghost'
                  color='whiteAlpha.900'
                  minW='2.5vw'
                  _hover={{ color: 'teal.500', 'backgroundColor': 'gray.900' }}
                  _active={{ color: 'teal.500', backgroundColor: 'gray.900' }}
                  onClick={() => console.log('clicked')}
               />
               <MenuList backgroundColor='gray.800' color='whiteAlpha.900' border='2px' borderColor='teal.200'>
                  <MenuItem
                     _focus={{ backgroundColor: 'gray.700', color: 'yellow.300' }}
                     _hover={{ backgroundColor: 'gray.700', color: 'yellow.300' }}
                     icon={<FontAwesomeIcon icon={faStar} />}
                  >
                     Favorite
                  </MenuItem>
                  <MenuItem
                     _focus={{ backgroundColor: 'gray.700' }}
                     _hover={{ backgroundColor: 'gray.700' }}
                     icon={<FontAwesomeIcon icon={faRedo} />}
                  >
                     Rename
                  </MenuItem>
                  <MenuItem
                     _focus={{ backgroundColor: 'red.700' }}
                     _hover={{ backgroundColor: 'red.700' }}
                     icon={<FontAwesomeIcon icon={faTrash} />}
                     onClick={() => {
                        filesApi.deleteFile(title)
                        toast({
                           position: 'bottom-right',
                           status: 'warning',
                           title: 'File deleted',
                           isClosable: true
                        })
                        const filteredFiles = dirFiles.filter(file => file.id !== id)
                        setDirFiles([filteredFiles])
                     }}
                  >
                     Delete
                  </MenuItem>
               </MenuList>
            </Menu>
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