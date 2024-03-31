"use client";
import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  User,
  BookUser,
  CircleEllipsis,
  X,
  Loader2,
  BookOpen,
} from "lucide-react";
import EmployeeForm from "./EmployeeForm";
import { Drawer, IconButton } from "@mui/material";
import BulkImportEmployeeForm from "./BulkImportEmployeeForm";
import { TEmployee } from "@/types/Employee";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "../ui/pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import NoContent from "../shared/NoContent";
import { SessionProvider } from "next-auth/react";

interface IProps {
  employees: TEmployee[];
  pageCount: number;
}

const HrPage = ({ employees, pageCount }: IProps) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [employee, setSelectedEmployee] = useState<TEmployee | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const handleAddEditEmployee = () => {
    setSheetOpen(true);
    setActiveStep(0);
  };

  const handleBulkImport = () => {
    setSheetOpen(true);
    setActiveStep(1);
  };

  const handleEditClick = (employee: TEmployee) => {
    setSheetOpen(true);
    setActiveStep(0);
    setSelectedEmployee(employee);
  };

  const handleDeleteEmployee = async (employeeId: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/hr/employee", {
        method: "DELETE",
        body: JSON.stringify({
          userId: employeeId,
        }),
      });
      if (res.ok) {
        toast({
          title: "Employee has been successfully deleted!",
        });
        router.refresh();
      } else {
        toast({
          title: "Employee could not be deleted!",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 h-full">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/portal">Portal</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/portal/hr">Hr</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-between items-center">
        <p className="font-semibold">Human Resources</p>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex gap-2">
                <CircleEllipsis />
                Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex gap-2 cursor-pointer"
                onClick={handleAddEditEmployee}
              >
                Export to Excel
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex gap-2 cursor-pointer"
                onClick={handleAddEditEmployee}
              >
                <User />
                Add Employee
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex gap-2 cursor-pointer"
                onClick={handleBulkImport}
              >
                <BookUser />
                Bulk Import Employees
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Drawer
        open={sheetOpen}
        anchor="right"
        onClose={() => setSheetOpen(false)}
      >
        <div className="w-[90vw] p-12 sm:w-[40vw]">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              {activeStep === 0 && (
                <p className="text-xl font-semibold">Add - Edit Employee</p>
              )}
              {activeStep === 1 && (
                <p className="text-xl font-semibold">Bulk Import Employees</p>
              )}
            </div>
            <div>
              <IconButton onClick={() => setSheetOpen(false)}>
                <X />
              </IconButton>
            </div>
          </div>
          <small>
            {activeStep === 0 &&
              "You can add, edit your employee details from here."}
          </small>
          <div id="drawerContent">
            {activeStep === 0 && <SessionProvider><EmployeeForm employee={employee} setSheetOpen = {setSheetOpen}/></SessionProvider>}
            {activeStep === 1 && <BulkImportEmployeeForm />}
          </div>
        </div>
      </Drawer>
      {employees && employees.length > 0 ? (
        <>
          <Table className="overflow-x-auto rounded-md">
            <TableCaption>List of your employees</TableCaption>
            <TableHeader className="bg-zinc-800 rounded-md">
              <TableRow>
                <TableHead className="text-zinc-50">Username</TableHead>
                <TableHead className="text-zinc-50">Email</TableHead>
                <TableHead className="text-zinc-50">Image</TableHead>
                <TableHead className="text-zinc-50">Permissions</TableHead>
                <TableHead className="text-zinc-50">Options</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => {
                return (
                  <TableRow key={employee._id}>
                    <TableCell>{employee.username}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.image}</TableCell>
                    <TableCell>
                      {employee.permissions && employee.permissions.length > 0
                        ? employee.permissions.join(",")
                        : ""}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        variant={"ghost"}
                        onClick={() => handleEditClick(employee)}
                      >
                        Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">Delete</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete the employees data from our
                              servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              asChild
                              className="bg-destructive hover:bg-destructive"
                            >
                              <Button
                                variant={"destructive"}
                                onClick={() =>
                                  handleDeleteEmployee(employee._id)
                                }
                              >
                                {loading && (
                                  <Loader2 className="animate-spin" />
                                )}
                                Continue
                              </Button>
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Pagination maxPageCount={pageCount} />
        </>
      ) : (
        <NoContent
          icon={<BookOpen className="h-14 w-14" />}
          label="Oops! Looks like this place is empty."
          description="Please add an employee or make a search."
        />
      )}
    </div>
  );
};

export default HrPage;
