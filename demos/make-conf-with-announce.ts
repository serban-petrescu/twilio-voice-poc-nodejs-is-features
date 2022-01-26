import { Twilio } from 'twilio';
import { wait } from '../utils/wait';

export async function makeConferenceWithAnnounce(client: Twilio) {
    const prospect = await client.calls.create({
        from: process.env.TWILIO_PHONE_NUMBER_A || '',
        to: process.env.EXT_PHONE_NUMBER_A || '',
        twiml: '<Response><Dial><Conference>' + process.env.TWILIO_CONFERENCE_NAME + '</Conference></Dial></Response>',
    });

    const sdr = await client.calls.create({
        from: process.env.TWILIO_PHONE_NUMBER_A || '',
        to: 'client:' + process.env.TWILIO_CLIENT,
        twiml: '<Response><Dial><Conference>' + process.env.TWILIO_CONFERENCE_NAME + '</Conference></Dial></Response>',
    });

    await wait(10000);

    const conference = (await client.conferences.list({
        friendlyName: process.env.TWILIO_CONFERENCE_NAME
    }))[0];
    console.log(conference);
    
    await conference.participants().get(prospect.sid).update({
        announceUrl: process.env.NGROK_URL + '/long?file=audio.wav',
        announceMethod: 'GET'
    });

    return;
}
