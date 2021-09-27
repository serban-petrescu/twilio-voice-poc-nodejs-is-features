import { Twilio } from 'twilio';
import { wait } from '../utils/wait';

export async function makeConferenceWithDtmf(client: Twilio) {
    const sdr = await client.calls.create({
        from: process.env.TWILIO_PHONE_NUMBER_A || '',
        to: process.env.EXT_PHONE_NUMBER_A || '',
        twiml: '<Response><Dial><Conference>' + process.env.TWILIO_CONFERENCE_NAME + '</Conference></Dial></Response>',
    });

    const prospect = await client.calls.create({
        from: process.env.TWILIO_PHONE_NUMBER_A || '',
        to: process.env.EXT_PHONE_NUMBER_B || '',
        twiml: '<Response><Dial><Conference>' + process.env.TWILIO_CONFERENCE_NAME + '</Conference></Dial></Response>',
    });

    await wait(10000);
    
    
    await prospect.update({
        twiml: '<Response><Play digits="1w2" /><Dial><Conference>' + process.env.TWILIO_CONFERENCE_NAME + '</Conference></Dial></Response>'
    });
    
    
    return;
}
