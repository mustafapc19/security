var express = require('express')
var router = express.Router()
var User = require('../../models/user')
var jwt = require('jsonwebtoken')
var config = require('../../config/database')

router.post('/', function (req, res) {
    if (req.body.email && req.body.password) {
        User.getUserByEmail(req.body.email,
            function (err, user) {
                if (err) return res.status(500).send("No email Id or its specified password found")
                User.comparePassword(req.body.password, user.password, function (err, isMatch) {
                    if (err) throw err;
                    if (isMatch) {
                        var token = jwt.sign({
                            id: user._id
                        }, config.secret, {
                            expiresIn: 864000
                        })

                        res.status(200).send({
                            auth: true,
                            token: token
                        })
                    } else {
                        res.status(500).send("Password or email not authorized")
                    }
                })



            }

        )
    } else {
        res.status(500).send("No password or email given")

    }
})


module.exports = router