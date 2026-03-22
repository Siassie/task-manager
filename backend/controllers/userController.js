const users = require('../model/testModel');
const { signJWT } = require('../middleware/userMiddleware');

// Register
const register = async (req, res) => {
    const { name, surname, email, password } = req.body;

    if (!name || !surname || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(409).json({ message: 'Email already in use' });
    }

    const newUser = {
        id: Date.now(),
        name,
        surname,
        email,
        password // ⚠️ In production: hash this with bcrypt
    };

    users.push(newUser);

    const token = signJWT(newUser);

    return res.status(201).json({
        message: 'User registered successfully',
        token
    });
};

// Login
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password required' });
    }

    const user = users.find(u => u.email === email);

    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signJWT(user);

    return res.status(200).json({
        message: 'Login successful',
        token
    });
};

// Protected route example
const getProfile = async (req, res) => {
    return res.status(200).json({
        message: 'Protected route accessed',
        user: req.user
    });
};

module.exports = { register, login, getProfile };