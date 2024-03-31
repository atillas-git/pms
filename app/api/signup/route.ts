import Employee from "@/models/Employee";
import { genSalt, hash } from "bcryptjs";

export async function POST(request: Request) {
  try {
    type Req = {
      username: string;
      password: string;
      email: string;
    };
    const body: Req = await request.json();
    const salt = await genSalt(10);
    const hashedPassword = await hash(body.password, salt);

    const employee = new Employee({
      username: body.username,
      password: hashedPassword,
      email: body.email,
    });

    await employee.save();

    return new Response("Success!", {
      status: 200,
    });
  } catch (error) {
    return new Response("Internal server error!", {
      status: 500,
    });
  }
}
