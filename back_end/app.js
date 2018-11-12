var express = require('express')
var app = express()
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var databaseConfig = require('./config/database')
var Attendance = require('./models/attendance')
var zmq = require('zeromq');
var sock = zmq.socket('sub');
var router = require('./routes/device/pushAttendance')

mongoose.connect(databaseConfig.address);

/* app.use(express.json())
 */
app.use(bodyParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));



const CronJob = require('cron').CronJob;
console.log('Before job instantiation');
const job = new CronJob('00 00 00 * * *', function () {
    const d = new Date();
    console.log('Cron :: onTick:', d);
    Attendance.populateEmploys(function (err, doc) {
        if (err) console.log(err)
    })
});
console.log('After job instantiation');
job.start();



// sock.connect('tcp://127.0.0.1:3000');
sock.connect('tcp://localhost:3000')
sock.subscribe('rfid');
console.log('Subscriber connected to port 3000');

sock.on('message', function (topic) {
    topic = topic.toString('utf8')
    topic = topic.split(" ")

    console.log('message',topic[0])

    switch(topic[0]) {
    case "rfid":
        router(topic)
        break;
/*     case y:
        code block
        break; */
    default:
        console.log("Error 0mq default case");

    }
    // router(topic)
    /* console.log('received a message related to:', topic.toString('utf8'), 'containing message:', message.toString('utf8')); */
});







app.listen(1234)
