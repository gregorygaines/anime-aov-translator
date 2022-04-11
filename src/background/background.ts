// Init on startup
import { AudioRecorder } from './audio_recorder';
import { SpeechRecognizerFactory, SpeechRecognizers } from '../api/speech_recognizer_factory';
import { TranslatorFactory, Translators } from '../api/translate/translator_factory';
import { Storage } from './storage';
import { Log } from '../Logger';
import { isDomainAllowListed } from '../api/allow_listed_sites';

chrome.runtime.onInstalled.addListener(() => {
  console.log('Installed');

  // Init storage
  new Storage();
});

let audioRecorder: AudioRecorder;
let activeTabId = -1;

const handleStopRecording = () => {
  if (audioRecorder) {
    Log.debug('Destroying current recorder');
    audioRecorder.destroy();
  }

  handleUpdateFrontendStopRecording();
}

const handleUpdateFrontendStopRecording = () => {
  // TODO replace with a front-end change and not a full reload.
  // chrome.runtime.reload();
}

const handleStartRecording = () => {

  chrome.windows.getCurrent((window) => {
    chrome.tabs.query({ active: true, windowId: window.id }, (tabs) => {
      handleStopRecording();

      const tabId = tabs[0].id;
      const tabUrl = tabs[0].url;

      console.log(tabs[0]);

      if (!tabUrl) {
        Log.warn('Empty tab URL');
        handleUpdateFrontendStopRecording();
        return;
      }

      if (tabUrl.includes('chrome://')) {
        Log.info('Ignoring chrome url');
        handleUpdateFrontendStopRecording();
        return;
      }

      const domain = new URL(tabUrl || '').hostname.replace('www.', '');

      isDomainAllowListed(domain).then((isAllowListed) => {
        if (!isAllowListed) {
          Log.info('Domain isn\'t allow listed:', domain);
          handleUpdateFrontendStopRecording();
          return;
        }

        console.log('Continuing stuff ' + domain);

        if (!tabs || tabs.length === 0) {
          Log.warn('Unable to capture a tab');
          handleUpdateFrontendStopRecording();
          return;
        }

        if (tabId) {
          if (tabId != activeTabId) {
            activeTabId = tabId;
          }
        }

        chrome.tabCapture.capture({ audio: true, video: false }, (mediaStream) => {
          if (!mediaStream) {
            Log.warn('Unable to get tab stream');
            handleUpdateFrontendStopRecording();
            return;
          }

          const handleTextTranslated = (translated: string) => {
            Log.debug('Translated: ' + translated);

            const clientMessage = {
              command: "draw_text",
              data: translated,
            }

            chrome.tabs.sendMessage(activeTabId, clientMessage, (response) => {
              console.log("Sending text to client: " + translated);
              console.log(response);
            });
          };

          const translator = TranslatorFactory.createTranslator(Translators.AZURE, handleTextTranslated);
          const transcriber = SpeechRecognizerFactory.createSpeechRecognizer(SpeechRecognizers.Deepgram, translator.translate, () => {
            // Prevent tabCapture from muting tabs (shorturl.at/pyFTY)
            const audioContext = new AudioContext();
            audioContext.createMediaStreamSource(mediaStream).connect(audioContext.destination);
            audioRecorder = new AudioRecorder(mediaStream, transcriber);
            audioRecorder.startRecording();
          });
        });
      });
    });
  });
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.command) {
    case "start_recording":
      handleStartRecording();
      sendResponse(true);
      return true;

    case "stop_recording":
      handleStopRecording();
      sendResponse(true);
      return true;
  }
});

// Stop recording on tab change
chrome.tabs.onActivated.addListener(() => {
  handleStopRecording();
  chrome.tabs.query({ active: true }, (tabs) => {
    const id = tabs[0].id;

    chrome.tabs.sendMessage(id, {command: "stopped_recording"}, function(response) {
      console.log(response);
    });
  });
});