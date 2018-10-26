var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var Schema = mongoose.Schema;

var KeysSchema = mongoose.Schema({
    date : {
        type : Date,
        index : true
    },
    keyid : {
        type : Number
    },
    employid : {
        type : Schema.Types.ObjectId,
        ref: "Employ",
        index : true
    },
    time : {
        type : Date
    },
    out : {
        type : Boolean
    }
});

var Keys = (module.exports = mongoose.model("Keys", KeysSchema));

module.exports.getKeysByEmployId = function(employid,dateLowerLimit,dateUpperLimit,callback){
    if(dateLowerLimit && dateUpperLimit && dateLowerLimit < dateUpperLimit){
        Keys.find({
            employid : employid,
            date : { $gt : dateLowerLimit , $lt : dateUpperLimit }
        })
        .populate('employid') 
        .exec(callback)
    } else {
        callback(false,null)
    }
}