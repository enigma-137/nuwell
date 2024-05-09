import { Button } from '@/components/ui/button'
import { SignIn, SignInButton, SignOutButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'

const page = async () => {

  const user = await currentUser()
  return (
    <div className='flex justify-evenly pt-4'>
      {/* {user ?  <SignOutButton /> : <SignInButton />} */}
    
      {user ?
   <Button  >
    <Link href="/dashboard">  Dashboard</Link>
   
   </Button> : <SignInButton />
       
       }
      
    </div>
  )
}

export default page