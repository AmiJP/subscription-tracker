import nodemailer from 'nodemailer';
import { EMAIL_PASSWORD } from './env.js';

export const accountEmail = "amipatel46226@gmail.com"

const transporter =nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:"amipatel46226@gmail.com",
        pass:EMAIL_PASSWORD
    }
})
export default transporter;