import { useState } from 'react'
import Login from './pages/Log_in'
import LandingPage from './pages/Landing'
import Home from './pages/Home'
import Contact from './pages/Contact'
import UnderDevelopment from './pages/Unser_dev'

function App() {


  return (
    <div className='bg-[#0A0D14]'>
    <LandingPage/>
    <Home/>
    <Login/>
    <Contact/>
    <UnderDevelopment/>
    </div>
  )
}

export default App
