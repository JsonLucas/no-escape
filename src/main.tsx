import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { UserProfileContextComponent } from './context/UserProfileContext';
import { AuthContextComponent } from './context/AuthContext';
import './index.css'

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <AuthContextComponent>
          <UserProfileContextComponent>
            <App />
          </UserProfileContextComponent>
        </AuthContextComponent>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
