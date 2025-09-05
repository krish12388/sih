import { useState } from 'react'
import Home from './pages/Home'
import LiveLocation from './pages/Traffic_update'
function App() {


  return (
    <div className='bg-[#0A0D14]'>
    <Home/>
    <LiveLocation/>
    </div>
  )
}

export default App
