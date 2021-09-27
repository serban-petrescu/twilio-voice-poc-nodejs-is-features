import dotenv from 'dotenv';
import twilio from 'twilio';
import { makeConferenceWithBrowser } from './demos/make-conf-with-browser';

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

makeConferenceWithBrowser(client).catch(console.log);

