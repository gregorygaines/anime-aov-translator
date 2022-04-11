import { SpeechRecognizer } from './speech_recognizer';
import { Deepgram } from './deepgram';

enum SpeechRecognizers {
  Deepgram,
}

class SpeechRecognizerFactory {
  static createSpeechRecognizer = (speechRecognizer: SpeechRecognizers, handleOnTranscribed: any, handleOnSocketOpen): SpeechRecognizer => {
    switch (speechRecognizer) {
      case SpeechRecognizers.Deepgram:
        return new Deepgram(handleOnTranscribed, handleOnSocketOpen);

      default:
        throw new Error("Unknown Speech recognizer");
    }
  };
}

export { SpeechRecognizerFactory, SpeechRecognizers };
