import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)
