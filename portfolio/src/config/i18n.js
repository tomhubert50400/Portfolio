import i18n from "i18next";
import { initReactI18next } from "react-i18next";

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
      project_visit: "Visit my project here",
      contact_description:
        "If you wish to contact me, please send me a message on LinkedIn or an e-mail.",
      contact_github: "GitHub",
      contact_email: "E-mail",
      contact_linkedin: "LinkedIn",
      contact_sub_title: "Contact me via",
      tooltip_github: "View my GitHub",
      tooltip_linkedin: "View my LinkedIn",
      tooltip_instagram: "View my Instagram",
      form_name: "Your name",
      form_email: "Your email",
      form_phone: "Your phone number",
      form_message: "Your message",
      form_submit: "Send",
      form_success: "Thank you for your message! I’ll get back to you shortly.",
      form_error: "An error occurred. Please try again later.",
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
      project_visit: "Visitez mon projet ici",
      contact_title: "Me contacter",
      contact_description:
        "Si vous souhaitez me contacter, veuillez m'envoyer un message sur LinkedIn ou un e-mail.",
      contact_github: "Mon GitHub",
      contact_email: "Mon E-mail",
      contact_linkedin: "Mon LinkedIn",
      contact_sub_title: "Me contacter sur",
      tooltip_github: "Voir mon GitHub",
      tooltip_linkedin: "Voir mon LinkedIn",
      tooltip_instagram: "Voir mon Instagram",
      form_name: "Votre nom",
      form_email: "Votre e-mail",
      form_phone: "Votre numéro de téléphone",
      form_message: "Votre message",
      form_submit: "Envoyer",
      form_success: "Merci pour votre message ! Je vous répondrai rapidement.",
      form_error: "Une erreur est survenue. Veuillez réessayer plus tard.",
    },
  },
  ko: {
    translation: {
      nav_about: "소개",
      nav_projects: "프로젝트",
      nav_contact: "연락처",
      about_title1:
        "안녕하세요, 저는 Tom Hubert입니다. 주니어 웹 개발자입니다. 제 포트폴리오에 오신 것을 환영합니다.",
      banner_text1: "안녕하세요, 톰이에요!",
      banner_text2: "저는 주니어 웹 개발자입니다",
      cards_content1: "년 경력",
      cards_content2: "년 공부",
      cards_content3: "마스터한 기술",
      about_description_title: "자기소개",
      about_description:
        "저는 다양한 분야에서 일한 경험이 있는 젊은 개발자입니다. 기술과 컴퓨터에 대한 열정을 가지고 있으며 첫 웹 개발자 직장을 찾고 있습니다. 아래에서 개인 프로젝트를 확인하실 수 있습니다 (GitHub에도 많아요).",
      project_title: "프로젝트",
      project_visit: "프로젝트 보러가기",
      contact_title: "연락하기",
      contact_description:
        "연락하시려면 LinkedIn이나 이메일을 통해 메시지를 보내주세요.",
      contact_github: "깃허브",
      contact_email: "이메일",
      contact_linkedin: "링크드인",
      contact_sub_title: "연락 방법",
      tooltip_github: "내 GitHub 보기",
      tooltip_linkedin: "내 LinkedIn 보기",
      tooltip_instagram: "내 Instagram 보기",
      form_name: "성함",
      form_email: "이메일 주소",
      form_phone: "전화번호",
      form_message: "메시지 내용",
      form_submit: "보내기",
      form_success:
        "메시지를 보내주셔서 감사합니다. 가능한 한 빠르게 답변드리겠습니다.",
      form_error: "오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
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
