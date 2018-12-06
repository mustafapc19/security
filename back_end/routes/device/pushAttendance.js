var express = require('express');
var router = express.Router();
var Attendance = require('../../models/attendance');

/*
    'localhost:1234/device/pushAttendance' ---  Will mark attendance by hash --
                                    parameters (post) =
                                    {
                                        "hash" : (the required hash)
                                    }
*/
router.post('/', function (req, res) {
    if (req.body.hash) {
        Attendance.recordAttendanceByHash(req.body.hash, function (err) {
            if (err) {
                console.log(err);
                res.status(500).send("Error");
            }
            res.send("OK");

        });
    } else {
        res.status(500).send("No hash given");

    }
});


module.exports = router;