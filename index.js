const express = require('express');
const os = require('os');

const app = express();
const port = process.env.PORT || 3000; // Use the provided PORT or a default one

// Middleware to parse JSON
app.use(express.json());

// Middleware to log IP address and requests
app.use((req, res, next) => {
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`Request from IP: ${clientIp}`);
    console.log(`Request method: ${req.method}`);
    console.log(`Request URL: ${req.url}`);
    next();
});

app.all('*', (req, res) => {
    console.log(`Received a ${req.method} request from ESP8266`);

    // Send a JSON response
    res.json({ message: `Hello from the server! , Received a ${req.method} request from ESP8266` });
});

// Get the local IPv4 address of the server
const networkInterfaces = os.networkInterfaces();
const ipv4Address = Object.values(networkInterfaces)
    .flat()
    .find((interfaceInfo) => interfaceInfo.family === 'IPv4')?.address;

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://${ipv4Address}:${port}`);
});
