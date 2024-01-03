const Note = require('../models/Note');
const User = require('../models/User');
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const NoteController = {

    getAllNotes: async (req, res) => {
        try {
            const notes = await User.find({ author: req.user.id });
            const sharedWithMe = await User.find({ allowedAccess: { $contains: req.user.id } });
            return res.json({
                data: { notes, sharedWithMe },
                tag: true
            })
        }
        catch (err) {
            return res.json({ "message": err, "tag": false })
        }
    },


    getNoteByNoteId: async (req, res) => {
        try {
            const note_id = req.params.id;
            let note = await User.findOne({ _id: note_id, $or: [{ author: req.user.id }, { allowedAccess: { $contains: req.user.id } }] });
            if (!note) note = {};
            return res.json({ data: note, tag: true });
        }
        catch (err) {
            return res.json({ "message": err, "tag": false })
        }
    },


    addNote: async (req, res) => {
        try {
            const author = req.user._id;
            let allowedAccess = [];
            allowedAccess.push(author);
            const desc = req.body.desc;
            const newNote = new Note({
                desc, author, allowedAccess
            })
            await newNote.save().then(() => {
                return res.json({ "data": newNote, "tag": true })
            }).catch(error => {
                return res.json({
                    "error": error, "tag": false
                })
            })
        }
        catch (err) {
            return res.json({ "message": err, "tag": false })
        }
    },


    updateNote: async (req, res) => {
        try {
            const note_id=req.params.id;
            const updatedDesc=req.body.desc;
            await Note.findOneAndUpdate({_id:note_id,author: req.user.id}, {desc:updatedDesc}, {
                returnOriginal: false
              }).then((updatedNote) => {
                return res.json({ "data": updatedNote, "tag": true })
            }).catch(error => {
                return res.json({
                    "error": error, "tag": false
                })
            })
        }
        catch (err) {
            return res.json({ "message": err, "tag": false })
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
                return res.json({
                    "error": error, "tag": false
                })
            })
        }
        catch (err) {
            return res.json({ "message": err, "tag": false })
        }
    },


    shareNote: async (req, res) => {
        try {
            const note_id=req.params.id;
            const shareWithEmail=req.body.email;
            const note=await Note.findOne({_id:note_id,owner:req.user.id});
            if(note){
                const shareWith=await User.findOne({email:shareWithEmail});
                if(shareWith){
                    let shareWithId=shareWith._id;
                    let allowedAccess=note.allowedAccess;
                    let isPresent=allowedAccess.find(((allowedAccessId)=>allowedAccessId==shareWithId));
                    if(isPresent){
                        return res.json({tag:true,message:"Already shared"})
                    }
                    else{
                        allowedAccess.push(shareWithId);
                        note.allowedAccess=allowedAccess;
                        await note.save().then(() => {
                            return res.json({ "data": note,"message":"Note shared", "tag": true })
                        }).catch(error => {
                            return res.json({
                                "error": error, "tag": false
                            })
                        })
                    }
                }
                else{
                    return res.json({tag:false,message:"User not found"})
                }
            }
            else return res.json({tag:false,message:"Note not found or unauthorized"});

            await Note.findOneAndDelete({_id:note_id}).then((note) => {
                if(note)
                    return res.json({ "message":"Note deleted", "tag": true })
                return res.json({ "message":"Note not found", "tag": false })
            }).catch(error => {
                return res.json({
                    "error": error, "tag": false
                })
            })
        }
        catch (err) {
            return res.json({ "message": err, "tag": false })
        }
    }
}

module.exports = NoteController;



