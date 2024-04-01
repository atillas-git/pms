'use client'
import React, { useState } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { CircleEllipsis,CirclePlus, Search, X } from 'lucide-react';
import { Button } from '../ui/button'
import { Drawer, IconButton } from '@mui/material';
const ReservationPage = () => {
  const [drawerOpen,setDrawerOpen] = useState(false)
  const [activeStep,setActiveStep] = useState(0)

  const handleAddReservationClick = ()=>{
    setDrawerOpen(true)
    setActiveStep(1)
  }

  return (
    <div className='flex flex-col gap-3'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Portal</BreadcrumbItem>
          <BreadcrumbSeparator/>
          <BreadcrumbItem>Reservations</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className='flex justify-between'>
        <p className='font-semibold text-xl'>
          Reservations
        </p>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className='flex gap-2'>
                    <CircleEllipsis/>
                    Actions
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className = "flex gap-2" onClick={handleAddReservationClick}>
                    <CirclePlus/>
                    Add Reservation
                </DropdownMenuItem>
                <DropdownMenuItem className = "flex gap-2">
                    <Search/>
                    Search Reservations
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Drawer 
        open = {drawerOpen}
        anchor='right'
        onClose={()=>setDrawerOpen(false)}
        >
        <div className='w-[90vw] sm:w-[50vw] flex flex-col p-12'>
          <div id='header' className='flex items-center justify-between'>
            <p className='font-semibold text-xl'>
              {activeStep === 1 && "Add Reservations"}
            </p>
              <IconButton onClick={()=>setDrawerOpen(false)}>
                <X/>
              </IconButton>
          </div>
        </div>
      </Drawer>
    </div>
  )
}

export default ReservationPage