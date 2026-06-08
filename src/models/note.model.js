import { Schema } from "mongoose";

const projectNoteSchema = new Schema(
  {
    project: {
      type: SchemaTypes.ObjectId,
      ref: "Project",
      required: true,
    },
    createdBy: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps },
);

export const projectNote = mongoose.model("ProjectNote", projectNoteSchema);
