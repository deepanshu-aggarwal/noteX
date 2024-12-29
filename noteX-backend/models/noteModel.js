import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("notes", noteSchema);
export default Note;