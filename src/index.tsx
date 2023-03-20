import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import App from './app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HelmetProvider } from 'react-helmet-async';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
   <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
         <HelmetProvider>
            <ReactQueryDevtools initialIsOpen={true} />
            <App />
            <ToastContainer />
         </HelmetProvider>
      </QueryClientProvider>
   </ApolloProvider>,
);
