//! Unico lugar donde obtengo las variables de entorno.
export default function getParamsEnv() {
  const ROOT = import.meta.env.VITE_ROOT || "/";
  const LOGIN = import.meta.env.VITE_LOGIN || "/login";
  const HOME = import.meta.env.VITE_HOME || "/home";
  const USERPROFILES = import.meta.env.VITE_PROFILES || "/userProfiles";
  const USERDETAIL = import.meta.env.VITE_DETAIL || "/detail/:id";
  const USERDETAILBASE = import.meta.env.VITE_DETAIL_BASE || "/detail";
  const TERMSANDPRIVACY = import.meta.env.VITE_TERMS_AND_PRIVACY || "/terms-and-privacy"
  const API_URL_BASE = import.meta.env.VITE_API_URL_BASE || "http://localhost:3001/laura-vargas";

  const CLOUD_NAME = import.meta.env.VITE_APP_CLOUD_NAME || "doqyrz0sg";
  const UPLOAD_PRESET = import.meta.env.VITE_APP_UPLOAD_PRESET || "gcx7ffyb";

  const FIREBASE_API_KEY = import.meta.env.VITE_APP_FIREBASE_API_KEY || "AIzaSyAgacLbFO0UUII7SX_COA6tTgDCJh5MyIU";
  const FIREBASE_AUTH_DOMAIN =
    import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN ||
    "laura-vargas-7f3ad.firebaseapp.com";
  const FIREBASE_PROJECT_ID =
    import.meta.env.VITE_APP_FIREBASE_PROJECT_ID || "laura-vargas-7f3ad";
  const FIREBASE_STORAGE_BUCKET =
    import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET ||
    "laura-vargas-7f3ad.appspot.com";
  const FIREBASE_MESSAGING_SENDER_ID =
    import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID || "658315611360";
  const FIREBASE_APP_ID =
    import.meta.env.VITE_APP_FIREBASE_APP_ID ||
    "1:658315611360:web:56f139b3d2af20fb13d485";

  return {
    ROOT,
    HOME,
    LOGIN,
    USERDETAIL,
    TERMSANDPRIVACY,
    USERDETAILBASE,
    USERPROFILES,
    API_URL_BASE,
    CLOUD_NAME,
    UPLOAD_PRESET,
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID,
  };
}
