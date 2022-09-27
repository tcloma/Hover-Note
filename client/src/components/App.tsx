import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import React, { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import NotePage from './pages/NotePage';
import Layout from './Layout';

const App = () => {
   const [currentNoteId, setCurrentNoteId] = useState<number>(1)
   const queryClient = new QueryClient()

   const [userFiles, setUserFiles] = useState([])
   const filesApi = window.electron.fileSystemApi

   useEffect(() => {
      filesApi.processFiles()
      setTimeout(() => {
         setUserFiles(filesApi.getFiles())
      }, 1000)
   }, [])

   return (
      <BrowserRouter>
         <QueryClientProvider client={queryClient}>
            <Layout>
               <Routes>
                  <Route path='/' element={<LandingPage />} />
                  <Route path='/home' element={<HomePage userFiles={userFiles} setCurrentNoteId={setCurrentNoteId} />} />
                  <Route path='/note/:id' element={<NotePage noteData={userFiles} />} />
               </Routes>
            </Layout>
         </QueryClientProvider>
      </BrowserRouter>
   );
}

export default App;