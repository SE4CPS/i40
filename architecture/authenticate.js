const express = require('express');
const app = express();
const port = 3000;

// Predefined user credentials (for demo purposes)
const users = {
    'user1': 'password1',
    'user2': 'password2',
    'user3': 'password3'
};

// Predefined sensor UUIDs (for demo purposes)
const sensors = {
    'UUID-123': true,
    'UUID-456': true,
    'UUID-789': true
};

// Authentication for Users (using username and password)
app.get('/auth/user', (req, res) => {
    const { username, password } = req.query;
    
    if (users[username] && users[username] === password) {
        res.json({ message: `User ${username} authenticated successfully` });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

// Authentication for Sensors (using UUID)
app.get('/auth/sensor', (req, res) => {
    const { uuid } = req.query;

    if (sensors[uuid]) {
        res.json({ message: `Sensor with UUID ${uuid} authenticated successfully` });
    } else {
        res.status(401).json({ message: 'Invalid UUID for sensor' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
