const jwt = require('jsonwebtoken');
require('dotenv').config();

// Generate token
const signJWT = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            name: user.name
        },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
    );
};

// Verify token middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verified; // attach decoded user
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token.' });
    }
};

module.exports = { signJWT, authenticateToken };