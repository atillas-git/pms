import HrPage from "@/components/hr/HrPage";
import Employee from "@/models/Employee";
import { TEmployee } from "@/types/Employee";
import React from "react";

interface IProps {
  searchParams: SearchParams;
}

interface SearchParams {
  id?: string;
  username?: string;
  email?: string;
  page?: string;
}

const Hr = async ({ searchParams }: IProps) => {
  let skip = (parseInt(searchParams["page"] || "1") - 1) * 7;

  let payload: SearchParams = {
    id: searchParams["id"],
    username: searchParams["username"],
    email: searchParams["email"],
  };

  Object.keys(payload).forEach(
    (key) =>
      payload[key as keyof SearchParams] === undefined &&
      delete payload[key as keyof SearchParams],
  );

  const employees: TEmployee[] = await Employee.find(payload)
    .skip(skip)
    .limit(7);
  const query = await Employee.countDocuments(payload);
  const pageCount = Math.ceil(query / 7);

  return (
    <div className="p-7 sm:p-12 h-full">
      <HrPage employees={employees} pageCount={pageCount} />
    </div>
  );
};

export default Hr;
