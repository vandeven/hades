/**
 * Allow any authenticated user.
 */
/*module.exports = function (req, res, ok) {

  // User is allowed, proceed to controller
  if (req.session.authenticated) {
    return ok();
  }

  // User is not allowed
  else {
    return res.send("You are not permitted to perform this action.", 403);
  }
};*/
module.exports = function (req, res, next) {
    if (req.session.user) {
        //var action = req.param('action');
        //if (action == "create") {
        //    req.body.userId = req.session.user.id;
        //    req.body.username = req.session.user.username;
        //}
        next();
    } else {
        res.send("You Must Be Logged In", 403);
    }
};