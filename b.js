const CronJob = require('cron').CronJob;

console.log('Before job instantiation');
const job = new CronJob('* * * * *', function () {
    const d = new Date();
    console.log('At Ten Minutes:', d);
});
console.log('After job instantiation');
job.start();