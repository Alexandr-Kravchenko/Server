const { connect } = require('http2');
const net = require('net');

const client = new net.Socket();

client.connect(1330, '127.0.0.1', () => {
    console.log('Connected');
})

client.on('data', (data) => {
    console.log('Received: ', data);
    
})

client.on('closed', (data) => {
    console.log('Received: ', data);
    client.destroy();
})