import dotenv from 'dotenv';
import twilio from 'twilio';
import { makeConferenceWithAnnounce } from './demos/make-conf-with-announce';

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

makeConferenceWithAnnounce(client).catch(console.log);

