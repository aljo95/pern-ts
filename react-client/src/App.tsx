//import React, { useEffect, useState } from "react";
import { useState } from "react";
import "./App.css";
import { trpc } from "./trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
//import GetByIDComponent from "./GetByIDComponent";
import { Greeting } from "./Greeting";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:8000/trpc",
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Greeting />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
