var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var Schema = mongoose.Schema;
var pluginUpdate = require("../config/database").pluginUpdate;
var Employ = require("../models/employ");

var AttendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    index: true
  },
  employ: {
    type: Schema.Types.ObjectId,
    ref: "Employ"
  },
  attendance: {
    type: Boolean,
    default: false
  }
});

AttendanceSchema.plugin(pluginUpdate);


var Attendance = (module.exports = mongoose.model(
  "Attendance",
  AttendanceSchema
));



module.exports.recordAttendanceByHash = function (hash, callback) {
  Employ.find({
    hash: hash
  }, function (err, doc) {
    if (err) {
      callback(err);
    } else {
      Attendance.find({
          employ: doc[0]._id
        })
        .sort({
          date: -1
        })
        .limit(1)
        .exec()
        .then(function (query) {
          query[0].attendance = true;
          query[0].save(callback);
        })
        .catch(function (err) {
          console.log(err);
          callback(err);
        });
    }
  });

};

module.exports.findByHash = function (hash, callback) {
  Attendance.find({
    hash: hash
  }, function () {
    return this;
  });
};
module.exports.populateEmploys = function (callback) {

  Employ.find({}, function (err, employs) {
    console.log(employs);
    if (err) {
      callback(err);
    } else {
      for (var i = 0, len = employs.length; i < len; i++) {
        attendance = new Attendance();
        attendance.employ = employs[i]._id;
        attendance.save();
      }
      callback();
    }
  });

};