var express = require('express')
var router = express.Router()
var Attendance = require('../../models/attendance')

router.post('/', function (req, res) {
    if (req.body.hash) {
        Attendance.recordAttendanceByHash(req.body.hash, function (err) {
            if (err) {
                console.log(err)
                res.status(500).send("Error")
            }
            res.send("OK")

        })
    } else {
        res.status(500).send("No password or email given")

    }
})


module.exports = router