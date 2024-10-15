const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/index.html') {
        fs.readFile(path.join(__dirname, 'chat.html'), (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end(`Error loading the file: ${err}`);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        });
    } else {
        // Serve static files (like banner.webp)
        const filePath = path.join(__dirname, req.url);
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404);
                res.end('Not found');
            } else {
                // Determine content type based on file extension
                const extname = path.extname(filePath).toLowerCase();
                let contentType = 'application/octet-stream';
                if (extname === '.webp') {
                    contentType = 'image/webp';
                } else if (extname === '.jpg' || extname === '.jpeg') {
                    contentType = 'image/jpeg';
                } else if (extname === '.png') {
                    contentType = 'image/png';
                } else if (extname === '.css') {
                    contentType = 'text/css';
                } else if (extname === '.js') {
                    contentType = 'application/javascript';
                }

                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content);
            }
        });
    }
});

const PORT = 5678;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
