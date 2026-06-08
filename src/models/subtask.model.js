import { Schema } from "mongoose";

const subTaskSchema = new Schema(
  {
    title: {
      type: string,
      required: true,
      trim: true,
    },
    task: {
      type: SchemaTypes.ObjectId,
      ref: "Task",
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps },
);

export const Subtask = mongoose.model("subtask", subTaskSchema);
