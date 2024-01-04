const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const NoteController=require("../controllers/note");
const loggerMiddleware = require("../middlewares/loggerMiddleware");
const router = express.Router();

// /api/notes

// GET ROUTES
router.get('/',loggerMiddleware,authMiddleware,NoteController.getAllNotes)
router.get('/:id',loggerMiddleware,authMiddleware,NoteController.getNoteByNoteId)

// POST ROUTES
router.post('/',loggerMiddleware,authMiddleware,NoteController.addNote)
router.post('/:id/share',loggerMiddleware,authMiddleware,NoteController.shareNote)

// PUT ROUTES
router.put('/:id',loggerMiddleware,authMiddleware,NoteController.updateNote)

// DELETE ROUTES
router.delete('/:id',loggerMiddleware,authMiddleware,NoteController.deleteNote)


module.exports=router;