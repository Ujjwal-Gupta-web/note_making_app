// GET /api/notes: get a list of all notes for the authenticated user.
// GET /api/notes/:id: get a note by ID for the authenticated user.
// POST /api/notes: create a new note for the authenticated user.
// PUT /api/notes/:id: update an existing note by ID for the authenticated user.
// DELETE /api/notes/:id: delete a note by ID for the authenticated user.
// POST /api/notes/:id/share: share a note with another user for the authenticated user.
// GET /api/search?q=:query: search for notes based on keywords for the authenticated user.

const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get('/api/notes',authMiddleware,NoteController.getAllNotes)
router.get('/api/notes/:id',authMiddleware,NoteController.getNoteByNoteId)
router.post('/api/notes',authMiddleware,NoteController.addNote)
router.put('/api/notes/:id',authMiddleware,NoteController.updtateNote)
router.delete('/api/notes/:id',authMiddleware,NoteController.deleteNote)
router.post('/api/notes/:id/share',authMiddleware,NoteController.shareNote)

module.exports=router;