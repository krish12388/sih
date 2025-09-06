import React from 'react'
import MapComponent from './Traffic_update'
import TrafficDashboard from '../components/ui/Dashboard'
function Dash_2() {
  return (
    <div className='h-full w-full p-3 bg-[#0A0D14]'>
      {/* <Navbar_2/> */}
      <TrafficDashboard />
      <MapComponent/>

    </div>
  )
}

export default Dash_2