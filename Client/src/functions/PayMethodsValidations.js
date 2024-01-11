function payMethodsValidation(name) {
    const errors = {};

    // Validación de nombre
    if (!name) {
        errors.name = "El nombre no puede estar vacío";
    } else if (name.length > 30) {
        errors.name = "El nombre no puede tener más de 30 caracteres";
    }

    return errors;
}

export default payMethodsValidation;