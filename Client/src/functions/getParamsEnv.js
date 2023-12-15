//! Unico lugar donde obtengo las variables de entorno.
export default function getParamsEnv() {
    const ROOT = import.meta.env.VITE_ROOT || '/';
    const LOGIN = import.meta.env.VITE_ROOT || '/login';
    const HOME = import.meta.env.VITE_HOME || '/home';
    const USERPROFILES = import.meta.env.VITE_ROOT || '/userProfiles';
    const USERDETAIL = import.meta.env.VITE_ROOT || '/detail/:id';
    const API_URL_BASE = import.meta.env.VITE_API_URL_BASE || 'http://localhost:3001/laura-vargas';

    return {ROOT, HOME, LOGIN, USERPROFILES, API_URL_BASE}
}