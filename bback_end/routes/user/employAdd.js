var express = require('express');
var router = express.Router();
var Employ = require('../../models/employ');

/*
    'localhost:1234/user/employAdd' ---Will add employ in the db----
                                    parameters(post) =
                                    {
                                        "username" : (The required name),
                                        "hash" : (The required hash)
                                    }
*/
router.post('/', function (req, res) {
    console.log('employadd route : ', req.body);


    if (req.body.username && req.body.hash) {
        newEmploy = {
            username: req.body.username,
            hash: req.body.hash
        };
        Employ.createEmploy(newEmploy, function (err) {
            if (err) {
                console.log("employAdd :", err);
                res.status(500).send("Error");
            } else {
                res.status(200).send("Done");
            }

        });
    }
});


module.exports = router;