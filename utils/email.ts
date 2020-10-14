const nodemailer = require('nodemailer');

const sendEmail = async (option: any) => {
    // create a transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    console.log(option)
    // define email options
    const mailOptions = {
        from: 'Chernov V. web-site.',
        to: option.email,
        subject: option.subject,
        text: option.message
    }
    // send email
    await transporter.sendMail(mailOptions).catch((err: any) => {
        console.log(err)
    });
};

module.exports = sendEmail;