//! Unico lugar donde obtengo las variables de entorno.
export default function getParamsEnv() {
    const HOME = import.meta.env.VITE_HOME || '/home';
    const ROOT = import.meta.env.VITE_ROOT || '/';
    return {ROOT, HOME}
}