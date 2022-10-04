// Hooks and types/interfaces
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { IDirData } from '../interfaces';
import { useAwaitPoll } from '../functions';
import { ChakraProvider } from '@chakra-ui/react'

// Components and pages
import LandingPage from '../pages/LandingPage';
import HomePage from '../pages/HomePage';
import NotePage from '../pages/NotePage';
import StickyNote from '../pages/StickyNote';
import Layout from './Layout';
import { dir } from 'console';

const App = () => {
   // Global state definitions
   const [dirName, setDirName] = useState<string>('')
   const [dirFiles, setDirFiles] = useState<IDirData[]>([])
   const [dirFolders, setDirFolders] = useState<Array<string[]>>([])
   const [currentNoteId, setCurrentNoteId] = useState<number>(1)
   const [initialRender, setInitialRender] = useState<boolean>(true)
   const [isStickyNote, setIsStickyNote] = useState<boolean>(false)
   const [previewNote, setPreviewNote] = useState<boolean>(true)

   // Shorthand definitions
   const filesApi = window.electron.filesApi
   const currentNote = dirFiles.find(file => file.id === currentNoteId)!

   useEffect(() => {
      if (initialRender) { setInitialRender(false); return }
      filesApi.processDirectory()
      useAwaitPoll(filesApi.getFiles, setDirFiles)
      useAwaitPoll(filesApi.getFolders, setDirFolders)
   }, [dirName])

   // Files received from electron
   console.log('Directory Files: ', dirFiles)
   console.log('Directory Folders: ', dirFolders)

   return (
      <BrowserRouter>
         <ChakraProvider>
            <Layout stickyNote={isStickyNote} previewNote={previewNote} setPreviewNote={setPreviewNote}>
               <Routes>
                  <Route path='/' element={<LandingPage dirName={dirName} setDirName={setDirName} />} />
                  <Route path='/home' element={<HomePage dirFiles={dirFiles[0]} dirFolders={dirFolders[0]} setCurrentNoteId={setCurrentNoteId} dirName={dirName} setDirName={setDirName} />} />
                  <Route path='/note/:id' element={<NotePage noteData={currentNote} />} />
                  <Route path='/sticky/:id' element={<StickyNote isSticky={setIsStickyNote} previewNote={previewNote} />} />
               </Routes>
            </Layout>
         </ChakraProvider>
      </BrowserRouter>
   );
}

export default App;