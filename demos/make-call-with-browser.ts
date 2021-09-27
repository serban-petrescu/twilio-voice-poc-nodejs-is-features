import { Twilio } from "twilio";

export async function makeCallWithBrowser(client: Twilio) {
    const call = await client.calls.create({
        url: 'http://demo.twilio.com/docs/voice.xml',
        from: process.env.TWILIO_PHONE_NUMBER_A || '',
        to: 'client:' + process.env.TWILIO_CLIENT,
    });

    console.log(call);
    return call;
}