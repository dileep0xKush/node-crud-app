
const User = require('../models/userModel'); 

const attachUser = async (req, res, next) => {
  if (req.session && req.session.userId) {
    try {
      const user = await User.findById(req.session.userId).lean();
      if (user) {
        res.locals.authUser = user;
      } else {
        res.locals.authUser = null;
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      res.locals.authUser = null;
    }
  } else {
    res.locals.authUser = null;
  }
  next();
};

module.exports = attachUser;
