import React from 'react'
import TrafficCard from './Traffic_update'
import TrafficDashboard from '../components/ui/Dashboard'
function Dash_2() {
  return (
    <div className='h-screen p-3 bg-[#0A0D14]'>
      {/* <Navbar_2/> */}
      <TrafficDashboard />
      <TrafficCard apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} />

    </div>
  )
}

export default Dash_2