import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const Portal = () => {
  return (
    <div className="min-h-screen grid grid-cols-12 gap-4 p-7">
      <div className="col-span-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>CheckIn</CardTitle>
            <CardDescription>
              CheckIn module for easy,fast checkin
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button>CheckIn</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Portal;
