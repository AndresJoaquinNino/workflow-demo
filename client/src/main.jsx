import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import router from './router';
import { QueryClientProvider } from '@tanstack/react-query';
import { reactQueryClient } from './config';
import 'reactflow/dist/style.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={reactQueryClient}>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
