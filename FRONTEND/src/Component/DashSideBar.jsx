import React, { useEffect, useState } from 'react'
import {Link, useLocation} from 'react-router-dom'
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUser} from "react-icons/hi";


const DashSideBar = () => {
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
    <Sidebar className='w-full md:min-w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
            <Link to='/Dashboard?tab=profile'>
            <Sidebar.Item  icon={HiUser} active={tab==='profile'}  label="User" labelColor="dark" as="div">
            Profile
          </Sidebar.Item>
            </Link>
          
          <Sidebar.Item  icon={HiArrowSmRight} className='cursor-pointer' as="div"> 
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSideBar

