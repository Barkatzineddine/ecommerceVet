import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import RapportContextProvider from './contex/rapportContext.jsx'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>

    <RapportContextProvider>
      <App />
    </RapportContextProvider>
    
  </BrowserRouter>
  
)
