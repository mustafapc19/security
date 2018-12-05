var express = require('express');
var router = express.Router();
var Employ = require('../../models/employ');

router.post('/', function (req, res) {
    if (req.body.hash) {
        Employ.accessByHash(req.body.hash, function (doc) {
            if (doc) {
                json = {
                    username: doc.username,
                    access: doc.access
                };
                res.status(200).send(json);
            } else {
                res.status(500).send("NoInfoFound");
            }

        });
    } else {
        res.status(500).send("No hash given");

    }
});


module.exports = router;