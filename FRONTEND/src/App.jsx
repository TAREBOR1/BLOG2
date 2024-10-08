import React from 'react'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import About from './Pages/About'
import Dashboard from './Pages/Dashboard'
import Home from './Pages/Home'
import Project from './Pages/Project'
import Header from './Component/Header'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import FooterC from './Component/FooterC'
import PrivateRoute from './Component/PrivateRoute'



const App = () => {
  return (
<BrowserRouter>
<Header/>
<Routes>
<Route path='/' element={<Home/>}/>
  <Route path="/About" element={<About/>} />
   <Route element={<PrivateRoute/>}>
     <Route path='/Dashboard' element={<Dashboard/>}/>
    </Route>
  <Route path='/Signin' element={<Signin/>}/>
  <Route path='/Signup' element={<Signup/>}/>
  <Route path='/Projects' element={<Project/>}/>
</Routes>
<FooterC/>
</BrowserRouter>
  )
}

export default App
