import { Translator } from './translator';
import { AzureCognitiveTranslator } from './azure_cognitive_translator';
import { GoogleCloudTranslation } from './google_cloud_translation';

enum Translators {
  AZURE,
  GOOGLE
}

class TranslatorFactory {
  static createTranslator = (
    translator: Translators,
    handleOnTranslated: any,
  ): Translator => {
    switch (translator) {
      case Translators.AZURE:
        return new AzureCognitiveTranslator(handleOnTranslated);

      case Translators.GOOGLE:
        return new GoogleCloudTranslation(handleOnTranslated);

      default:
        throw new Error("Unknown translator " + translator);
    }
  };
}

export { TranslatorFactory, Translators };
