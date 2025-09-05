import React from 'react'
import Navbar from '../components/ui/Navbar'
import ActiveAlerts from '../components/ui/Active-alert'
import Pannel from '../components/Pannel'
import TrafficDashboard from '../components/ui/Dashboard'
function Home() {
  return (
    <div className=' w-full bg-[#0A0D14] border-gray-600 border-1 text-white flex flex-row '>
      <Navbar/>
      <div className='w-full p-2 flex flex-col gap-4'>
        <Pannel />
      <TrafficDashboard />
      </div>
      </div>
  )
}

export default Home