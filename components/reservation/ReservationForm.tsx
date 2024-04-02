
import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const ReservationForm = () => {
    const [voucherno,setVoucherNo] = useState("")
    const [description,setDescription] = useState("")
    const [startDate,setStartDate] = useState<Date>()
    const [endDate,setEndDate] = useState<Date>()
  return (
    <div className='grid grid-cols-2 gap-2 mt-2'>
        <div className='col-span-2 sm:col-span-1 flex flex-col gap-2'>
             <Label>Voucher No</Label>
             <Input/>
        </div>
        <div className='col-span-2 sm:col-span-1 flex flex-col gap-2'>
             <Label>Description</Label>
             <Input/>
        </div>
        <div className='col-span-2 sm:col-span-1 flex flex-col gap-2'>
             <Label>Start Date</Label>
             <Input/>
        </div>
        <div className='col-span-2 sm:col-span-1 flex flex-col gap-2'>
             <Label>End Date</Label>
             <Input/>
        </div>
        <div className='col-span-2 sm:col-span-1 flex flex-col gap-2'>
             <Label>Room Type</Label>
             <Input/>
        </div>
        <div className='col-span-2 sm:col-span-1 flex flex-col gap-2'>
             <Label>Price</Label>
             <Input/>
        </div>
        <div className='col-span-2 sm:col-span-1 flex flex-col gap-2'>
             <Label>Discount</Label>
             <Input/>
        </div>
        <div className='col-span-2 sm:col-span-1 flex flex-col gap-2'>
             <Label>Agency</Label>
             <Input/>
        </div>  
        <div className='col-span-2 flex items-end justify-end'>
            <Button>Save</Button>
        </div>
    </div>
  )
}

export default ReservationForm