// Hooks and dependencies
import React, { SetStateAction, Dispatch } from "react"
import { IDirData } from '../interfaces'
// Libraries and components
import { Flex, Button, HStack, Wrap, WrapItem, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import Note from "../components/Note"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

type Props = {
   dirName: string
   dirFiles: IDirData[],
   dirFolders: any[],
   setCurrentNoteId: Dispatch<SetStateAction<number>>,
   setDirName: Dispatch<SetStateAction<string>>
}

const HomePage = ({ dirName, dirFiles, dirFolders, setCurrentNoteId, setDirName }: Props) => {
   const splitDirName = dirName.toString().split('\\')

   const handleBreadcrumbClick = (name: string) => {
      const breadCrumbBreakPoint = splitDirName.slice(0, splitDirName.indexOf(name) + 1).join('\\')
      setDirName(breadCrumbBreakPoint)
   }

   const handleFolderButtonClick = (folder: string) => {
      const newDirName = [...splitDirName, folder].join('\\')
      window.electron.directoryApi.setNewDirectory(newDirName)
      setDirName(newDirName)
   }

   console.log('Set Homepage', [...new Set(dirFiles)])

   return (
      <Flex h='100vh' justify='center' align='center' flexFlow='column' bg='gray.800'>
         <Breadcrumb spacing='8px' color='whiteAlpha.900' pos='absolute' top='60px' left='1em' separator={<FontAwesomeIcon icon={faChevronRight} />}>
            {splitDirName.map((name, index) => {
               return (
                  <BreadcrumbItem key={index + 1}>
                     <BreadcrumbLink href='#' onClick={() => handleBreadcrumbClick(name)}>{name}</BreadcrumbLink>
                  </BreadcrumbItem>
               )
            })}
         </Breadcrumb>
         <HStack pos='absolute' top='90px' left='1em'>
            {dirFolders.map((folder, index) => {
               return (
                  <Button variant='outline' color='whiteAlpha.900' key={index + 1} onClick={() => handleFolderButtonClick(folder)}>
                     {folder}
                  </Button>
               )
            })}
         </HStack>
         <Wrap p='1em' w='95%' spacing='1em' justify='center'>
            {[...new Set(dirFiles)].map((item, index) => {
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