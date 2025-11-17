const jwt = require('jsonwebtoken');

auth = function (req,res,next) {
    const token = req.header('x-auth-token');
    if (!token) {
       return res.status(401).send('Access rejected .')
    }
    try {
        const decodeToken = jwt.verify(token , 'privateKey');
        req.user = decodeToken;
        next();
    } catch (error) {
        return res.status(400).send(`Wrong token + ${error}`)
    }
};

module.exports = auth;

