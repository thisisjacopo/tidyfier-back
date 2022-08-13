const createError = require("http-errors");

// * CHECK IF USER IS ALREADY LOGGED AND HAS AN ACTIVE SESSION
exports.isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) next();
  else next(createError(401));
};

// * CHECK IF USER IS NOT YET LOGGED AND HAS AN ACTIVE SESSION
exports.isNotLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) next();
  else next(createError(403));
};

// * CHECK IF USER THE BODY OF THE REQ HAS USERNAME, PASSWORD, EMAIL AND CITY
exports.validationLogin = (req, res, next) => {
  const { password, email } = req.body;
  if (!password || !email) next(createError(400));
  else next();
};
