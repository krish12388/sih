import React from 'react'
import car from '../../assets/car.svg'
import map from '../../assets/live-location.svg'
import dash from '../../assets/dashboard.svg'
import caution from '../../assets/incident.svg'
import analytics from '../../assets/analytics.svg'
function Navbar() {
  
  return (
    <div className='bg-[#0d1117] min-w-[16%]  flex flex-col   p-1  gap-10 text-gray-400 font-[roboto] border-r-1 border-gray-600 '>
    <div className='flex gap-1.5 border-b-gray-600 border-1 border-t-0 border-l-0 border-r-0 w-100% p-0'><img src={car} alt="car" /><h2>TRAFFIC FLOW</h2></div>
    <h2 className='italic font-sans font-extrabold'>NAVIGATION</h2>
    <div className='italic font-[roboto] h-[50%] flex flex-col gap-3 text-md text-white'>
      <a href="" className='flex gap-1'><img src={dash} alt="dashboard" />Dashboard</a>
      <a href="" className='flex gap-1'><img src={map} alt="location" />Live location</a>
      <a href="" className='flex gap-1'><img src={caution} alt="incident" />Incidents</a>
      <a href="" className='flex gap-1'><img src={analytics} alt="analytics" />Analytics</a>
      <a href="" className='flex gap-1'><img src={car} alt="car" />Traffic lights</a>
      </div>
      <div className='flex flex-col h-[30%] gap-3 text-md '>
        <a className='text-red-500' href="">LOG OUT</a>
        <a className='text-white' href="">HELP</a>
      </div>
      <div className='text-gray-200 border-gray-600 border-1 border-l-0 border-r-0 border-b-0 flex items-center justify-center p-4'>
        <h3 >System online</h3>
      </div>
      </div>
  )
}

export default Navbar