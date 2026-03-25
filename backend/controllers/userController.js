const users = require('../model/testModel');
const { signJWT } = require('../middleware/userMiddleware');
const prisma = require('../src/prisma');

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

    // prisma schema integration
    const user = await prisma.user.create({
        data: {
            name: name,
            surname: surname,
            email: email,
            password: password
        }
    });

    // users.push(newUser);

    const valForJWT = {
        id: user.id,              // ✅ include user id
        name: user.name + ' ' + user.surname,
        email: user.email
    };

    const token = signJWT(valForJWT);

    // check to see if token contains correct info about user
    console.log(token);

    return res.status(201).json({
        message: 'User registered successfully',
        token
    });
};

// Login
const login = async (req, res) => {
    const { email, password } = req.body;

    // 1️⃣ Check for required fields
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password required' });
    }

    try {
        // 2️⃣ Find the user in the database
        const user = await prisma.user.findUnique({
            where: { email }
        });

        // 3️⃣ Check if user exists and password matches
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // 4️⃣ Create JWT payload
        const valForJWT = {
            userId: user.id,
            name: user.name + ' ' + user.surname,
            email: user.email
        };

        const token = signJWT(valForJWT);

        // 5️⃣ Return response
        return res.status(200).json({
            message: 'Login successful',
            token
        });

    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Protected route example
const getProfile = async (req, res) => {
    return res.status(200).json({
        message: 'Protected route accessed',
        user: req.user
    });
};

module.exports = { register, login, getProfile };