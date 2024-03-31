import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Autocomplete, TextField } from "@mui/material";
import { explainedPermissions } from "@/config/permissions";
import { useToast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { TEmployee } from "@/types/Employee";
import { useSession } from "next-auth/react";
import { NSession } from "@/lib/authConfig";

interface IProps {
  employee?: TEmployee | null;
  setSheetOpen :React.Dispatch<React.SetStateAction<boolean>>
}

const EmployeeForm = ({ employee ,setSheetOpen}: IProps) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [permissions, setPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { toast } = useToast();

  const {data,status} = useSession();

  const userpermissions :string [] = data ? (data as NSession).permissions : []

  const isPermissionAuth  = userpermissions.filter((permission:string)=>["administrator","hr.manager"].includes(permission)).length>0
  useEffect(() => {
    if (employee) {
      setUsername(employee.username);
      setEmail(employee.email);
      setPermissions(employee.permissions);
    }
  }, [employee]);

  const generatePassword = () => {
    let charset = "";
    let newPassword = "";
    charset += "!@#$%^&*()";
    charset += "0123456789";
    charset += "abcdefghijklmnopqrstuvwxyz";
    charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < 25; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  };


  const handleEmployeeSave = ()=>{
    if(employee){
      return handleEmployeeUpdate()
    }
    return handleEmployeeAdd()
  }

  const handleEmployeeAdd = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/hr/employee", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
          permissions: permissions,
        }),
      });
      if (res.ok) {
        setEmail("");
        setPassword("");
        setUsername("");
        router.refresh();
        setSheetOpen(false)
        return toast({
          title: "Saved Successfully!",
        });
      } else {
        toast({
          title: "Invalid Credentials!",
          description: "Please check your credentials!",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeUpdate = async()=>{
    setLoading(true);
    try {
      const res = await fetch("/api/hr/employee", {
        method: "PUT",
        body: JSON.stringify({
          _id:employee?._id,
          username: username,
          permissions: permissions,
        }),
      });
      if (res.ok) {
        router.refresh();
        setSheetOpen(false)
        return toast({
          title: "Saved Successfully!",
        });
      } else {
        toast({
          title: "Invalid Credentials!",
          description: "Please check your credentials!",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-2 gap-2 mt-4">
      <div className="col-span-2 sm:col-span-1 flex flex-col gap-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
      </div>
      <div className="col-span-2 sm:col-span-1 flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          value={email}
          disabled = {employee ? employee?.email !== undefined || employee?.email !== null : false}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
      </div>
      <div className="col-span-2 sm:col-span-1 flex flex-col gap-2">
        <Label htmlFor="username">Password</Label>
        <div className="flex gap-2">
          <Input
            type="text"
            disabled={employee ? true : false}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant={"outline"}
            disabled={employee ? true : false}
            onClick={generatePassword}
          >
            Auto Generate
          </Button>
        </div>
       {
        employee &&  <small className="text-red-400">Passwords can not be changed once they are asssigned to the users!</small>
       }
      </div>
      <div className="col-span-2 sm:col-span-1 flex flex-col gap-2">
        <Label htmlFor="username">Permissions</Label>
        <Autocomplete
          multiple
          disabled = {status === "loading" || !isPermissionAuth}
          onChange={(e, values) =>
            setPermissions([...values.map((value) => value.value)])
          }
          options={explainedPermissions}
          value={explainedPermissions.filter((permission)=>permissions.includes(permission.value))}
          renderInput={(params) => (
            <TextField {...params} size="small" defaultValue={permissions} />
          )}
        />
      </div>
      <div className="col-span-2 flex justify-end mt-4">
        <Button disabled={loading} onClick={handleEmployeeSave}>
          {loading && <Loader2 className="animate-spin" />}
          Save
        </Button>
      </div>
    </div>
  );
};

export default EmployeeForm;
