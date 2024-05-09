"use client"

import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'



const routes = [
    {
        name: "Chat",
        path: "/dashboard/chat"
    },
    {
        name: "Profile",
        path: "/dashboard/profile"
    }
]

const Navbar = () => {

    const pathname = usePathname();

  return (
    <div className='p-4 flex flex-row justify-between items-center bg-primary text-white'>
        <Link href="/">

            <h1 className='text-2xl font-bold'>NuWell</h1>
        </Link>

        <div className='flex flex-row gap-x-6 text-lg items-center'>
          
           {routes.map((route, index) => (
          <Link key={index} href={route.path}
          className={pathname === route.path ? "border-b-2 border-white hover:border-b-white" : "border-none"}
          
          
          >{route.name}</Link>
           ))}
           <UserButton /> 
        </div>
    </div>
  )
}

export default Navbar