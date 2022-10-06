import React, { Dispatch, SetStateAction } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import Toolbar from '../components/Toolbar'

type Props = {
   directory: string,
   noteName?: string,
   setDirName: Dispatch<SetStateAction<string>>,
   processFiles?: any,
   name?: string,
   editorValue?: string,
   hasInitDir?: boolean,
   setCurrentNoteId: any,
   noteId: number,
}

// Make a reference to page to conditionally render stlying and tooblar

const BreadCrumbWrapper = ({ directory, setDirName, processFiles, noteName, name, editorValue, noteId, setCurrentNoteId, hasInitDir }: Props) => {
   const splitDirName = noteName ? [...directory.split('\\'), noteName] : directory.split('\\')
   const directoryApi = window.electron.directoryApi
   const navigate = useNavigate()

   const handleBreadcrumbClick = (name: string) => {
      const breadCrumbBreakPoint = splitDirName.slice(0, splitDirName.indexOf(name) + 1).join('\\')
      directoryApi.setNewDirectory(breadCrumbBreakPoint)
      setDirName(breadCrumbBreakPoint)
      navigate('/home')
   }

   return (
      <>
         <Breadcrumb
            spacing='8px' w='100%' p='10px'
            bgColor='gray.800' color='whiteAlpha.900'
            zIndex='overlay' pos='fixed'
            top='50px' left='1em'
            // boxShadow='md'
            separator={<FontAwesomeIcon icon={faChevronRight} />}
         >
            {splitDirName.map((name, index) => {
               const lastItem = index + 1 === splitDirName.length
               const lastDir = index + 1 === splitDirName.length - 1
               return (
                  <BreadcrumbItem key={index + 1}>
                     <BreadcrumbLink href='#' _hover={{
                        'textDecoration': 'underline'
                     }}
                        color={lastItem ? 'teal.300' : 'whiteAlpha.900'}
                        onClick={() => {
                           if (!lastItem) {
                              handleBreadcrumbClick(name)
                           }
                           if (lastDir) {
                              processFiles()
                           }
                        }}>
                        {name}
                     </BreadcrumbLink>
                  </BreadcrumbItem>
               )
            })}
         </Breadcrumb>
         <Toolbar
            name={name}
            editorValue={editorValue}
            isHome={hasInitDir !== undefined}
            processFiles={processFiles}
            directory={directory}
            setDirName={setDirName}
            setCurrentNoteId={setCurrentNoteId}
            noteId={noteId}
         />
      </>
   )
}

export default BreadCrumbWrapper