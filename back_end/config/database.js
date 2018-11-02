module.exports.address = 'mongodb://localhost/securtity'
module.exports.secret = 'rainthesecrets'

var moreThanOneDay = function (prev, curr) {
    if (curr - prev > 60 * 60 * 24 * 1000) {
        return true
    } else {
        return false
    }
}
module.exports.pluginUpdate = function timestamp(schema) {

    schema.pre('save', function (next) {
        let now = Date.now()
        this.date = now
        /* this.attendance = true
        let previousDay;
        if (previousDay === undefined) {
            previousDay = this.date
        } else if (moreThanOneDay(previousDay, this.date)) {
            prevthis.date
            Employ.find({}, function (err, arr) {
                if (err) console.log(err)


            })
        } */

        next()
    })
}