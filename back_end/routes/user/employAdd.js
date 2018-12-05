var express = require('express');
var router = express.Router();
var Employ = require('../../models/employ');


router.get('/', function (req, res) {

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
                res.statusCode(200).send("Done");
            }

        });
    }
});


module.exports = router;