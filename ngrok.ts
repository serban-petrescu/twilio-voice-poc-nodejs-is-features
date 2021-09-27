
import ngrok from 'ngrok';
import dotenv from 'dotenv';

dotenv.config();

(async function() {
    const url = await ngrok.connect({
        authtoken: process.env.NGROK_TOKEN || '',
        addr: 3001,
        proto: 'http',
    });
    console.log("Exposed: " + url);
})()