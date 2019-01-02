var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var uniqueValidator = require("mongoose-unique-validator");
var Schema = mongoose.Schema;

var UserSchema = mongoose.Schema({
    /* _id: {
            type: mongoose.Schema.Types.ObjectId
        }, */
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

UserSchema.plugin(uniqueValidator);

var User = (module.exports = mongoose.model("User", UserSchema));
module.exports.createUser = function (newUser, callback) {
    console.log("create user entered");
    // console.log("newUser :", newUser)
    if (newUser.username && newUser.password) {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newUser.password, salt, function (err, hash) {
                
                newUser.password = hash;
                newUser.save(callback);
            });
        });
    } else {
        console.log("else");
    }
};

module.exports.getUserByEmail = function (email, callback) {
    console.log("Get user by email id enterd");

    var query = {
        email: email
    };
    User.findOne(query, callback);
};

module.exports.getUserByUsername = function (username, callback) {
    var query = {
        username: username
    };
    User.findOne(query, callback);
};

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) {
            console.log("password didnt match");
            console.log("isMatch : ", isMatch);
        }
        console.log("isMacth :", isMatch);
        callback(null, isMatch);
    });
};

