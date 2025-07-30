const jwt = require('jsonwebtoken');

// Must match the JWT_SECRET in your .env
const secret = 'supersecret123';

// Dummy user data to encode in the token
const user = {
  id: 1,
  username: 'testuser'
};

const token = jwt.sign(user, secret, { expiresIn: '1h' });

console.log("✅ Your JWT token:\n");
console.log(token);
