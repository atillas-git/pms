'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import React, { useState } from 'react'
import { Hotel, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

const Signup = () => {
    const [loading,setLoading] = useState(false)
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [repass,setRepass] = useState("")
    const [username,setUsername] = useState("")

    const router = useRouter()

    const { toast } = useToast()
    
    const handleSignup = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(!email || !password || password !== repass || !username){
            return toast({
                title:"Invalid Credentials!",
                description:"Please check your credentials!",
                variant:"destructive"
            })
        }
        setLoading(true)
        try {
            const res = await fetch("/api/signup",
            {
                method:"POST",
                body:JSON.stringify({
                    email:email,
                    username:username,
                    password:password
                })
            })
            if(res.ok){
                router.replace("/signin")
                toast({
                    title:"Sucess!",
                    description:"New user has been registered!"
                })
            }
            else{
                toast({
                    title:"Invalid Credentials!",
                    description:"Please check your credentials!",
                    variant:"destructive"
                })
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className='bg-zinc-900 h-screen flex items-center justify-center'>
        <div className='min-w-[20rem] sm:min-w-[50rem] min-h-[20rem] bg-white rounded-md p-5 grid grid-cols-12 gap-3'>
            <div className='col-span-7 flex flex-col gap-1 items-center justify-center'>
                <form className='flex flex-col gap-2 w-full' onSubmit={handleSignup}>
                    <Label htmlFor='email'>Email</Label>
                    <Input 
                        id='email' 
                        onChange={(e)=>setEmail(e.target.value)} 
                        value={email}
                        type='email'
                        />

                    <Label htmlFor='username'>Username</Label>
                    <Input id='username' onChange={(e)=>setUsername(e.target.value)} value={username}/>

                    <Label htmlFor='password'>Password</Label>
                    <Input id='password' type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>

                    <Label htmlFor='repassword'>Re Enter Password</Label>
                    <Input id='repassword' type='password' value={repass} onChange={(e)=>setRepass(e.target.value)}/>

                    <Button disabled = {loading} className='flex gap-2'>
                        {
                            loading && <Loader2 className='animate-spin'/>
                        }
                        Signup
                    </Button>
                    <div className='flex mt-5  items-center  gap-2 text-center w-full'>
                        <small>Already have an account?</small>
                        <Link href={"/signin"} className='text-sm underline'>Signin</Link>
                    </div>
                </form>
            </div>
            <div className='col-span-5 flex flex-col gap-2 justify-center items-center border-l-2'>
                <Hotel className='w-20 h-20'/>
                <p className='font-semibold'>Bellis Portal</p>
            </div>
        </div>
    </div>
  )
}

export default Signup