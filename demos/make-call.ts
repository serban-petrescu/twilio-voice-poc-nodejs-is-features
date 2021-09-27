import { Twilio } from "twilio";

export async function makeCall(client: Twilio) {
    const call = await client.calls.create({
        url: 'http://demo.twilio.com/docs/voice.xml',
        from: process.env.TWILIO_PHONE_NUMBER_A || '',
        to: process.env.EXT_PHONE_NUMBER_A || '',
        
    });

    console.log(call);
    return call;
}