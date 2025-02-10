const express = require('express');
const sql = require('mssql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Azure SQL Configuration
const config = {
    user: 'your_username',
    password: 'your_password',
    server: 'your_server.database.windows.net',
    database: 'your_database',
    options: {
        encrypt: true, // Use this if you're on Windows Azure
    },
};

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret_key';

// Connect to Azure SQL
sql.connect(config)
    .then(() => {
        console.log('Connected to Azure SQL');
    })
    .catch((err) => {
        console.error('Error connecting to Azure SQL', err);
    });

// User Registration Endpoint
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('username', sql.NVarChar, username)
            .query('SELECT * FROM Users WHERE username = @username');

        if (result.recordset.length > 0) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.request()
            .input('username', sql.NVarChar, username)
            .input('password', sql.NVarChar, hashedPassword)
            .query('INSERT INTO Users (username, password) VALUES (@username, @password)');

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Login Endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('username', sql.NVarChar, username)
            .query('SELECT * FROM Users WHERE username = @username');

        if (result.recordset.length === 0) {
            return res.status(400).json({ message: 'Authentication failed' });
        }

        const user = result.recordset[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Authentication failed' });
        }

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to verify JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Record Time Endpoint
app.post('/record-time', authenticateToken, async (req, res) => {
    const { team, rasti, time } = req.body;

    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input('team', sql.NVarChar, team)
            .input('rasti', sql.NVarChar, rasti)
            .input('time', sql.NVarChar, time)
            .input('userId', sql.Int, req.user.id)
            .query('INSERT INTO TimeRecords (team, rasti, time, userId) VALUES (@team, @rasti, @time, @userId)');

        res.status(201).json({ message: 'Aika tallennettu onnistuneesti!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});