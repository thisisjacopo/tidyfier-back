const createError = require("http-errors");

// * CHECK IF USER IS ALREADY LOGGED AND HAS AN ACTIVE SESSION
exports.isLoggedIn = (req, next) => {
  if (req.session.currentUser) next();
  else next(createError(401));
};

// * CHECK IF USER IS NOT YET LOGGED AND HAS AN ACTIVE SESSION
exports.isNotLoggedIn = (req, next) => {
  if (!req.session.currentUser) next();
  else next(createError(403));
};

// * CHECK IF USER THE BODY OF THE REQ HAS USERNAME, PASSWORD, EMAIL AND CITY
exports.validationLogin = (req, next) => {
  const { username, password, email, city } = req.body;
  if (!username || !password || !email || !city) next(createError(400));
  else next();
};
