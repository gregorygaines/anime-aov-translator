import { SpeechRecognizer } from '../api/speech_recognizer';
import { Log } from '../Logger';

const maxCount = 30;
let count = 0;

class AudioRecorder {
  readonly MUTED_SIZE = 238;
  mediaRecorder: MediaRecorder;
  transcriber: SpeechRecognizer;
  audioTrack: MediaStreamTrack

  constructor(mediaStream: MediaStream, transcriber: SpeechRecognizer) {
    /* Get audio track from media stream so when a video pauses or muted,
       the stream stops too. If we don't do this, data would
       still stream from a muted or paused video using up transcribing credits.
       NVM doesn't work anymore, needs more experimentation. Right now using
       stream size of 238, might be a problem.
    */
    this.audioTrack = mediaStream.getAudioTracks()[0];
    const audioStream = new MediaStream();
    audioStream.addTrack(this.audioTrack);

    this.mediaRecorder = new MediaRecorder(audioStream, {
      mimeType: 'audio/webm'
    });

    this.transcriber = transcriber;

    this.mediaRecorder.addEventListener('dataavailable', this._handleDataAvailable);
  }

  _handleDataAvailable = (event: BlobEvent) => {
    if (event.data.size > 0 && event.data.size > this.MUTED_SIZE) {
      console.log("Data available");
      console.log(event.data);

      this.transcriber.transcribe(event.data);
    } else {
      console.log("Data too samll");
    }
  }

  startRecording = () => {
    Log.info("Start recording");
    // Deepgram recommends 1 second slices (https://github.com/deepgram/deepgram-node-sdk)

    // TODO find a way to find end of sentence for time slice.
    this.mediaRecorder.start(240);
   // this.mediaRecorder.start(350);
    // this.mediaRecorder.start(400);
  }

  isRecording = () => {
    return this.mediaRecorder.state !== "inactive";
  }

  stopRecording = () => {
    Log.info("Stopping recording");
    if (this.isRecording()) {
      this.mediaRecorder.stop();
    }
    this.transcriber.close();
  }

  destroy = () => {
    this.transcriber.close();
    this.stopRecording();
    this.audioTrack.stop();
    this.mediaRecorder.removeEventListener('dataavailable', this._handleDataAvailable);
  }
}

export { AudioRecorder };