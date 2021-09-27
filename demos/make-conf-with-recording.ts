import { Twilio } from 'twilio';
import { wait } from '../utils/wait';

export async function makeConferenceWithRecording(client: Twilio) {
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
    console.log('Starting recording.');
    
    const recording = await sdr.recordings().create({
        recordingStatusCallback: process.env.NGROK_URL + '/log',
        recordingStatusCallbackMethod: 'POST'
    });

    await wait(5000);
    console.log('Pausing recording.');

    recording.update({
        status: 'paused'
    });
    
    await wait(5000);
    console.log('Resuming recording.');

    recording.update({
        status: 'in-progress'
    });
    
    return;
}
