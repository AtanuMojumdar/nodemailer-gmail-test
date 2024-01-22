const express = require("express");
require('dotenv').config();
const nodemailer = require("nodemailer");

const USER_NAME = process.env.MAIL;
const APP_PASSWORD = process.env.APP_PASSWORD;

const mailRouter = express.Router();

mailRouter.post("/", async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: "eino.christiansen74@ethereal.email",
                pass: "WBpQ57kHeWtwXWW7C2",
            },
        });

        const otp = Math.floor(100000 + Math.random() * 900000);

        const info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: "Otp", // Subject line
            text: `Your one time password(OTP): ${otp}`, // plain text body
            html: `<b>Your one time password(OTP): ${otp}</b>`, // html body
        });

        return res.send("OK Mail" + info.messageId)
    } catch (err) {
        console.log(err.message);
        return res.status(400).send("Internal Server Error!");
    }
});

mailRouter.post("/real", async(req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: USER_NAME,
                pass: APP_PASSWORD,
            },
        });

        const mailOptions = {
            from: "your_email@gmail.com",
            to: "atanu19mojumdar@gmail.com",
            subject: "Hello from Nodemailer",
            text: "This is a test email sent using Nodemailer.",
        };

        const info = await transporter.sendMail(mailOptions);
        return res.send("OK Mail" + info.messageId)

    }
    catch (err) {
        console.log(err.message);
        return res.status(400).send("Internal Server Error!");
    }
});

module.exports = mailRouter;
