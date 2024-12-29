import Note from "../models/noteModel.js";

export const getOneNoteController = async (req, res) => {
  const noteId = req.params.id;

  if (!noteId) {
    return res.status(400).send({ message: "Note id is required" });
  }

  try {
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).send({ message: "Note not found" });
    } else if (note.creatorId.toString() !== req.user.id) {
      return res.status(401).send({ message: "Unauthorized access" });
    }

    return res.status(200).send({
      success: true,
      message: "Note fetched successfully",
      note,
    });

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in fetching note",
      error,
    });
  }
};

export const createNoteController = async (req, res) => {
  const { title, content, isFavorite } = req.body;
  if (!title) {
    return res.status(400).send({ message: "Title is required" });
  } else if (!content) {
    return res.status(400).send({ message: "Content is required" });
  }

  try {
    const note = await Note.create({
      title,
      content,
      isFavorite,
      creatorId: req.user.id,
    });

    return res.status(201).send({
      success: true,
      message: "Note created successfully",
      note,
    });

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in creating note",
      error,
    });
  }
};

export const updateNoteController = async (req, res) => {
  const { noteId } = req.body;

  if (!noteId) {
    return res.status(400).send({ message: "Note id is required" });
  }

  try {
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).send({ message: "Note not found" });
    } else if (note.creatorId.toString() !== req.user.id) {
      return res.status(401).send({ message: "Unauthorized access" });
    }

    await Note.findByIdAndUpdate(noteId, {
      title: req.body.title || note.title,
      content: req.body.content || note.content,
      isFavorite: req.body.isFavorite || note.isFavorite,
    });

    return res.status(200).send({
      success: true,
      message: "Note updated successfully",
      note,
    });

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in updating note",
      error,
    });
  }
};

export const deleteNoteController = async (req, res) => {
  const noteId = req.params.id;

  if (!noteId) {
    return res.status(400).send({ message: "Note id is required" });
  }

  try {
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).send({ message: "Note not found" });
    } else if (note.creatorId.toString() !== req.user.id) {
      return res.status(401).send({ message: "Unauthorized access" });
    }

    await Note.deleteOne({ _id: noteId });

    return res.status(200).send({
      success: true,
      message: "Note deleted successfully",
    });

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in deleting note",
      error,
    });
  }
};

export const getAllNotesController = async (req, res) => {
  try {
    const notes = await Note.find({ creatorId: req.user.id });

    return res.status(200).send({
      success: true,
      message: "Notes fetched successfully",
      notes,
    });

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in fetching notes",
      error,
    });
  }
};