import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';
import { faker } from '@faker-js/faker'
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import NotePage from './pages/NotePage';
import Layout from './Layout';
import React from 'react';

const App = () => {
   const [currentNoteId, setCurrentNoteId] = useState<Number>(1)
   const queryClient = new QueryClient()
   const exampleData = new Array(8).fill().map((v, i) => ({ id: i + 1, title: `${faker.word.adjective()} ${faker.word.noun()}`, content: faker.lorem.lines() }))

   // console.log(exampleData)

   return (
      <BrowserRouter>
         <QueryClientProvider client={queryClient}>
            <Layout>
               <Routes>
                  <Route path='/' element={<LandingPage />} />
                  <Route path='/home' element={<HomePage data={exampleData} setCurrentNoteId={setCurrentNoteId} />} />
                  <Route path='/note/:id' element={<NotePage noteData={exampleData.find((note) => note.id === currentNoteId)} />} />
               </Routes>
            </Layout>
         </QueryClientProvider>
      </BrowserRouter>
   );
}

export default App;