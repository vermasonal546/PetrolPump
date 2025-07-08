import React, { useState } from 'react'
 
import { BrowserRouter, Route, Routes } from 'react-router-dom'
 import Add_party from "./Add_party.jsx"
import Navbar from './Navbar.jsx'
import ChangePassword from './ChangePassword.jsx'
import Home from './Pages/Home.jsx'
import AppContext from './Pages/AppContext.jsx'
import Register from './Register.jsx'
import Party_List from './Party_List.jsx'
import Edit from './Edit.jsx'
const App = () => {
    const [login,setLogin]=useState(false)
  return (
    <div>
         <BrowserRouter>
   <AppContext login={login} setLogin={setLogin}/>

  <Routes>
    <Route path="/navbar" element={<Navbar/>}/>
    <Route path="/Add-party" element={<Add_party/>}/>
    <Route path='/ChangePassword' element={<ChangePassword/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/party-List' element={<Party_List login={login}/>} />  
    <Route path='/editparty' element={<Edit/>} />  
    
  </Routes>
      

     
  </BrowserRouter>
      
    </div>
  )
}

export default App
