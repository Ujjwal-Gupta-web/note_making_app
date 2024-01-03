const User = require('../models/User');
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const UserController = {
    login: async (req, res) => {
        try {
            const result = await User.findOne({ email: req.body.email });
            if (result) {
                bcrypt.compare(req.body.pass, result.password, function (err, hashed) {
                    if (hashed === true) {
                        const token = jwt.sign({ id: result._id }, process.env.SECRET_TOKEN);
                        return res.json({ "message": "Login success", "token": token, "tag": true })
                    }
                    else {
                        return res.json({ "message": "Login failed", "tag": false })
                    }
                });
            }
            else {
                return res.json({ "message": "No user exists", "tag": false })
            }
        }
        catch (err) {
            return res.json({ "message": err, "tag": false })
        }

    },


    signup: async (req, res) => {

        try {
            const result = await User.findOne({ email: req.body.email });

            if (result) {
                return res.json({ "message": "User already exists", "tag": false })
            }
            else {
                var hash = bcrypt.hashSync(req.body.password, 8);
                const user = new User({
                    email: req.body.email,
                    password: hash
                })
                await user.save().then((doc) => {
                    console.log(doc)
                    return res.json({ "message": "SignUp Success", tag: true })
                }).catch((err) => { 
                    return res.json({
                        "error": error, "tag": false
                    }) 
                })
            }
        }
        catch (err) {
            return res.json({ "error": err, "tag": false })
        }

    }
}

module.exports = UserController;



