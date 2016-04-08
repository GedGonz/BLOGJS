var nodemailer =  require( "nodemailer" );
var smtpTransport = nodemailer.createTransport ( "SMTP" ,{ 
   host: "smtp.gmail.com", // hostname
   secureConnection: false, // use SSL
   port: 587, // port for secure SMTP 
   auth :  { 
       user :  "yourmail@gmail.com" , 
       pass :  "yourpassword" 
   } 
});
module.exports.smtpTransport=smtpTransport;
