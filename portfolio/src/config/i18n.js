import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Les ressources de traduction (nous ajouterons les traductions dans un instant)
const resources = {
  en: {
    translation: {
      nav_about: "About",
      nav_projects: "Projects",
      nav_contact: "Contact",
      about_title1:
        "Hi, my name is Tom Hubert and I'm a junior web developer, welcome to my portfolio.",
      banner_text1: "Hey, I'm Tom !",
      banner_text2: "I'm a junior web developer",
      cards_content1: "year of experience",
      cards_content2: "years of study",
      cards_content3: "different mastered technologies",
      about_description_title: "About me",
      about_description:
        "I'm a young developer who has worked in various sectors, including sales. I've always had a passion for technology and computing in general. I'm looking for my first job as a web developer. I have experience from personal projects which you can view below (and there's many more on my GitHub).",
      project_title: "Projects",
      contact_title: "Contact me",
      contact_description:
        "If you wish to contact me, please send me a message on LinkedIn or an e-mail.",
      contact_github: "GitHub",
      contact_email: "E-mail",
      contact_linkedin: "LinkedIn",
      contact_sub_title: "Contact me via",
    },
  },
  fr: {
    translation: {
      nav_about: "À propos",
      nav_projects: "Projets",
      nav_contact: "Contact",
      about_title1:
        "Bonjour, je m'appelle Tom Hubert et je suis un développeur web junior, bienvenue sur mon portfolio.",
      banner_text1: "Salut, moi c'est Tom !",
      banner_text2: "Je suis un développeur web junior",
      cards_content1: "année d'expérience",
      cards_content2: "années d'études",
      cards_content3: "technologies maîtrisées",
      about_description_title: "À propos de moi",
      about_description:
        "Bonjour, je m'appelle Tom Hubert et je suis un développeur web junior, bienvenue sur mon portfolio. Je suis un jeune développeur qui a travaillé dans différents secteurs, dont la vente et une petite expérience en développement web. J'ai toujours été passionné par la technologie et l'informatique en général. Je suis à la recherche d'un premier réel emploi en tant que développeur web. J'ai de l'expérience dans des projets projets personnels que vous pouvez consulter ci-dessous (et il y en a beaucoup d'autres sur mon GitHub).",
      project_title: "Projets",
      contact_title: "Me contacter",
      contact_description:
        "Si vous souhaitez me contacter, veuillez m'envoyer un message sur LinkedIn ou un e-mail.",
      contact_github: "Mon GitHub",
      contact_email: "Mon E-mail",
      contact_linkedin: "Mon LinkedIn",
      contact_sub_title: "Me contacter sur",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
