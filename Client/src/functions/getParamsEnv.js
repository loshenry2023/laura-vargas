//! Unico lugar donde obtengo las variables de entorno.
export default function getParamsEnv() {
    const ROOT = import.meta.env.VITE_ROOT || '/';
    const LOGIN = import.meta.env.VITE_ROOT || '/login';
    const HOME = import.meta.env.VITE_HOME || '/home';

    return {ROOT, HOME, LOGIN}
}