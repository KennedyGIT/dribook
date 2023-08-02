module.exports = (req, res, next) => {
    if (req.session.user==undefined) {
      return res.redirect("/login");
    }
    else if((req.session.user.userType != 'Driver') || (req.session.user.userType != 'Admin'))
    {
        return res.redirect("/login");
    }
  };