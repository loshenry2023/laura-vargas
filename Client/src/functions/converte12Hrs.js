export default function converter12Hrs(date) {



  //console.log("RECIBO ", date);
  // Crear un objeto Date a partir de la cadena de fecha y hora

  // Obtener la hora y minutos
  let hora = date.split(":")[0]
  let minutos = date.split(":")[1]


  // Formatear la cadena de salida
  const cadenaFormateada = `${hora > 12 ? hora - 12 : hora}:${minutos} ${hora > 11 && hora < 24 ? 'PM': 'AM'}`;
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