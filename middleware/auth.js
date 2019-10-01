const jwt = require('jsonwebtoken');
const config = require('config');

// middleware function is a function that has access to req & res objects, next is a callback we have to run when done
// to move onto the next piece of middleware
module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if(!token) {
    return res.status(401).json({msg: 'No token, authorization denied'});
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('JWT_SECRET'));

    // use decoded user
    req.user = decoded.user;
    next();
  } catch(err) {
    res.status(401).json({msg: 'Token is not valid'});
  }

};
