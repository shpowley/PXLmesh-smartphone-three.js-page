import './style.css'
import ReactDOM from 'react-dom/client'
import App from './App'
import { StrictMode } from 'react'

ReactDOM.createRoot(document.querySelector('#root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)