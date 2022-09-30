// Hooks and types/interfaces
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { IUserData } from '../interfaces';
import { useAwaitPoll } from '../functions';

// Components and pages
import LandingPage from '../pages/LandingPage';
import HomePage from '../pages/HomePage';
import NotePage from '../pages/NotePage';
import StickyNote from '../pages/StickyNote';
import Layout from './Layout';

const App = () => {
   // Global state definitions
   const [userFiles, setUserFiles] = useState<IUserData[]>([])
   const [currentNoteId, setCurrentNoteId] = useState<number>(1)
   const [dirName, setDirName] = useState<string>('')
   const [initialRender, setInitialRender] = useState<boolean>(true)
   const [isStickyNote, setIsStickyNote] = useState<boolean>(false)

   // Shorthand definitions
   const filesApi = window.electron.filesApi
   const currentNote = userFiles.find(file => file.id === currentNoteId)!

   // Set timeout to give files time to process
   useEffect(() => {
      if (initialRender) { setInitialRender(false); return }
      // console.log('Processing files')
      filesApi.processFiles()
      useAwaitPoll(filesApi.getFiles, setUserFiles)
   }, [dirName])


   return (
      <BrowserRouter>
         <Layout isSticky={setIsStickyNote}>
            <Routes>
               <Route path='/' element={<LandingPage dirName={dirName} setDirName={setDirName} />} />
               <Route path='/home' element={<HomePage userFiles={userFiles} setCurrentNoteId={setCurrentNoteId} />} />
               <Route path='/note/:id' element={<NotePage noteData={currentNote} />} />
               <Route path='/sticky/:id' element={<StickyNote />} />
            </Routes>
         </Layout>
      </BrowserRouter>
   );
}

export default App;