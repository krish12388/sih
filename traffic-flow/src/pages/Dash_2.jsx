import React from 'react'
import Traffic_update from './Traffic_update'
import TrafficDashboard from '../components/ui/Dashboard'
function Dash_2() {
  return (
    <div className='h-screen p-3 bg-[#0A0D14]'>
      {/* <Navbar_2/> */}
      <TrafficDashboard />
      <Traffic_update/>
    </div>
  )
}

export default Dash_2