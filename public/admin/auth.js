const bcrypt = require('bcrypt');

// Define your admin credentials
const adminUsername = 'us_helen';
const hashedPassword = '$2a$10$WsoEuCaB4PAGa5qMAhF9LOZzFnuQR.eaGajdPmg1nyKsvWrUVIuTK';

// Middleware function to check if the request is authenticated
function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const encodedCredentials = authHeader.split(' ')[1];
        const credentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8');
        const [username, password] = credentials.split(':');

        if (username === adminUsername && bcrypt.compareSync(password, hashedPassword)) {
            // Authentication success
            next();
            return;
        }
    }

    // Authentication failed
    res.set('WWW-Authenticate', 'Basic realm="admin"');
    res.status(401).send('Authentication required');
}

module.exports = authenticate;