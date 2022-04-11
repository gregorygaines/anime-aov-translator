import { Translator } from './translator';
import { config } from '../../config';

class AzureCognitiveTranslator implements Translator {
  readonly BASE_URL = config.api.azure.baseUrl;
  readonly ACCESS_TOKEN = config.api.azure.subscriptionKey;
  readonly LOCATION = config.api.azure.location;

  handleOnTranslated

  constructor(handleOnTranslated: any) {
    this.handleOnTranslated = handleOnTranslated;
  }

  translate = (text: string) => {
    fetch(this.BASE_URL, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": `${this.ACCESS_TOKEN}`,
        'Ocp-Apim-Subscription-Region': this.LOCATION,
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify([{text: text}]),
      // TODO CHECK STATUS ON ALL FETCH CALLS 200
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        console.log("Translated: " + data[0].translations[0].text);

        this.handleOnTranslated(data[0].translations[0].text);
       // return data[0].translations[0].text;
      }).catch((err) => {
      console.log(err);
     // return "Error";
    });
  }
}

export { AzureCognitiveTranslator }