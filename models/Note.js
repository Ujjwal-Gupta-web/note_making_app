const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Note = new Schema({
    title:{
        type: String, 
        required: true 
    },
    desc: { 
        type: String, 
        required: true 
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true ,
        ref: 'Users'
    },
    allowedAccess:[{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }]
});
Note.index({title: 'text', desc: 'text'});


module.exports = mongoose.model('Notes', Note); 