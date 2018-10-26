var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var uniqueValidator = require("mongoose-unique-validator");
var Schema = mongoose.Schema;
var Attendance = require('./attendance')

var EmploySchema = mongoose.Schema({
    /* _id: {
            type: mongoose.Schema.Types.ObjectId
        }, */
    employid: {
        type: String
    },
    username: {
        type: String,
        index: true,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
        // index: true
    },
    password: {
        type: String,
        required: true
    }
});

EmploySchema.plugin(uniqueValidator);

var Employ = (module.exports = mongoose.model("Employ", EmploySchema));
module.exports.createEmploy = function (newEmploy, callback) {
    console.log("create user entered");
    // console.log("newEmploy :", newEmploy)
    if (newEmploy.username && newEmploy.password) {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newEmploy.password, salt, function (err, hash) {
                newEmploy.password = hash;

                newEmploy.save(callback);
            });
        });
    } else {
        console.log("else");
    }
};

module.exports.getEmployByEmail = function (email, callback) {
    console.log("Get user by email id enterd");

    var query = {
        email: email
    };
    Employ.findOne(query, callback);
};

module.exports.getEmployByEmployname = function (username, callback) {
    var query = {
        username: username
    };
    Employ.findOne(query, callback);
};

module.exports.recordAttendanceByEmployId = function (employid, callback) {
    Attendance.find({
            employid: employid
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