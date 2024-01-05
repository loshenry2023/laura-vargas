export default function converterGMT(date) {



  //console.log("RECIBO ", date);
  // Crear un objeto Date a partir de la cadena de fecha y hora
  const fechaObjeto = new Date(date);

  // Obtener año, mes y día
  const year = fechaObjeto.getUTCFullYear();
  const mes = (fechaObjeto.getUTCMonth() + 1).toString().padStart(2, '0'); // +1 porque los meses en JavaScript van de 0 a 11
  const dia = fechaObjeto.getUTCDate().toString().padStart(2, '0');

  // Obtener la hora y minutos
  const hora = fechaObjeto.getUTCHours().toString().padStart(2, '0');
  const minutos = fechaObjeto.getUTCMinutes().toString().padStart(2, '0');

  // Formatear la cadena de salida
  const cadenaFormateada = `${year}-${mes}-${dia} ${hora}:${minutos}`;
  //console.log("DEVUELVO ", cadenaFormateada);

  return cadenaFormateada;


  // const gmtPlus3TimeZone = 'Etc/GMT+3'; // Zona Horaria GMT+3

  // const formatDate = new Date(date).toLocaleString('en-US', {
  //   timeZone: gmtPlus3TimeZone,
  //   hourCycle: 'h23',
  // });

  // return formatDate;


  // const { timeZone } = Intl.DateTimeFormat().resolvedOptions()

  // const formatDate = new Date(date).toLocaleString(
  //   "en-US",
  //   {
  //     timeZone: timeZone,
  //     hourCycle: 'h23',
  //   }
  // );
  // return formatDate;
}