import { Translator } from './translator';
import { config } from '../../config';

class GoogleCloudTranslation implements Translator {
  readonly BASE_URL = config.api.google.baseUrl;
  readonly ACCESS_TOKEN = config.api.google.accessKey;

  handleOnTranslated

  constructor(handleOnTranslated: any) {
    this.handleOnTranslated = handleOnTranslated;
  }

  translate(text: string): void {
    fetch(this.BASE_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.ACCESS_TOKEN}`,
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        "q": [text],
        "target": "en"
      })
      // TODO CHECK STATUS ON ALL FETCH CALLS 200
    }).then(response => response.json())
      .then(data => {
        console.log("Translated " + data.data.translations[0].translatedText);
        this.handleOnTranslated(data.data.translations[0].translatedText);
        // return data.data.translations[0].translatedText;
      }).catch((err) => {
      console.log(err);
      return "Error";
    });
  }
}

export { GoogleCloudTranslation };