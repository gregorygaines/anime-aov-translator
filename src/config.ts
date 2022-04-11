// TODO env variables
const config = {
  api: {
    deepgram: "API_KEY",
    azure: {
      baseUrl: "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=en",
      subscriptionKey: "SUBSCRIPTION_KEY",
      location: "LOCATION"
    },
    google: {
      baseUrl: "https://translation.googleapis.com/language/translate/v2",
      accessKey: "ACCESS_KEY",
    }
  },
  // TODO combine
  whiteListedDomains: {
    crunchyroll: "crunchyroll.com",
    hulu: "hulu.com",
    funimation: "funimation.com",
    vrv: "vrv.co",
    youtube: "youtube.com"
  },
  videoPosSelector: {
    crunchyroll: "#showmedia_video_box",
  }
};

export { config };
