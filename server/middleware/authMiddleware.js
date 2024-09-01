// Middleware to check if user is authenticated
const authMiddleware = (req, res, next) => {
    // TODO: Implement actual authentication logic
    console.log('Auth Middleware: Checking authentication');
    next();
  };
  
  module.exports = authMiddleware;
  