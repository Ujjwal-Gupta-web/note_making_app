const User = require('../models/User');
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const logger=require('../utility/logger')

const UserController = {
    login: async (req, res) => {
        try {
            const result = await User.findOne({ email: req.body.email });
            if (result) {
                bcrypt.compare(req.body.password, result.password, function (err, hashed) {
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
            logger.error(err);
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
                    return res.json({ "message": "SignUp Success", tag: true })
                }).catch((err) => { 
                    logger.error(err);
                    return res.json({
                        "error": err?.message, "tag": false
                    }) 
                })
            }
        }
        catch (err) {
            logger.error(err);
            return res.json({ "error": err?.message, "tag": false })
        }

    },

    getRandomUser:async (req,res)=> {
        try {
          const randomUser = await User.aggregate([{ $sample: { size: 1 } }]);
          if (randomUser && randomUser.length > 0) {
            const token = jwt.sign({ id: randomUser[0]._id }, process.env.SECRET_TOKEN);
            return res.json({"token": token, "tag": true })
          } else {
            return res.json({tag:false,message:"No user found"})
          }
        } catch (error) {
            console.error('Error fetching random user:', error);
            logger.error(err);
            return res.json({ "error": error?.message, "tag": false })
        }
      }
}

module.exports = UserController;



