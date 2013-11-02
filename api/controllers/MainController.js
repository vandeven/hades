/**
 * MainController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var MainController = {
    index: function (req, res) {
        res.view();
    },
    signup: function (req, res) {
        var username = req.param("username");
        var password = req.param("password");

        Users.findByUsername(username).done(function(err, usr){
            if (err) {
                res.send(500, { error: "DB Error" });
            } else if (usr.length > 0) {
                res.send(400, {error: "Username already Taken"});
            } else {
                var hasher = require("password-hash");
                password = hasher.generate(password);

                Users.create({username: username, password: password}).done(function(error, user) {
                    if (error) {
                        res.send(500, {error: "DB Error"});
                    } else {
                        req.session.user = user;
                        res.send(user);
                    }
                });
            }
        });
    },
    login: function (req, res) {
        var username = req.param("username");
        var password = req.param("password");

        Users.findByUsername(username).done(function(err, usr) {
            if (err) {
                res.send(500, { error: "DB Error" });
            } else {
                if (usr.length > 0) {
                    var hasher = require("password-hash");
                    if (hasher.verify(password, usr[0].password)) {
                        req.session.user = usr[0];
                        res.send(usr[0]);
                    } else {
                        res.send(400, { error: "Wrong Password" });
                    }
                } else {
                    res.send(404, { error: "User not Found" });
                }
            }
        });
    },
    chat: function (req, res) {
        if (req.session.user) {
            res.view({username: req.session.user.username});
        } else {
            res.redirect('/');
        }
    }
};
module.exports = MainController;
