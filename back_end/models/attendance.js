var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var Schema = mongoose.Schema;
var pluginUpdate = require("../config/database").pluginUpdate;
var Employ = require("../models/employ");

var AttendanceSchema = mongoose.Schema({
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

module.exports.recordAttendanceByEmployId = function (employid, callback) {
  Employ.recordAttendanceByEmployId(employid, callback);
};

module.exports.populateEmploys = function (callback) {
  var employs = Employ.find();
  for (var i = 0, len = employs.length; i < len; i++) {
    attendance = new Attendance();
    attendance.employ = employs[i]._id;
    attendance.save(callback);
  }
};