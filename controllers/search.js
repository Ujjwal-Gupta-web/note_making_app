const logger=require('../utility/logger')
const Note = require('../models/Note');
const User = require('../models/User');
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const SearchController = {

    searchNote: async (req, res) => {
        try {
            const query=req.query.q;
            console.log(query);
            const searchResults = await Note.find({
                $and:[
                    {$or:[{author:req.user.id},{allowedAccess: { $in: [req.user.id] }}]}, {$text: { $search: query } }
                ]
            }).populate({path:'author',select:'email'}).populate({path:'allowedAccess',select:'email'});;
            return res.status(200).json({tag:true,data:searchResults});
        }
        catch (err) {
            logger.error(err);
            return res.json({ "message": err, "tag": false })
        }
    },
}

module.exports = SearchController;



