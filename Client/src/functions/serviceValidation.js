function serviceValidation(service) {
    const errors = {};

    // Validación de nombre
    if (!service.name.trim()) {
        errors.name = "El nombre no puede estar vacío";
    } else if (service.name.length > 30) {
        errors.name = "El nombre no puede tener más de 30 caracteres";
    }

    // Validación de especialidad
    const parsedSpecialty = service.specialty && typeof service.specialty === 'string' ? JSON.parse(service.specialty) : service.specialty;

    if (!parsedSpecialty || (parsedSpecialty.id === undefined && parsedSpecialty !== "")) {
        errors.specialty = "Selecciona una especialidad válida";
    }

    // Validación de duración
    const durationNumber = parseInt(service.duration, 10);
    if (isNaN(durationNumber) || durationNumber <= 0 || durationNumber > 360) {
        errors.duration = "La duración debe ser un número entre 1 y 360";
    }

    // Validación de precio
    const priceNumber = parseFloat(service.price);
    if (isNaN(priceNumber) || priceNumber < 0) {
        errors.price = "El precio debe ser un número mayor o igual a 0";
    }

    // Validación de imagen
    if (!service.image.trim()) {
        errors.image = "La imagen no puede estar vacía";
    }

    return errors;
}

export default serviceValidation;