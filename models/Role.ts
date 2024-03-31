import mongoose from "@/lib/mongodb";

const role = new mongoose.Schema(
  {
    roleString: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Role || mongoose.model("Role", role);
