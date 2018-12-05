var express = require('express');
var router = express.Router();
var Employ = require('../../models/employ');

router.post('/', function (req, res) {
    if (req.body.employid && req.body.access) {
        Employ.grantAccessById(req.body.employid, req.body.access, function (err) {
            if (err) {
                console.log("accessById", err);
                res.status(500).send("Error");
            } else {
                res.statusCode(200).send('ok');
            }

        });
    } else {
        res.status(500).send("No input given");

    }
});


module.exports = router;