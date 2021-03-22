var config = require('../config/configapp');
var nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const createTransporter = async() => {

    console.log(config.email);
    console.log(config.passwordEmail);



    const oauth2Client = new OAuth2(
        config.cliente_id,
        config.cliente_secret,
        "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
        refresh_token: config.refresh_tocken
    });

    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
            if (err) {
                reject();
            }
            console.log('tocke:' + token)
            resolve(token);
        });
    });

    const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: config.email,
            accessToken,
            clientId: config.cliente_id,
            clientSecret: config.cliente_secret,
            refreshToken: config.refresh_tocken
        },
        tls: {
            rejectUnauthorized: false
        },
    });

    return smtpTransport;
}


module.exports.createTransporter = createTransporter;