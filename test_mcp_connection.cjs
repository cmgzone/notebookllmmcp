const { spawn } = require('child_process');
const path = require('path');

const serverPath = path.join(__dirname, 'dist', 'index.js');
console.log(`Starting server at: ${serverPath}`);

const server = spawn('node', [serverPath], {
    env: {
        ...process.env,
        BACKEND_URL: "https://notebookllm-ufj7.onrender.com",
        CODING_AGENT_API_KEY: "nllm_qiJ5BngznmyT-XICzjrzIDzj7um9W_AQseds7BAwuaQ" // Using the key provided
    }
});

server.stdout.on('data', (data) => {
    console.log(`Server stdout: ${data}`);
});

server.stderr.on('data', (data) => {
    console.error(`Server stderr: ${data}`);
});

server.on('close', (code) => {
    console.log(`Server exited with code ${code}`);
});

// Send initialization request
const request = {
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: {
        protocolVersion: "2024-11-05",
        capabilities: {},
        clientInfo: {
            name: "test-client",
            version: "1.0.0"
        }
    }
};

setTimeout(() => {
    const msg = JSON.stringify(request);
    console.log(`Sending: ${msg}`);
    server.stdin.write(msg + '\n');
}, 1000);

setTimeout(() => {
    console.log('Terminating test...');
    server.kill();
}, 5000);
