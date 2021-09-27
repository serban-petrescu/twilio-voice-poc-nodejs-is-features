import { Twilio } from 'twilio';
import { wait } from '../utils/wait';

export async function makeConferenceWithCallMessage(client: Twilio) {
    console.log(await client.calls.create({
        from: process.env.TWILIO_PHONE_NUMBER_A || '',
        to: process.env.EXT_PHONE_NUMBER_A || '',
        twiml: '<Response><Dial><Conference>' + process.env.TWILIO_CONFERENCE_NAME + '</Conference></Dial></Response>',
    }));

    console.log(await client.calls.create({
        from: process.env.TWILIO_PHONE_NUMBER_A || '',
        to: process.env.EXT_PHONE_NUMBER_B || '',
        twiml: '<Response><Dial><Conference>' + process.env.TWILIO_CONFERENCE_NAME + '</Conference></Dial></Response>',
    }));

    await wait(10000);
    
    // assuming that the phone number is configured to call the server /enjoy endpoint, this will play "Enjoy!" and hang up
    console.log(await client.calls.create({
        from: process.env.TWILIO_PHONE_NUMBER_A || '',
        to: process.env.TWILIO_PHONE_NUMBER_A || '',
        twiml: '<Response><Dial><Conference>' + process.env.TWILIO_CONFERENCE_NAME + '</Conference></Dial></Response>',
    }));

    return;
}
