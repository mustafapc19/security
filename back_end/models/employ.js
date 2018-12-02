var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var Schema = mongoose.Schema;
var Attendance = require('./attendance')

var EmploySchema = mongoose.Schema({
    /* _id: {
            type: mongoose.Schema.Types.ObjectId
        }, */
    employid: {
        type: Number,
        required: true,
        default: 0,
        index: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
        index: true,
        required: true,
        unique: true
    },
    access: [{
        type: String
    }],
    email: {
        type: String,
        unique: true
        // index: true
    },
    password: {
        type: String,
    }
});

EmploySchema.plugin(uniqueValidator);

var Employ = (module.exports = mongoose.model("Employ", EmploySchema));
module.exports.createEmploy = function (newEmploy, callback) {
    console.log("create user entered");
    // console.log("newEmploy :", newEmploy)
    if (newEmploy.username && newEmploy.password && newEmploy.hash) {
        Employ.find({})
            .sort({
                employid: -1
            })
            .limit(1)
            .then((doc) => {
                if (doc.employid) {
                    newEmploy.employid = doc.employid + 1
                    newEmploy.save(callback)
                } else {
                    newEmploy.save(callback)
                }
            })
            .catch((err) => {
                console.log(err)
                callback(err)
            })
    } else {
        console.log("else");
    }
};


module.exports.getEmployByEmployname = function (username, callback) {
    var query = {
        username: username
    };
    Employ.findOne(query, callback);
};

module.exports.recordAttendanceByHash = function (hash, callback) {
    Attendance.find({
            hash: hash
        })
        .sort({
            date: -1
        })
        .limit(1)
        .then((doc) => {
            doc.attendance = true
            doc.save(callback)
        })
        .catch((err) => {
            console.log(err)
            callback(err)
        })
}