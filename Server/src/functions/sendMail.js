// ! Envía una mail.
const util = require('util');
const showLog = require("../functions/showLog");
const { EMAIL, PASSWORD_EMAIL, NODEMAILER_HOST, NODEMAILER_PORT } = require("../functions/paramsEnv");

const sendMail = async (data) => {
    const { origin, target, subject, text, html } = data;
    // Por ahora sólo recibo text pero no lo uso ni valido.
    if (!origin || !target || !subject || !html) { throw Error("Faltan datos"); }
    try {
        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
            host: NODEMAILER_HOST,
            port: NODEMAILER_PORT,
            secure: true,
            auth: {
                user: EMAIL,
                pass: PASSWORD_EMAIL,
            },
        });
        const sendMailAsync = util.promisify(transporter.sendMail).bind(transporter);
        const mailOptions = {
            from: origin,
            to: target,
            subject: subject,
            // text: text,
            html: html,
        };
        const info = await sendMailAsync(mailOptions);
        showLog(`mail sent to: ${target}`);
        return { sent: 'ok', message: info.response };
    } catch (error) {
        showLog(`Error sending mail: ${error}`);
        throw Error("Error enviando mail: " + error);
    }
}
module.exports = sendMail;
