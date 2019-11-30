 
var nodemailer = require('nodemailer');
const gmailUser = process.env.gmailUser
const gmailPass = process.env.gmailPass
const transporter = nodemailer.createTransport({
    service: 'Gmail',
  auth: {
    user: gmailUser,
    pass: gmailPass
  } 
});

var mailOptions = {
    from:gmailUser,
    to:'loeby45@gmail.com',
    subject: 'Kunilo Discount ip to 50%',

    html: '<b>Hello doyo shop on Kunilo Store ?</b>' // html body
    // html: params.mailHtmlContent,
};
transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
module.exports = transporter;