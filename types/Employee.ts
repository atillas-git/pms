import mongoose from "@/lib/mongodb";
export type TEmployee = {
  _id: string;
  username: string;
  email: string;
  image: string;
  password: string;
  permissions: string[];
  groupIds: mongoose.Types.ObjectId[];
};
