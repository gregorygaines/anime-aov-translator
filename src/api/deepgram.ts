import { SpeechRecognizer } from './speech_recognizer';
import { Translator } from './translate/translator';
import { Log } from '../Logger';
import { config } from '../config';

class Deepgram implements SpeechRecognizer {
  BASE_URL = "wss://api.deepgram.com/v1/listen?language=ja"
  socket: WebSocket | undefined
  handleOnTranscribed: Translator['translate']

  constructor(handleOnTranscribed: Translator['translate'], handleOnSocketOpen) {
    this.handleOnTranscribed = handleOnTranscribed;
    this._connectToSocket((event) => {
      console.log("Socket init opened");
      handleOnSocketOpen();
    });
  }

  _connectToSocket = (onSocketOpen) => {
    Log.info("Connecting to socket");
    this.socket = new WebSocket(this.BASE_URL, ['token', config.api.deepgram]);
    this.socket.onclose = this._handleOnSocketClose;
    this.socket.onerror = this._handleOnSocketError;
    this.socket.onmessage = this._handleOnSocketMessage;
    this.socket.onopen = onSocketOpen;
  }

  _handleOnSocketMessage = (message: MessageEvent) => {
    Log.debug("Received message", message);

    const data = JSON.parse(message.data);

    const transcript = data.channel.alternatives[0].transcript;

    if (transcript.length > 0) {
      Log.info("Transcribed: ", transcript);
      this.handleOnTranscribed(transcript);
    }
  }

  _handleOnSocketClose = (err: Event) => {
    Log.info("Deepgram socket closing: ", err);

    Log.warn("Deepgram socket closing, attempting to connect");
    this._connectToSocket(() => {
      console.log("Opened closed deepgram socket");
      console.log(this.socket?.readyState);
      console.log("Open: " + WebSocket.OPEN);
      console.log("Clossed: " + WebSocket.CLOSED);
      console.log("Opening: " + WebSocket.CONNECTING);
      return;
    });
  }

  _handleOnSocketError = (err: Event) => {
    Log.error('Deepgram socket error: ', err);
    console.log(err);
  }

  transcribe = (data: Blob) => {
    console.log("Transcribing data");

    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.log("Sending to socket already openened");
      this.socket.send(data);
      return;
    }
  }

  close = () => {
    Log.info("Closing deepgram socket");
    this.socket?.close(1000);
  }
}

export { Deepgram };
