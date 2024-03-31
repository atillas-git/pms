import authConfig, { NSession } from "@/lib/authConfig";
import mongoose from "@/lib/mongodb";
import Employee from "@/models/Employee";
import Role from "@/models/Role";
import { genSalt, hash } from "bcryptjs";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  try {
    const session: NSession | null = await getServerSession(authConfig);
    if (!session) {
      throw new Error("Invalid Session!");
    }
    if (
      session &&
      session.permissions &&
      session.permissions.filter((permission: string) =>
        ["hr.employee", "hr.manager"].includes(permission),
      ).length <= 0
    ) {
      throw new Error("Invalid Permssions");
    }
    type Request = {
      username: string;
      email: string;
      password: string;
      permissions: string[];
    };
    const body: Request = await request.json();
    const permissions = await Role.find({});
    const salt = await genSalt(10);
    const newPassword = await hash(body.password, salt);

    const userPermssions: string[] = permissions
      .filter((permission) => body.permissions.includes(permission.roleString))
      .map((permission) => permission.roleString);

    const employee = new Employee({
      username: body.username,
      email: body.email,
      password: newPassword,
      permissions: userPermssions,
    });
    await employee.save();
    return new Response("Success!", {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
}

export async function PUT(request: Request) {
  try {
    const session: NSession | null = await getServerSession(authConfig);
    if (!session) {
      throw new Error("Invalid Session!");
    }
    if (
      session &&
      session.permissions &&
      session.permissions.filter((permission: string) =>
        ["hr.manager", "administrator"].includes(permission),
      ).length <= 0
    ) {
      throw new Error("Invalid Permssions");
    }
    type Request = {
      _id: string;
      username: string;
      permissions: string[];
    };
    const body: Request = await request.json();
    const permissions = await Role.find({});

    const userPermssions: string[] = permissions
      .filter((permission) => body.permissions.includes(permission.roleString))
      .map((permission) => permission.roleString);

    await Employee.findByIdAndUpdate(body._id, {
      username: body.username,
      permissions: userPermssions,
    });

    return new Response("Success!", {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
}

export async function DELETE(request: Request) {
  try {
    const session: NSession | null = await getServerSession(authConfig);
    console.log(session);
    if (!session) {
      throw new Error("Invalid Session!");
    }
    if (
      session &&
      session.permissions &&
      session.permissions.filter((permission: string) =>
        ["hr.manager"].includes(permission),
      ).length <= 0
    ) {
      throw new Error("Invalid Permssions");
    }
    type Request = {
      userId: string | mongoose.Types.ObjectId;
    };
    const body: Request = await request.json();

    const employee = await Employee.findByIdAndDelete(body.userId);
    return new Response(JSON.stringify(employee), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
}
