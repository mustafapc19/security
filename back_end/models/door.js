var mongoose = require("mongoose");
var pluginUpdate = require("../config/database").pluginUpdate;
var Employ = require("../models/employ");

var DoorSchema = mongoose.Schema({
    date: {
        type: Date,
        index: true
    },
    doorid: {
        type: Number
    },
    employid: {
        type: Number
    },
    time: {
        type: Date
    },
    open: {
        type: Boolean
    }
});

DoorSchema.plugin(pluginUpdate);
var Door = (module.exports = mongoose.model("Door", DoorSchema));

module.exports.pushNotification = function (doorid, employid, open, callback) {
    var sampleDoor = new Door();
    sampleDoor.doorid = doorid;
    if (Employ.find({
            employid: employid
        })) {
        sampleDoor.employid = employid;
        sampleDoor.open = open;
        sampleDoor.save();
        callback(true);
    } else {
        sampleDoor.employid = employid;
        sampleDoor.open = open;
        sampleDoor.save();
        callback(false);
    }
};