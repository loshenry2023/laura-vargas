//! Ejecuta una vez por día la notificación de próximos turnos a los pacientes.
const cron = require('node-cron');
const getAppointmentsReminder = require("../src/functions/getAppointmentsReminder");

function DailyNotification() {
    getAppointmentsReminder();
}

//cron.schedule('*/10 * * * * *', () => { // para pruebas de envíos frecuentes
cron.schedule('0 8 * * *', () => { // una vez al día a las 8 hs de Colombia
    DailyNotification();
}, {
    scheduled: true,
    timezone: 'America/Bogota'
});

module.exports = cron;