var express = require('express')
var router = express.Router()
var User = require('../../models/user')
var jwt = require('jsonwebtoken')
var config = require('../../config/database')


router.post('/', function (req, res) {

    console.log('req.name : ', req.body.name, 'req.password : ', req.body.password, 'req.email', req.body.email)

    console.log('req.body', req.body)

    if (req.body.name && req.body.email && req.body.password) {

        var newUser = new User({
            username: req.body.name,
            password: req.body.password,
            email: req.body.email
        })

        User.createUser(newUser, function (err, user) {
            if (err) return res.status(500).send("There was a problem registering the user.")

            // create a token
            var token = jwt.sign({
                id: user._id
            }, config.secret, {
                expiresIn: 864000
            })

            console.log('user registered :', user)

            res.status(200).send({
                auth: true,
                token: token
            })
        })
    } else {
        res.status(500).send("Credentials incomplete")
    }
})

module.exports = router