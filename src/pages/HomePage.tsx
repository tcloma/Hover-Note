// Hooks and dependencies
import React, { SetStateAction, Dispatch } from "react"
import { IDirData } from '../interfaces'
// Libraries and components
import { Flex, Button, HStack, Wrap, WrapItem, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Note from "../components/Note"

type Props = {
   dirName: string
   dirFiles: IDirData[],
   dirFolders: string[],
   setCurrentNoteId: Dispatch<SetStateAction<number>>,
   setDirName: Dispatch<SetStateAction<string>>
}

const HomePage = ({ dirName, dirFiles, dirFolders, setCurrentNoteId, setDirName }: Props) => {
   const splitDirName = dirName.toString().split('\\')
   const directoryApi = window.electron.directoryApi

   const handleBreadcrumbClick = (name: string) => {
      const breadCrumbBreakPoint = splitDirName.slice(0, splitDirName.indexOf(name) + 1).join('\\')
      directoryApi.setNewDirectory(breadCrumbBreakPoint)
      setDirName(breadCrumbBreakPoint)
   }

   const handleFolderButtonClick = (folder: string) => {
      const newDirName = [...splitDirName, folder].join('\\')
      directoryApi.setNewDirectory(newDirName)
      setDirName(newDirName)
   }

   return (
      <Flex minH='100vh' h='100%' justify='center' align='center' flexFlow='column' bg='gray.800' pt='150px'>
         <Breadcrumb spacing='8px' color='whiteAlpha.900' pos='absolute' top='60px' left='1em' separator={<FontAwesomeIcon icon={faChevronRight} />}>
            {splitDirName.map((name, index) => {
               return (
                  <BreadcrumbItem key={index + 1}>
                     <BreadcrumbLink href='#'
                        onClick={() => handleBreadcrumbClick(name)}>
                        {name}
                     </BreadcrumbLink>
                  </BreadcrumbItem>
               )
            })}
         </Breadcrumb>
         <HStack pos='absolute' top='90px' left='1em'>
            {dirFolders.map((folder, index) => {
               return (
                  <Button variant='outline' color='whiteAlpha.900' key={index + 1}
                     onClick={() => handleFolderButtonClick(folder)}
                  >
                     {folder}
                  </Button>
               )
            })}
         </HStack>
         <Wrap p='1em' w='95%' spacing='1em' justify='center'>
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
         </Wrap>
      </Flex>
   )
}

export default HomePage