import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import twilio from 'twilio';

const AccessToken = twilio.jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

dotenv.config();
const url = process.env.NGROK_URL;

const app = express();
app.use(urlencoded({ extended: false }));
app.use('/static', express.static('static'));

app.all('/log', (request, response) => {
    console.log(request.body);
    response.sendStatus(200);
});

app.all('/ivr', (request, response) => {
    console.log(request.body);
    response.type('text/xml');
    response.send(
        (() => {
            if (request.body.To === process.env.TWILIO_PHONE_NUMBER_B) {
                return '<Response><Pause length="5"/><Say voice="alice">Second phone number.</Say><Pause length="5"/><Hangup /></Response>';
            } else if (request.body.Digits === '1') {
                return '<Response><Pause length="5"/><Say voice="alice">Exiting during first phone call.</Say><Pause length="5"/><Hangup /></Response>';
            } else if (request.body.Digits === '2') {
                return `<Response><Dial>${process.env.TWILIO_PHONE_NUMBER_B}</Dial></Response>`;
            } else {
                return `<Response><Pause length="5"/><Gather input="dtmf" timeout="3" numDigits="1"><Play>${url}/static/test.mp3</Play></Gather></Response>`;
            }
        })(),
    );
});

app.all('/enjoy', (request, response) => {
    console.log(request.body);
    response.type('text/xml');
    response.send('<Response><Say voice="alice">Enjoy!</Say><Hangup /></Response>');
});

app.all('/long', (request, response) => {
    const file = request.query.file || 'test.mp3';
    console.log(request.body);
    response.type('text/xml');
    response.send(`<Response><Play>${url}/static/${file}</Play></Response>`);
});

app.get('/token', async (_, response) => {
    const accessToken = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID || '',
        process.env.TWILIO_API_KEY || '',
        process.env.TWILIO_API_SECRET || '',
    );
    accessToken.identity = process.env.TWILIO_CLIENT;

    const grant = new VoiceGrant({
        outgoingApplicationSid: process.env.TWILIO_APP_SID,
        incomingAllow: true,
    });
    accessToken.addGrant(grant);

    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.stringify({ token: accessToken.toJwt() }));
});

app.listen(3001, 'localhost', async () => {
    console.log('Listening.');
});
