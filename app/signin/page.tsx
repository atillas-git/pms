"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { useState } from "react";
import { Hotel, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
const Signin = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { toast } = useToast();

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      return toast({
        title: "Invalid Credentials!",
        description: "Please check your credentials!",
        variant: "destructive",
      });
    }
    setLoading(true);
    await signIn("credentials", {
      email: email,
      password: password,
      callbackUrl: "/portal",
    });
    setLoading(false);
  };

  return (
    <div className="bg-zinc-900 h-screen flex items-center justify-center">
      <div className="min-w-[20rem] sm:min-w-[50rem] min-h-[20rem] bg-white rounded-md p-5 grid grid-cols-12 gap-3">
        <div className="col-span-7 flex flex-col gap-1 items-center justify-center">
          <form className="flex flex-col gap-2 w-full" onSubmit={handleSignin}>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button disabled={loading} type="submit" className="flex gap-2">
              {loading && <Loader2 className="animate-spin" />}
              Signin
            </Button>
            <div className="flex mt-5  items-center  gap-2 text-center w-full">
              <small>Do not have an account?</small>
              <Link href={"/signup"} className="text-sm underline">
                Signup
              </Link>
            </div>
          </form>
        </div>
        <div className="col-span-5 flex flex-col gap-2 justify-center items-center border-l-2">
          <Hotel className="w-20 h-20" />
          <p className="font-semibold">Bellis Portal</p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
