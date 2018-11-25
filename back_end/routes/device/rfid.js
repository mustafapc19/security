var pushAttendance = require('./device/pushAttendance')

var Router = function (topic,callback) {



    if(topic=='rfid')
    {
        console.log('IF');
        pushAttendance(topic,callback)


    }

}

module.exports = Router

