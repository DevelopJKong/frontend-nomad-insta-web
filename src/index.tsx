import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { QueryClient, QueryClientProvider } from "react-query";
import { HelmetProvider } from "react-helmet-async";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
   <React.StrictMode>
      <QueryClientProvider client={queryClient}>
         <HelmetProvider>
            <ReactQueryDevtools initialIsOpen={true} />
            <App />
         </HelmetProvider>
      </QueryClientProvider>
   </React.StrictMode>,
);
