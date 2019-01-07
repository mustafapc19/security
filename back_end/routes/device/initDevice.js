var express = require('express');
var router = express.Router();
var Employ = require('../../models/employ');

/*
    'localhost:1234/device/init' --- Will return ready when started accepting requests------
                                    parameters(post) =
                                    {
                                        "status" : (status of the python process)
                                    }
*/
router.post('/', function (req, res) {
    if (req.body.status) {
        res.status(200).send("ready");
        if(req.body.status == "failed"){
            // log failed
            pass;
        }
    } else {
        res.status(500).send("no hash given");
    }
});


module.exports = router;