interface SpeechRecognizer {
  transcribe(data: Blob): void;
  close(): void;
}

export { SpeechRecognizer };
