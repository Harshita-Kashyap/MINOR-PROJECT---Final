import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        login: "Login",
        vacancies: "Vacancies",
        notices: "Notices",
        disclaimer: "Disclaimer",
        disclaimerText: "This is official RAC website. Avoid fake portals.",
        search: "Search vacancies...",
        applyNow: "Apply Now",
        viewAd: "View Advertisement",
        activeAds: "Active Advertisements",
        view: "View",
        hide: "Hide",
        eligibility: "Eligibility",
        selection: "Selection",
        latest: "Latest",
        important: "Important",
        dates: "Dates",
        interviewSchedule: "Interview schedule released",
        resultsDeclared: "Final results declared",
        home: "Home",
        about: "About RAC",
        help: "Help",
        deadline: "Deadline",
        heroTitle: "Recruitment of Scientist ‘B’ in DRDO",
        heroSubtitle: "Direct recruitment for various scientific disciplines",
        videoText: "DRDO Recruitment Process"
      },
    },
    hi: {
      translation: {
        login: "लॉगिन",
        vacancies: "रिक्तियां",
        notices: "सूचनाएं",
        disclaimer: "अस्वीकरण",
        disclaimerText: "यह आधिकारिक RAC वेबसाइट है। फर्जी पोर्टल से बचें।",
        search: "रिक्तियां खोजें...",
        applyNow: "अभी आवेदन करें",
        viewAd: "विज्ञापन देखें",
        activeAds: "सक्रिय विज्ञापन",
        view: "देखें",
        hide: "छिपाएं",
        eligibility: "पात्रता",
        selection: "चयन",
        latest: "नवीनतम",
        important: "महत्वपूर्ण",
        dates: "तिथियां",
        interviewSchedule: "साक्षात्कार कार्यक्रम जारी",
        resultsDeclared: "अंतिम परिणाम घोषित",
        home: "होम",
        about: "RAC के बारे में",
        help: "सहायता",
        deadline: "अंतिम तिथि",
        heroTitle: "DRDO में वैज्ञानिक ‘B’ की भर्ती",
        heroSubtitle: "विभिन्न वैज्ञानिक विषयों में सीधी भर्ती",
        videoText: "DRDO भर्ती प्रक्रिया"
      },
    }
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;