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

// Authentication middleware for private endpoints
const authenticate = (req, res, next) => {
    const { username, password, uuid } = req.query;

    // User authentication check
    if (username && password) {
        if (users[username] && users[username] === password) {
            return next();  // User is authenticated, proceed to private endpoint
        } else {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
    }
    
    // Sensor authentication check
    if (uuid) {
        if (sensors[uuid]) {
            return next();  // Sensor is authenticated, proceed to private endpoint
        } else {
            return res.status(401).json({ message: 'Invalid UUID for sensor' });
        }
    }

    return res.status(400).json({ message: 'Missing authentication parameters' });
};

// Public authentication for Users
app.get('/auth/user', (req, res) => {
    const { username, password } = req.query;
    
    if (users[username] && users[username] === password) {
        res.json({ message: `User ${username} authenticated successfully` });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

// Public authentication for Sensors
app.get('/auth/sensor', (req, res) => {
    const { uuid } = req.query;

    if (sensors[uuid]) {
        res.json({ message: `Sensor with UUID ${uuid} authenticated successfully` });
    } else {
        res.status(401).json({ message: 'Invalid UUID for sensor' });
    }
});

// Private endpoint example - only accessible after authentication
app.get('/private/data', authenticate, (req, res) => {
    res.json({ message: 'This is private data, only accessible after successful authentication' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
