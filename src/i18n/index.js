import ptBrDictionary from "./dictionaries/pt-BR.json";
import enUsDictionary from "./dictionaries/en-US.json";

const dictionaries = {
  "en-US": enUsDictionary,
  "pt-BR": ptBrDictionary,
};

const useI18n = (router) => {
  if (!router) {
    console.error(
      "I need a Next router to apply internationalization for the project."
    );
  }

  return {
    t: (keyMessage) => {
      const dictionary = dictionaries[router.locale || router.defaultLocale];
      const message = keyMessage
        .split(".")
        .reduce(
          (messages, context) => (messages ? messages[context] : ""),
          dictionary
        );
      return message;
    },
  };
};

export { useI18n };
