import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { AuthContextProvider } from './ContextApi/AuthContext.jsx'
import { DataContexProvider } from './ContextApi/DataContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthContextProvider>
    <DataContexProvider>
      <App />
    </DataContexProvider>
    </AuthContextProvider>
      
    </BrowserRouter>
  </StrictMode>,
)
