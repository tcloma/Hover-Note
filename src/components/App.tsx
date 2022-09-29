import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { IUserData } from '../interfaces';
import LandingPage from '../pages/LandingPage';
import HomePage from '../pages/HomePage';
import NotePage from '../pages/NotePage';
import Layout from './Layout';
import { useAwaitPoll } from '../functions';

const App = () => {
   // Global state definitions
   const [currentNoteId, setCurrentNoteId] = useState<number>(1)
   const [userFiles, setUserFiles] = useState<IUserData[]>([])
   const [firstRender, setFirstRender] = useState(true)
   const [dirName, setDirName] = useState<string>('')

   // Global API definitions
   const filesApi = window.electron.filesApi

   // Set timeout to give files time to process
   useEffect(() => {
      if (firstRender) {
         setFirstRender(false)
         return
      }
      console.log('Processing files')
      filesApi.processFiles()
      useAwaitPoll(filesApi.getFiles, setUserFiles)
   }, [dirName])

   const currentNote = userFiles.find(file => file.id === currentNoteId)!

   return (
      <BrowserRouter>
         <Layout>
            <Routes>
               <Route path='/' element={<LandingPage dirName={dirName} setDirName={setDirName} />} />
               <Route path='/home' element={<HomePage userFiles={userFiles} setCurrentNoteId={setCurrentNoteId} />} />
               <Route path='/note/:id' element={<NotePage noteData={currentNote} userFiles={userFiles}/>} />
            </Routes>
         </Layout>
      </BrowserRouter>
   );
}

export default App;