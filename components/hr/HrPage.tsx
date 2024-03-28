'use client'
import React, { useState } from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button'
import { 
    Table ,
    User,
    BookUser,
    CircleEllipsis,
    X
} from 'lucide-react';
import EmployeeForm from './EmployeeForm'
import { Drawer, IconButton } from '@mui/material'
import BulkImportEmployeeForm from './BulkImportEmployeeForm'
const HrPage = () => {
    const [sheetOpen,setSheetOpen] = useState(false)
    const [activeStep,setActiveStep] = useState(0)

    const handleAddEditEmployee = ()=>{
        setSheetOpen(true)
        setActiveStep(0)
    }

    const handleBulkImport = ()=>{
        setSheetOpen(true)
        setActiveStep(1)
    }

  return (
    <div className='flex flex-col gap-2'>
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href='/portal'>Portal</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem>
                    <BreadcrumbLink href='/portal/hr'>Hr</BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <div className='flex justify-between items-center'>
            <p className='font-semibold'>Human Resources</p>
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
                    <DropdownMenuItem className='flex gap-2 cursor-pointer' onClick={handleAddEditEmployee}>
                        <Table/>
                        Export to Excel
                    </DropdownMenuItem>
                    <DropdownMenuItem className='flex gap-2 cursor-pointer' onClick={handleAddEditEmployee}>
                        <User/>
                        Add Employee
                    </DropdownMenuItem>
                    <DropdownMenuItem className='flex gap-2 cursor-pointer' onClick={handleBulkImport}>
                        <BookUser/>
                        Bulk Import Employees
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <Drawer open = {sheetOpen} anchor='right' onClose={()=>setSheetOpen(false)}>
            <div className='w-[90vw] p-12 sm:w-[40vw]'>
                <div className='flex items-center justify-between'>
                    <div className='flex flex-col'>
                       {
                        activeStep === 0 &&  <p className='text-xl font-semibold'>Add - Edit Employee</p>
                       }
                       {
                        activeStep === 1 && <p className='text-xl font-semibold'>Bulk Import Employees</p>
                       }
                    </div>
                    <div>
                        <IconButton onClick={()=>setSheetOpen(false)}>
                            <X/>
                        </IconButton>
                    </div>
                </div>
                <small>
                    {activeStep === 0 && "You can add, edit your employee details from here."}
                </small>
                <div id='drawerContent'>
                    {activeStep === 0 && <EmployeeForm/>}
                    {activeStep === 1 && <BulkImportEmployeeForm/>}
                </div>
            </div>
        </Drawer>
    </div>
  )
}

export default HrPage