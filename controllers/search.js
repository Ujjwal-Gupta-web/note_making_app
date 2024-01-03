const Note = require('../models/Note');
const User = require('../models/User');
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const SearchController = {

    searchNote: async (req, res) => {
        try {
            const query=req.query.q;
            const searchResults = await Note.find({_id:req.user.id, $text: { $search: query } });
            return res.json({tag:true,data:searchResults});
        }
        catch (err) {
            return res.json({ "message": err, "tag": false })
        }
    },
}

module.exports = SearchController;



