API's - (tested(kinda))

    'localhost:1234/device/pushAttendance' ---  Will mark attendance by hash --
                                    parameters (post) =
                                    {
                                        "hash" : (the required hash)
                                    }

    'localhost:1234/api/populateEmploys' --- Will mark every employ absent at the time this route is accessed ------
                                    parameters = none

    'localhost:1234/device/getAccessByHash' --- Will return a array of 'access's' (field of Employ collection(mongo))------
                                    parameters(post) =
                                    {
                                        "hash" : (the required hash)
                                    }

    'localhost:1234/user/employAdd' ---Will add employ in the db----
                                    parameters(post) =
                                    {
                                        "username" : (The required name),
                                        "hash" : (The required hash)
                                    }

    'localhost:1234/user/grantAccessById' --Will add the access's to the user with the provided employid(field of Employ collection(mongo))---
                                    parameters(post) =
                                    {
                                        "employid" : (the required employid),
                                        "access" : (only one access at a time and should be unique(the concerned employ shouldnt have the same access saved already))
                                    }
