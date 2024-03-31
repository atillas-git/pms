import React from 'react'
import { ShieldAlert } from 'lucide-react';
import Link from 'next/link';
const InvalidPermissions = () => {
  return (
    <div className='h-screen flex items-center justify-center'>
        <div className='flex flex-col gap-3 items-center justify-center'>
            <ShieldAlert className='w-14 h-14 text-red-600'/>
            <p>You do not have enough permissions to view this page!</p>
            <small>Please talk to your administrator</small>
            <Link href={"/portal"} className='bg-zinc-400 px-4 py-2 text-zinc-50 rounded-md'>Please return to the Portal</Link>
        </div>
    </div>
  )
}

export default InvalidPermissions