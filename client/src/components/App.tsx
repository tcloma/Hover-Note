import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import Layout from './Layout';

const App = () => {
   const queryClient = new QueryClient()

   return (
      <BrowserRouter>
         <QueryClientProvider client={queryClient}>
            <Layout>
               <Routes>
                  <Route path='/' element={<LandingPage />} />
                  <Route path='/home' element={<HomePage />} />
               </Routes>
            </Layout>
         </QueryClientProvider>
      </BrowserRouter>
   );
}

export default App;