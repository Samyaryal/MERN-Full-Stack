const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function ( req, res, next) { // next is a callback that we have to run once we are done and need to move to the next middleware 
    // get the token from the header
    const token = req.header('x-auth-token');

    //check if no token 
    if(!token) {
        return res.status (401).json({msg: 'No token, authorization denied'});
    }
    //verify token if there is token and not valid 
    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({msg: 'Token is not valid'});
    }
}