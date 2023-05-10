const allowedOrigins = [
    'http://localhost:8080',
    'http://127.0.0.1:5500',
    'http://localhost:3500',
    'http://localhost:3001',
    'http://localhost:3000',
    'https://localhost:3000',
    //Might not need the next routes. Note written: 4.5.2023.
    // 'http://192.168.56.1:3000',
    // 'https://192.168.56.1:3000',
    // 'http://87.95.166.175:3000',
    // 'https://87.95.166.175:3000',
    // 'http://192.168.56.1:3500',
    // 'https://192.168.56.1:3500',
    // 'http://87.95.166.175:3500',
    // 'https://87.95.166.175:3500'
];

module.exports = allowedOrigins;