import mongoose from "@/lib/mongodb";

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    supervisorId: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
    description: {
      type: String,
    },
    img: {
      type: String,
    },
    parentGroup: {
      type: String,
    },
    permissions: {
      type: [String],
    },
  },
  { timestamps: true },
);

export default mongoose.models.Group || mongoose.model("Group", groupSchema);
