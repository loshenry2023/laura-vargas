const validateRegisterInput = (data) => {
  const validationErrors = {};

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[0-9]{8,15}$/;
  const numberPattern = /^\d+$/;


  if (!data.userName) {
    validationErrors.userName = "Ingrese un correo electrónico";
  } else if (!emailPattern.test(data.userName)) {
    validationErrors.userName = "Correo electrónico no válido";
  }

  if (!data.name) {
    validationErrors.name = "Proporciona un nombre";
  } else if (data.name.length > 25) {
    validationErrors.name = "No debe exceder los 25 caracteres";
  }

  if (!data.lastName) {
    validationErrors.lastName = "Proporciona un apellido";
  } else if (data.lastName.length > 25) {
    validationErrors.lastName = "No debe exceder los 25 caracteres";
  }

  if (!data.phoneNumber1 || !numberPattern.test(data.phoneNumber1)) {
    validationErrors.phoneNumber1 = "Debe ingresar números";
  } else if (!data.phoneNumber1 || !phonePattern.test(data.phoneNumber1)) {
    validationErrors.phoneNumber1 = "Ingrese teléfono válido, 8-15 dig";
  } 

  if (data.phoneNumber2 && !phonePattern.test(data.phoneNumber2)) {
    validationErrors.phoneNumber2 = "Ingrese teléfono válido, 8-15 dig";
  }

  if (!data.specialtyName || data.specialtyName.length === 0) {
    validationErrors.specialtyName = "Selecciona al menos una especialidad";
  }

  if (!data.branch || data.branch.length === 0) {
    validationErrors.branch = "Selecciona al menos una sede";
  }

  if (!data.rol) {
    validationErrors.rol = "Selecciona un rol";
  }

  if (!data.commission || data.commission > 100 || data.commission < 0) {
    validationErrors.commission = "Ingrese comisión válida";
  }

  if (!data.notificationEmail) {
    validationErrors.notificationEmail = "ingrese correo electrónico";
  } else if (!emailPattern.test(data.notificationEmail)) {
    validationErrors.notificationEmail = "Correo electrónico no válido";
  }

  return validationErrors;

};

export default validateRegisterInput;