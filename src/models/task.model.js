import { Schema, SchemaTypes } from "mongoose";
import { AvailableTaskStatues, TaskStatusENum } from "../utils/constants.js";

const taskSchema = new Schema(
  {
    title: {
      type: string,
      required: true,
      trim: true,
    },
    description: string,
    project: {
      type: SchemaTypes.ObjectId,
      ref: "Project",
      required: true,
    },
    assignedTo: {
      type: SchemaTypes.ObjectId,
      ref: "User",
    },
    assignedBy: {
      type: SchemaTypes.ObjectId,
      ref: "User",
    },
    status: {
      type: string,
      enum: AvailableTaskStatues,
      default: TaskStatusENum.TODO,
    },
    attachment: {
      type: [
        {
          url: string,
          nimetype: String,
          size: Number,
          default: [],
        },
      ],
    },
  },
  { timestamps },
);

export const tasks = mongoose.model("task", taskSchema);
