import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import About from './Pages/About'
import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard'
import Project from './Pages/Project'
import Signin from './Pages/Signin'
import Signout from './Pages/Signout'

const App = () => {
  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/project' element={<Project/>}/>
    <Route path='/signin' element={<Signin/>}/>
    <Route path='/signout' element={<Signout/>}/>
  </Routes>
  </BrowserRouter>
  )
}

export default App
