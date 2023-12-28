const editConsumableValidation = (originalData, newData) => {
  const validationErrors = {};

  // Validación de cambios
  if (
    Object.keys(newData).every(
      (key) => newData[key] === originalData[key] || key === "operation"
    )
  ) {
    validationErrors.noChanges = "No hubo modificaciones";
  }

  // Validación de cantidad en operación "subtract"
  if (
    newData.operation === "subtract" &&
    "amount" in newData &&
    "amount" in originalData &&
    parseInt(newData.amount, 10) < 0 &&
    originalData.amount - parseInt(newData.amount, 10) < 0
  ) {
    validationErrors.amountUnavailable = "Cantidad solicitada no disponible";
  }

  return validationErrors;
};

export default editConsumableValidation;
