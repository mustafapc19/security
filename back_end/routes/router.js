var pushAttendance = require('./device/pushAttendance')
var EventEmitter = require('events').EventEmitter;
var Router = new EventEmitter();



Router.route = function (topic) {
    topic = topic.toString('utf8')
    topic = topic.split(" ")


    if(topic=='rfid')
    {
        console.log('IF');
        Router.emit('rfid', { a: topic[1] })


    }

}

module.exports = Router

