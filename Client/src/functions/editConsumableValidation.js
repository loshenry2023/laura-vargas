function editConsumableValidation(productName, supplier, amount, newPrice) {
  const errors = {};

  // Validación de caracteres especiales en nombre y proveedor
  const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
  if (specialCharsRegex.test(productName)) {
    errors.productName = "El nombre no puede contener caracteres especiales";
  }
  if (specialCharsRegex.test(supplier)) {
    errors.supplier = "El proveedor no puede contener caracteres especiales";
  }

  // Validación de cantidad no menor a 0
  if (parseInt(amount, 10) < 0) {
    errors.amount = "La cantidad no puede ser menor a 0";
  }

  // Validación de precio no menor a 0
  if (parseFloat(newPrice) < 0) {
    errors.newPrice = "El precio no puede ser menor a 0";
  }

  return errors;
}

export default editConsumableValidation;
