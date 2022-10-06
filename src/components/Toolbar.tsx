import React from 'react'
import { Button, HStack, useToast, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter } from '@chakra-ui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave, faCopy, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'


type Props = {
   name: string | undefined,
   editorValue: string | undefined,
   isHome: boolean,
   processFiles: any,
   directory: string,
   setDirName: any,
   noteId: number,
   setCurrentNoteId: any
}

const Toolbar = ({ name, editorValue, isHome, processFiles, directory, setDirName, setCurrentNoteId, noteId }: Props) => {
   const splitDirName = name ? [...directory.split('\\'), name] : directory.split('\\')

   const toast = useToast()
   const navigate = useNavigate()
   const directoryApi = window.electron.directoryApi
   const { isOpen, onOpen, onClose } = useDisclosure()


   const filesApi = window.electron.filesApi
   const windowAPi = window.electron.windowApi

   const handleDeleteClick = () => {
      const breadCrumbBreakPoint = splitDirName.slice(0, splitDirName.indexOf(name)).join('\\')
      console.log('New dir: ', breadCrumbBreakPoint)
      directoryApi.setNewDirectory(breadCrumbBreakPoint)
      setDirName(breadCrumbBreakPoint)
      processFiles()
      navigate('/home')
   }

   const handlePopupClick = () => {
      // setCurrentNoteId(noteId)
      windowAPi.newWindow(noteId)
   }

   return (
      <>
         <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent bgColor='gray.800' color='whiteAlpha.900'>
               <ModalHeader>Confirm Deletion</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  Are you sure you want to delete the file?
               </ModalBody>

               <ModalFooter>
                  <Button colorScheme='red' mr={3} onClick={() => {
                     filesApi.deleteFile(name)
                     handleDeleteClick()
                  }}>
                     Delete
                  </Button>
                  <Button variant='ghost' onClick={() => {
                     onClose()
                  }}> Cancel </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
         <HStack
            top='50px' right='0'
            pos='fixed' zIndex='overlay'
            color='whiteAlpha.900'
         >
            {isHome ?
               <Button variant='ghost'
                  _hover={{
                     'backgroundColor': 'teal.500'
                  }}
               >
                  <FontAwesomeIcon icon={faPlus} />
               </Button>
               :
               <>
                  <Button
                     variant='ghost'
                     title='save'
                     _hover={{
                        'backgroundColor': 'teal.500'
                     }}
                     onClick={() => {
                        filesApi.writeFile(name, editorValue)
                        toast({
                           position: 'bottom-right',
                           status: 'success',
                           title: 'File saved.',
                           isClosable: true
                        })
                        // console.log(name, editorValue)
                     }}
                  >
                     <FontAwesomeIcon icon={faSave} />
                  </Button>
                  <Button
                     variant='ghost'
                     title='hover'
                     _hover={{
                        'backgroundColor': 'teal.500'
                     }}
                     onClick={() => {
                        handlePopupClick()
                     }}
                  >
                     <FontAwesomeIcon icon={faCopy} />
                  </Button>
                  <Button
                     variant='ghost'
                     title='delete'
                     _hover={{
                        'backgroundColor': 'red.500'
                     }}
                     onClick={() => {
                        onOpen()
                     }}
                  >
                     <FontAwesomeIcon icon={faTrash} />
                  </Button>
               </>
            }
         </HStack>
      </>
   )
}

export default Toolbar