import React from "react";
import car from '../../assets/car.svg'
function Navbar_2() {
  return (
    <div className="flex justify-between  bg-[#0c082c] min-w-[16%]    p-2   font-[roboto] rounded-md border-gray-600 ">
      <div className="flex gap-1.5 border-b-gray-600 text-white text-md border-1 border-t-0 border-l-0 border-r-0 w-100% p-0">
        <img src={car} alt="car" />
        <h2>TRAFFIC FLOW</h2>
      </div>
      <div className="italic font-[roboto]  flex  gap-3 text-md text-white">
        <a href="" className="flex gap-1">
          Dashboard
        </a>
        <a href="" className="flex gap-1">
          Live location
        </a>
        <a href="" className="flex gap-1">
          Incidents
        </a>
        <a href="" className="flex gap-1">
          Analytics
        </a>
        <a href="" className="flex gap-1">
          Traffic lights
        </a>
      </div>
      <div className="flex   gap-3 text-md ">
        <a className="text-red-500" href="">
          LOG OUT
        </a>
        <a className="text-white" href="">
          HELP
        </a>
      </div>
    </div>
  );
}

export default Navbar_2;
