const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const NoteController=require("../controllers/note")
const router = express.Router();

// /api/notes

// GET ROUTES
router.get('/',authMiddleware,NoteController.getAllNotes)
router.get('/:id',authMiddleware,NoteController.getNoteByNoteId)

// POST ROUTES
router.post('/',authMiddleware,NoteController.addNote)
router.post('/:id/share',authMiddleware,NoteController.shareNote)

// PUT ROUTES
router.put('/:id',authMiddleware,NoteController.updateNote)

// DELETE ROUTES
router.delete('/:id',authMiddleware,NoteController.deleteNote)


module.exports=router;