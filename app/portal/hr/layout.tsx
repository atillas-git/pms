import InvalidPermissions from "@/components/shared/InvalidPermissions";
import authConfig, { NSession } from "@/lib/authConfig";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const HrLayout = async ({ children }: { children: React.ReactNode }) => {
  const session: NSession | null = await getServerSession(authConfig);
  if (!session) {
    redirect("/signin");
  }
  const isAuthenticated =
    session.permissions.filter((permission: string) =>
      ["hr.employee", "hr.manager", "administrator"].includes(permission),
    ).length > 0;

  return <div>{isAuthenticated ? children : <InvalidPermissions />}</div>;
};

export default HrLayout;
