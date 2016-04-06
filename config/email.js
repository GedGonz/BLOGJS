var nodemailer =  require( "nodemailer" );
var smtpTransport = nodemailer . createTransport ( "SMTP" ,{ 
   service :  "Gmail" , 
   auth :  { 
       user :  " gmail.gedgonz7@gmail.com" , 
       pass :  "*****" 
   } 
});
module.exports.smtpTransport=smtpTransport;
