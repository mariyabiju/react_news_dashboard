import { StrictMode } from 'react'
import {createRoot} from "react-dom/client"
// import './App.css'
import Nav from '../../../src/components/Nav.jsx'
import Main from '../../../src/components/Main.jsx'
import App from './App.jsx'
const root=createRoot(document.getElementById("root"))
// root.render(<><Nav/><Main/></>)

// createRoot(document.getElementById('root')).render(
//    <StrictMode>
//      <App />
//    </StrictMode>,
// )
root.render(<App/>)
