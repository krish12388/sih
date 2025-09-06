import React from 'react'

import TrafficDashboard from '../components/ui/Dashboard'
import SmartChallan from './SmartChallan'
function Dash_2() {
  return (
    <div className='h-full w-full p-3 bg-[#0A0D14]'>
      {/* <Navbar_2/> */}
      <TrafficDashboard />
      <SmartChallan/>

    </div>
  )
}

export default Dash_2