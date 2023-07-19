module.exports = (req, res, next) => {
    if (req.session.user==undefined) {
      return res.redirect("/login");
    }
    else if(req.session.user.userType != 'Driver')
    {
        return res.redirect("/");
    }
    next();
  };