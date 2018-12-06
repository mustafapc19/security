var express = require('express');
var router = express.Router();
var Attendance = require('../../models/attendance');

/*
  'localhost:1234/api/populateEmploys' --- Will mark every employ absent at the time this route is accessed ------
                                   parameters = none

                                   */

router.post('/', function (req, res) {
    console.log('populate route : ', req.body);


    Attendance.populateEmploys(function (err) {
        if (err) {
            console.log(err);
            res.send("error");
        } else {
            res.send("done");
        }
    });

});


module.exports = router;