export default function formatDate(inputFecha) {

    if(!inputFecha){
        return
    }
    else {
        const fechaObject = new Date(inputFecha);
        const year = fechaObject.getFullYear();
        const month = String(fechaObject.getMonth() + 1).padStart(2, '0'); // Meses son indexados desde 0
        const day = String(fechaObject.getDate()).padStart(2, '0');
        const formattedFecha = `${year}-${month}-${day}`;
        return formattedFecha;
    }
  }