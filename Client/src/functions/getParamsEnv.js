//! Unico lugar donde obtengo las variables de entorno.
export default function getParamsEnv() {
    const ROOT = import.meta.env.VITE_ROOT || '/';
    const LOGIN = import.meta.env.VITE_ROOT || '/login';
    const HOME = import.meta.env.VITE_HOME || '/home';
    const USERPROFILES = import.meta.env.VITE_ROOT || '/userProfiles';
    const USERDETAIL = import.meta.env.VITE_ROOT || '/detail/:id';

    return {ROOT, HOME, LOGIN, USERPROFILES}
}