function branchValidation(branch) {
    const errors = {};

    // Validación de nombre
    if (!branch.name) {
        errors.name = "El nombre no puede estar vacío";
    } else if (branch.name.length > 30) {
        errors.name = "El nombre no puede tener más de 30 caracteres";
    }

    // Validación de dirección
    if (!branch.address) {
        errors.address = "La dirección no puede estar vacía";
    }

    // Validación de teléfono
    if (!branch.phone) {
        errors.phone = "El teléfono no puede estar vacío";
    } else if (isNaN(branch.phone) || branch.phone.length < 10 || branch.phone.length > 15) {
        errors.phone = "El teléfono debe ser un número válido entre 10 y 15 dígitos";
    }

    return errors;
}

export default branchValidation;