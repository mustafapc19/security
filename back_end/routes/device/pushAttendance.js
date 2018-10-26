var express = require('express')
var router = express.Router()
var Attendance = require('../../models/attendance')

router.post('/', function (req, res) {
    if (req.body.employId) {
        Attendance.recordAttendanceByEmployId(req.body.employId, function (err, doc) {
            if (err) {
                console.log(err)
                res.status(500).send("Error")
            }

        })
    } else {
        res.status(500).send("No password or email given")

    }
})


module.exports = router