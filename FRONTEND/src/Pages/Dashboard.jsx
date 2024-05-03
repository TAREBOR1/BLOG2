import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import DashSideBar from '../Component/DashSideBar';
import DashProfile from '../Component/DashProfile';

const Dashboard = () => {
  const location=useLocation();
  const [tab,setTab]=useState('')
  useEffect(()=>{
    const urlParams= new URLSearchParams(location.search)
    const tabfromUrl= urlParams.get('tab');
  if(tabfromUrl){
    setTab(tabfromUrl)
  }
  },[location
  .search])
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
   <div className='md:w-56'>
    {/* sidebar */}
    <DashSideBar/>
   </div>
   <div className='max-w-lg mx-auto p-3 w-full'>
   {/* profile.... */}
   {tab==='profile' && <DashProfile/>}
   </div>
    </div>
  )
}

export default Dashboard
