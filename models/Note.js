const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Note = new Schema({
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


module.exports = mongoose.model('Notes', Note); 