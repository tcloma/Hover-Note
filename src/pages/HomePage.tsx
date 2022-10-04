// Hooks and dependencies
import React, { SetStateAction, Dispatch } from "react"
import { IDirData } from '../interfaces'
// Libraries and components
import { Flex, Button, Text, Wrap, WrapItem, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading } from "@chakra-ui/react"
import BreadCrumbWrapper from "../components/BreadCrumbWrapper"
import Note from "../components/Note"

type Props = {
   dirName: string
   dirFiles: IDirData[],
   dirFolders: string[],
   setCurrentNoteId: Dispatch<SetStateAction<number>>,
   setDirName: Dispatch<SetStateAction<string>>,
}

const HomePage = ({ dirName, dirFiles, dirFolders, setCurrentNoteId, setDirName }: Props) => {
   const splitDirName = dirName.toString().split('\\')
   const directoryApi = window.electron.directoryApi

   const handleFolderButtonClick = (folder: string) => {
      const newDirName = [...splitDirName, folder].join('\\')
      directoryApi.setNewDirectory(newDirName)
      setDirName(newDirName)
   }

   const NoteCards = () => {
      return (
         <>
            {dirFiles.map((item, index) => {
               return (
                  <WrapItem key={item.id}>
                     <Note
                        id={item.id}
                        title={item.name}
                        content={item.content}
                        setCurrentNoteId={setCurrentNoteId}
                     />
                  </WrapItem>
               )
            })}
         </>
      )
   }

   return (
      <>
         <BreadCrumbWrapper directory={dirName} setDirName={setDirName} />
         <Flex minH='100vh' h='100%' justify='center' align='center' flexFlow='column' bg='gray.800' pt='150px'>
            <Wrap pos='fixed' top='100px' left='1.5em'>
               {dirFolders.map((folder, index) => {
                  return (
                     <Button variant='outline' color='whiteAlpha.900' key={index + 1}
                        onClick={() => handleFolderButtonClick(folder)}
                     >
                        {folder}
                     </Button>
                  )
               })}
            </Wrap>
            {dirFiles.length === 0 ?
               <Text fontSize='5xl' color='whiteAlpha.900'> Empty Directory </Text>
               :
               <Wrap p='1em' w='95%' spacing='1em' justify='center'>
                  <NoteCards />
               </Wrap>
            }
         </Flex>
      </>
   )
}

export default HomePage