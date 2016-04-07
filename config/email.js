var nodemailer =  require( "nodemailer" );
var smtpTransport = nodemailer.createTransport ( "SMTP" ,{ 
   host: "smtp.gmail.com", // hostname
   secureConnection: false, // use SSL
   port: 587, // port for secure SMTP 
   auth :  { 
       user :  "gedgonz7@gmail.com" , 
       pass :  "gedgonz91" 
   } 
});
module.exports.smtpTransport=smtpTransport;
