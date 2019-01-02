var express = require('express');
var router = express.Router();
var Employ = require('../../models/employ');


/*    'localhost:1234/user/grantAccessById' --Will add the access's to the user with the provided employid(field of Employ collection(mongo))---
                                    parameters(post) =
                                    {
                                        "employid" : (the required employid),
                                        "access" : (only one access at a time and should be unique(the concerned employ shouldnt have the same access saved already))
                                    }
*/

router.post('/', function (req, res) {
    if ((req.body.employid+1) && req.body.access) {
        Employ.grantAccessById(req.body.employid, req.body.access, function (err) {
            if (err) {
                console.log("accessById", err);
                res.status(500).send("Error");
            } else {
                res.status(200).send('ok');
            }

        });
    } else {
        res.status(500).send("No input given");

    }
});


module.exports = router;