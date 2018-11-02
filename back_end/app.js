var express = require('express')
var app = express()
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var databaseConfig = require('./config/database')
var Attendance = require('./models/attendance')
var zmq = require('zeromq');
var sock = zmq.socket('sub');

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

sock.on('message', function (topic, message) {
    console.log('message',topic.toString('utf8'))
    /* console.log('received a message related to:', topic.toString('utf8'), 'containing message:', message.toString('utf8')); */
});





/* var login = require('./routes/user/login')
var register = require('./routes/user/register')
var preference = require('./routes/api/preference')


app.use('/user/login', login)
app.use('/user/register', register)
app.use('/user/api/preference', preference)
app.use('/user/api/history', history)
app.use('/user/api/presentstate', userPresentState)
app.use('/user/api/updatePreference', updatePreference)

app.use('/ard', aurdinoreport)
app.use('/ard/presentstate', presentState) */



app.listen(1234)
