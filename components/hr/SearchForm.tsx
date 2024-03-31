import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { explainedPermissions } from '@/config/permissions'
import { Autocomplete, TextField } from '@mui/material'
import { Button } from '../ui/button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const SearchForm = () => {
    const [email,setEmail] = useState("")
    const [username,setUsername] = useState("")
    const [permissions,setPermissions] = useState<string []>([])

    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(()=>{
        const searchP = new URLSearchParams(searchParams.toString())
        setEmail(searchP.get("email") || "")
        setUsername(searchP.get("username") || "")
        setPermissions(searchP.get("permissions")?.split(",") || [])
    },[searchParams])

    const handleSearchClick = ()=>{
        const searchPar = new URLSearchParams(searchParams.toString())
        searchPar.set("email",email)
        searchPar.set("username",username)
        searchPar.set("permissions",permissions.toString())
        router.replace(`${pathname}?${searchPar.toString()}`)
    }

    const handleClearClick = ()=>{
        setEmail("")
        setUsername("")
        setPermissions([])
        router.replace(`${pathname}`)
    }

    return (
    <div className='grid grid-cols-2 gap-2 mt-3'>
        <div className='col-span-2 flex flex-col gap-2 sm:col-span-1'>
            <Label htmlFor='username'>Username</Label>
            <Input 
                id='username' 
                value={username} 
                onChange={(e)=>setUsername(e.target.value)}
            />
        </div>
        <div className='col-span-2 flex flex-col gap-2 sm:col-span-1'>
            <Label htmlFor='email'>Email</Label>
            <Input
                id='email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
        </div>
        <div className='col-span-2 flex flex-col gap-2 sm:col-span-1'>
            <Label htmlFor="username">Permissions</Label>
            <Autocomplete
                multiple
                onChange={(e, values) =>
                    setPermissions([...values.map((value) => value.value)])
                }
                options={explainedPermissions}
                value={explainedPermissions.filter((permission) =>
                    permissions.includes(permission.value),
                )}
                renderInput={(params) => (
                    <TextField {...params} size="small" defaultValue={permissions} />
                )}
            />
        </div>
        <div className='col-span-2 flex gap-2 items-end justify-end'>
            <Button variant={"outline"} onClick={handleClearClick}>Clear</Button>
            <Button onClick={handleSearchClick}>Search</Button>
        </div>
    </div>
  )
}

export default SearchForm