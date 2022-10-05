// Hooks
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowMaximize, faWindowRestore } from '@fortawesome/free-regular-svg-icons';
import { faWindowMinimize, faXmark, faBars } from "@fortawesome/free-solid-svg-icons";
import { Flex, HStack, Spacer, Button, Box, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, useDisclosure } from '@chakra-ui/react';

const Titlebar = () => {
   // Local state definitions
   const [windowMaximize, setWindowMaximize] = useState(true)
   const [menuClicked, setMenuClicked] = useState(false)

   // Local API definitions
   const { isOpen, onOpen, onClose } = useDisclosure()
   const navigate = useNavigate()
   const titleBar = window.electron.titleBarApi

   const handleMenuClick = () => {
      setMenuClicked(true)
      onOpen()
   }

   return (
      <>
         <Flex
            h='50px' w='100%'
            bg='gray.900' color='whiteAlpha.900'
            align='center' pl='1em' pr='1em'
            pos='fixed' zIndex='sticky'
            sx={{
               'WebkitUserSelect': 'none',
               'WebkitAppRegion': 'drag'
            }}
         >
            <Box onClick={handleMenuClick} fontSize='xl' color='teal.400' sx={{ 'WebkitAppRegion': 'no-drag' }}>
               {menuClicked ?
                  <FontAwesomeIcon icon={faXmark} />
                  :
                  <FontAwesomeIcon icon={faBars} />
               }
            </Box>
            <Spacer />
            <HStack h='100%' sx={{ 'WebkitAppRegion': 'no-drag' }}>
               <Button
                  onClick={() => titleBar.minimize()}
                  _hover={{ bg: 'gray.500' }}
                  variant='ghost'
                  title='Minimize'
               >
                  <FontAwesomeIcon icon={faWindowMinimize} />
               </Button>
               <Button
                  onClick={() => {
                     titleBar.maximize()
                     setWindowMaximize(!windowMaximize)
                  }}
                  _hover={{ bg: 'gray.500' }}
                  variant='ghost'
                  title={windowMaximize ? 'Restore' : 'Maximize'}
               >
                  {windowMaximize ?
                     <FontAwesomeIcon icon={faWindowRestore} />
                     : <FontAwesomeIcon icon={faWindowMaximize} />
                  }
               </Button>
               <Button
                  onClick={() => titleBar.quit()}
                  _hover={{ bg: 'red.500' }}
                  variant='ghost'
                  title='Quit'
               >
                  <FontAwesomeIcon icon={faXmark} />
               </Button>
            </HStack>
         </Flex>
         <Drawer placement='left' isOpen={isOpen} size='xs'
            onClose={() => {
               onClose()
               setMenuClicked(false)
            }}>
            <DrawerOverlay />
            <DrawerContent backgroundColor='gray.800' color='whiteAlpha.900'>
               <DrawerHeader borderBottomWidth='1px'>Nav Drawer</DrawerHeader>
               <DrawerBody>
                  <p onClick={() => {
                     navigate('/')
                     onClose()
                  }}>Landing</p>
                  <p onClick={() => {
                     navigate('/home')
                     onClose()
                  }}>
                     Home</p>
                  <p>Some contents...</p>
               </DrawerBody>
            </DrawerContent>
         </Drawer>
      </>
   )
}

export default Titlebar