import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Autocomplete, TextField } from '@mui/material'
import { explainedPermissions } from '@/config/permissions'

const EmployeeForm = () => {
  return (
    <div className='grid grid-cols-2 gap-2 mt-4'>
      <div className='col-span-2 sm:col-span-1 flex flex-col gap-2'>
        <Label htmlFor='username'>Username</Label>
        <Input type='text'/>
      </div>
      <div className='col-span-2 sm:col-span-1 flex flex-col gap-2'>
        <Label htmlFor='username'>Email</Label>
        <Input type='email'/>
      </div>
      <div className='col-span-2 sm:col-span-1 flex flex-col gap-2'>
        <Label htmlFor='username'>Password</Label>
        <div className='flex gap-2'>
          <Input/>
          <Button variant={'outline'}>Auto Generate</Button>
        </div>
      </div>
      <div className='col-span-2 sm:col-span-1 flex flex-col gap-2'>
        <Label htmlFor='username'>Permissions</Label>
        <Autocomplete
          options={explainedPermissions}
          renderInput={(params)=><TextField  {...params} size='small'/>}
        />
      </div>
      <div className='col-span-2 flex justify-end mt-4'>
        <Button>Save</Button>
      </div>
    </div>
  )
}

export default EmployeeForm