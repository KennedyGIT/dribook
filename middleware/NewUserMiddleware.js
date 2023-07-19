module.exports = (req, res, next) => {
    console.log(req.session.user);
    let username = req.session.user.userName;
    let firstname = req.session.user.firstName;


    if(req.session.user == undefined)
    {
        return res.redirect("/login");
    }
    else if (req.session.user.firstName == '' || req.session.user.lastName=='') {
        return res.redirect("/g2");
    }
    next();
  };
  