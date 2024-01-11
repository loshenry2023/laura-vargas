//! Ejecuta una vez por día la notificación de próximos turnos a los pacientes.
const cron = require('node-cron');
const getAppointmentsReminder = require("../src/functions/getAppointmentsReminder");

function DailyNotification() {
    getAppointmentsReminder();
}

cron.schedule('*/10 * * * * *', () => { // para pruebas de envíos frecuentes
    //cron.schedule('0 * * * *', () => { // Every hour
    //cron.schedule('0 9,17 * * *', () => { // a las 9hs y a las 17hs de Colombia
    //cron.schedule('0 8 * * *', () => { // una vez al día a las 8hs de Colombia
    DailyNotification();
}, {
    scheduled: true,
    timezone: 'America/Bogota'
});

module.exports = cron;