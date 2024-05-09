import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { MessageCircleDashed, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='flex justify-around'>
     {/* <Button>  <Link href="/dashboard/chat">Chat <MessageCircleDashed /></Link>  </Button> 
     <Button variant="ghost"> <Link href="/dashboard/profile"> <User /></Link>
</Button>   */}
    </div>

   
  )
}

export default page