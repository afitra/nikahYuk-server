var nodemailer = require('nodemailer');

function sendEmailHelper(receiver, subjectMail, linkImage, ID) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.gmailUser,// process.env.PORT
            pass: process.env.gmailPass
        }
    });
    let contentHTML = ''
    if (subjectMail == '') {
        contentHTML = `<p style="text-align: center; ">
        <strong><em>hey ${process.env.company} ada yang membeli produk kamu lo,&nbsp;
        </em></strong></p><p style="text-align: center; "><strong>
        <em>segera cek pembayarannya</em></strong></p><p style="text-align: center; ">
        <strong>${ID}</strong></p><blockquote style="text-align: center; ">
        ( jangan tunjukan kode ini pada siapapun )</blockquote><br>
        <p style="text-align: center; "><img src= "${linkImage}" alt=""><br></p>`
    }
    var mailOptions = {
        from: process.env.gmailHost,
        to: receiver,
        subject: subjectMail,

        html: contentHTML  // html body
        // html: params.mailHtmlContent,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}



module.exports = {
    sendEmailHelper
}