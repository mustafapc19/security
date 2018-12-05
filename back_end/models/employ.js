var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var Schema = mongoose.Schema;
Attendance = require('./attendance')

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
        type: String
        // unique: true
        // index: true
    },
    password: {
        type: String,
    }
});

EmploySchema.plugin(uniqueValidator);



var Employ = (module.exports = mongoose.model("Employ", EmploySchema));
module.exports.createEmploy = function (employ, callback) {
    if (employ.username && employ.hash) {
        Employ.find({})
            .sort({
                employid: -1
            })
            .limit(1)
            .then(function (doc) {
                if (typeof (doc) == 'object' && doc.length > 0) {
                    newEmploy = new Employ();
                    newEmploy.username = employ.username;
                    newEmploy.hash = employ.hash;
                    newEmploy.employid = doc[0].employid + 1;
                    newEmploy.save(callback);
                } else {
                    newEmploy = new Employ();
                    newEmploy.username = employ.username;
                    newEmploy.hash = employ.hash;
                    newEmploy.employid = 0;
                    newEmploy.save(callback);
                }
            })
            .catch(function (err) {
                console.log(err);
                callback('createemploy::catch', err);
            });
    } else {
        console.log("else --  create employ");
    }
};





module.exports.grantAccessById = function (employid, access, callback) {
    var query = {
        employid: employid
    };
    Employ.findOne(query, function (err, doc) {
        flag = false;
        for (var i = 0; i < doc.access.length; i++) {
            if (access == doc.access[i])
                flag = true;
        }
        if (err) {
            console.log("Error");
        } else {
            if (flag) {
                callback('error-grantAccess , not unique')
            } else {
                doc.access.push(access);
                doc.save(callback);
            }
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
            callback(doc);
        }
    });
};

module.exports.recordAttendanceByHash = function (hash, callback) {
    console.log("recordHash-------------", typeof (Attendance));

    Attendance.find({
            hash: hash
        })
        .sort({
            date: -1
        })
        .limit(1)
        .then(function (doc) {
            doc.attendance = true;
            doc.save();
        })
        .catch(function (err) {
            console.log(err);
            callback(err);
        });
};