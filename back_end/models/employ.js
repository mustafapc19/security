var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var Schema = mongoose.Schema;
var Attendance = require('./attendance');

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
        type: Number
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
            .then(function (doc) {
                if (doc.employid !== null) {
                    newEmploy.employid = doc.employid + 1;
                    newEmploy.save(callback);
                } else {
                    newEmploy.save(callback);
                }
            })
            .catch(function (err) {
                console.log(err);
                callback(err);
            });
    } else {
        console.log("else");
    }
};


module.exports.grantAccessById = function (employid, access, callback) {
    var query = {
        employid: employid
    };
    Employ.findOne(query, function (err, doc) {
        if (err) {
            console.log("Error");
        } else {
            doc.access.push(access);
            doc.save(callback);
        }
    });
};

module.exports.accessByHash = function (hash, callback) {

    Employ.findOne({
        hash: hash
    }, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            callback(doc.access);
        }
    });
};

module.exports.recordAttendanceByHash = function (hash, callback) {
    Attendance.find({
            hash: hash
        })
        .sort({
            date: -1
        })
        .limit(1)
        .then(function (doc) {
            doc.attendance = true;
            doc.save(callback);
        })
        .catch(function (err) {
            console.log(err);
            callback(err);
        });
};