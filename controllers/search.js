const Note = require('../models/Note');
const User = require('../models/User');
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
// add owner : req.user.id in each find
const SearchController = {

    searchNote: async (req, res) => {
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
}

module.exports = SearchController;



