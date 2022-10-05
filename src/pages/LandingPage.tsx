import { Button, Flex, Heading, Highlight, Input, Text } from '@chakra-ui/react';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAwaitPoll } from '../functions'

type Props = {
   dirName: string,
   setDirName: Dispatch<SetStateAction<string>>,
   hasInitDir: boolean
}

const LandingPage = ({ dirName, setDirName, hasInitDir }: Props) => {
   // Local state
   const [showDir, setShowDir] = useState<boolean>(false)

   // Shorthand definitions
   const navigate = useNavigate()
   const dialogApi = window.electron.dialogApi

   const handleSubmit = (e: React.FormEvent): void => {
      e.preventDefault();
      navigate('/home')
   }

   const handleContinueClick = (): void => {
      setShowDir(!showDir)
      if (hasInitDir) {
         navigate('/home')
      }
   }

   const handleBrowseClick = (): void => {
      dialogApi.openDialog()
      useAwaitPoll(dialogApi.getPath, setDirName)
   }

   return (
      <Flex h='100vh' justify='center' align='center' bg='gray.800' color='whiteAlpha.900'>
         <Flex direction='column' alignItems='center'>
            <Heading fontSize='5xl'>
               <Highlight query={['Hover']} styles={{ color: 'teal.300' }}>
                  Welcome to Hover
               </Highlight>
            </Heading>
            {showDir ?
               <form onSubmit={(e) => handleSubmit(e)}>
                  <Input
                     value={dirName}
                     onChange={(e) => setDirName(e.target.value)}
                     placeholder='Enter file directory: '
                     variant='flushed'
                     color='gray.400'
                  />
                  <Button colorScheme='purple' variant='solid' onClick={handleBrowseClick}>
                     Browse
                  </Button>
                  <Button variant='outline' colorScheme='purple' type='submit'>
                     Confirm
                  </Button>
               </form>
               :
               <Text color='gray.400' onClick={handleContinueClick}> Click to continue </Text>
            }
         </Flex>
      </Flex>
   )
}

export default LandingPage