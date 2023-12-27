const validateEditAppointment = (data) => {

    const startTime = data.date_from.split(" ") 
    const endTime = data.date_to.split(" ")

    console.log(startTime[0], endTime[0])


    const validationErrors = {};


  
    const isValidTime = (time) => {
      const [hours, minutes] = time.split(':');
      const parsedHours = parseInt(hours, 10);
      const parsedMinutes = parseInt(minutes, 10);
      
  
      return (
        parsedHours >= 6 &&
        parsedHours < 20 &&
        (parsedHours !== 0 || parsedMinutes !== 0) && 
        parsedMinutes >= 0 &&
        parsedMinutes < 60
      );
    };
  
    if (!startTime[0] || !isValidTime(startTime[0])) {
      validationErrors.date_from = "Seleccione una hora de inicio válida entre las 6:00 am y las 20:00 pm";
    }
  
    if (!endTime[0] || !isValidTime(endTime[0])) {
      validationErrors.date_to = "Seleccione una hora de finalización válida entre las 6:00 am y las 20:00 pm";
    } else if (startTime[0] && endTime[0] && startTime[0] >= endTime[0]) {
      validationErrors.date_to = "La hora de finalización debe ser posterior a la hora de inicio";
    }
  
    return validationErrors;
  };
  
  export default validateEditAppointment;