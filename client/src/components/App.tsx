import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Homepage from './pages/Homepage';
import Layout from './Layout';
import '../styles/components/App.scss';

const App = () => {
   const queryClient = new QueryClient()

   return (
      <BrowserRouter>
         <QueryClientProvider client={queryClient}>
            <Layout>
               <Routes>
                  <Route path='/' element={<Homepage />} />
               </Routes>
            </Layout>
         </QueryClientProvider>
      </BrowserRouter>
   );
}

export default App;
