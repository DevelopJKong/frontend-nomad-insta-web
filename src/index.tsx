import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { QueryClient, QueryClientProvider } from "react-query";
import { HelmetProvider } from "react-helmet-async";
import { ReactQueryDevtools } from "react-query/devtools";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
   <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
         <HelmetProvider>
            <ReactQueryDevtools initialIsOpen={true} />
            <App />
         </HelmetProvider>
      </QueryClientProvider>
   </ApolloProvider>,
);
