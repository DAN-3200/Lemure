import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './pages/App.jsx'
import Test from './pages/Test.jsx'
import './index.css'

function Base(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Test/>}></Route>
        <Route path='notes' element={<App/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Base/>
  </React.StrictMode>,
)
