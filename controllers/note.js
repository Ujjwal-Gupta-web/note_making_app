const Note = require('../models/Note');
const User = require('../models/User');
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const logger=require('../utility/logger')

const NoteController = {

    getAllNotes: async (req, res) => {
        try {
            const notes = await Note.find({ author: req.user.id });
            const sharedWithMe =  await Note.find({ $and:[{allowedAccess: { $in: [req.user.id] }},{author:{$ne:req.user.id}}]}).select("-allowedAccess").populate({path:'author',select:'email'});
            return res.json({
                data: { notes:notes, sharedWithMe:sharedWithMe },
                tag: true
            })
        }
        catch (err) {
            logger.error(err);
            return res.json({ "message": err?.message, "tag": false })
        }
    },


    getNoteByNoteId: async (req, res) => {
        try {
            const note_id = req.params.id;
            let note = await Note.findOne({ _id: note_id, $or: [
                { author: req.user.id }, { allowedAccess: { $in: [req.user.id] } }
            ] }).populate({path:'author',select:'email'}).populate({path:'allowedAccess',select:'email'});
            if (!note) note = {};
            if((note.author._id.toString())!==(req.user.id)){
                note={
                    _id:note._id,title:note.title,desc:note.desc,author:note.author
                }
            }
            return res.json({ data: {note:note}, tag: true });
        }
        catch (err) {
            logger.error(err);
            return res.json({ "message": err?.message, "tag": false })
        }
    },


    addNote: async (req, res) => {
        try {
            const author = req.user.id;
            let allowedAccess = [];
            allowedAccess.push(author);
            const desc = req.body.desc;
            const title=req.body.title;
            const newNote = new Note({
                desc,title, author, allowedAccess
            })
            console.log(newNote);
            await newNote.save().then(() => {
                return res.json({ "data": newNote, "tag": true })
            }).catch(error => {
                logger.error(error);
                return res.json({
                    "error": error?.message, "tag": false
                })
            })
        }
        catch (err) {
            logger.error(err);
            return res.json({ "message": err?.message, "tag": false })
        }
    },


    updateNote: async (req, res) => {
        try {
            const note_id=req.params.id;
            const updatedDesc=req.body.desc;
            const updatedTitle=req.body.title;
            let updateToBeDone={};
            if(updatedTitle) updateToBeDone.title=updatedTitle;
            if(updatedDesc) updateToBeDone.desc=updatedDesc;
            await Note.findOneAndUpdate({_id:note_id,author: req.user.id}, updateToBeDone, {
                returnOriginal: false
              }).then((updatedNote) => {
                return res.json({ "data": updatedNote, "tag": true })
            }).catch(error => {
                logger.error(error);
                return res.json({
                    "error": error?.message, "tag": false
                })
            })
        }
        catch (err) {
            logger.error(err);
            return res.json({ "message": err?.message, "tag": false })
        }
    },


    deleteNote: async (req, res) => {
        try {
            const note_id=req.params.id;
            await Note.findOneAndDelete({_id:note_id,author: req.user.id}).then((note) => {
                if(note)
                    return res.json({ "message":"Note deleted", "tag": true })
                return res.json({ "message":"Note not found", "tag": false })
            }).catch(error => {
                logger.error(error);
                return res.json({
                    "error": error?.message, "tag": false
                })
            })
        }
        catch (err) {
            logger.error(err);
            return res.json({ "message": err?.message, "tag": false })
        }
    },


    shareNote: async (req, res) => {
        try {
            const note_id = req.params.id;
            const shareWithEmail = req.body.email;
            const note = await Note.findOne({ _id: note_id, author: req.user.id });
    
            if (!note) {
                return res.json({ tag: false, message: "Note not found or unauthorized" });
            }
    
            const shareWith = await User.findOne({ email: shareWithEmail });
    
            if (!shareWith) {
                return res.json({ tag: false, message: "User not found" });
            }
    
            const shareWithId = shareWith._id;
            const allowedAccess = note.allowedAccess;
    
            if (allowedAccess.includes(shareWithId.toString())) {
                return res.json({ tag: true, message: "Already shared" });
            }
    
            allowedAccess.push(shareWithId);
            note.allowedAccess = allowedAccess;
    
            // Update note
            await note.save();
    
            // Send response after updating the note
            return res.json({ data: note, message: "Note shared", tag: true });
        } catch (err) {
            logger.error(err);
            return res.json({ message: err?.message, tag: false });
        }
    }
}

module.exports = NoteController;



