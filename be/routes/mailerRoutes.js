const nodemailer = require('nodemailer');
require("dotenv").config();
 
let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
    }
});
 
let mailDetails = {
    from: 'sirftumhitohomere@gmail.com',
    to: 'pcs27ji@gmail.com',
    subject: 'Test mail',
    text: 'you touch the routes ok'
};


exports.GetMailObject = function (to, subject, html, cc, bcc, attachments) {
    function MailException(message) {
        this.message = message;
        this.name = 'MailException';
    }
    var mailObject = {};
    if (to)
        mailObject.to = to;
    else
        throw new MailException("To field is maindatory");
    if (subject)
        mailObject.subject = subject;
    else
        throw new MailException("Subject is maindatory");
    if (html)
        mailObject.html = html;
    else
        throw new MailException("Body is maindatory");
    if (cc == null || cc == "")
        // mailObject.cc = cc;
        mailObject.cc = "premchand84123@gmail.com" //"noreply@credin.in";
    else
        mailObject.cc = cc
    if (bcc)
        mailObject.bcc = bcc;
    if (attachments)
        mailObject.attachments = attachments;
    

    return mailObject;
}


exports.sendEmail = function (contents, cb) {
  return mailTransporter.sendMail(mailDetails, function (err, info) {
    if (err) {
      console.log("Error Occurs");
      cb({ mailsuccess: false, data: null });
    } else {
      console.log("Email sent successfully");
      cb({ mailsuccess: true, data: info });
    }
  });
};

// exports.sendEmail = function (contents, cb) {
//     // contents.from ="vishal.test123456@gmail.com";
//     contents.from = "noreply@credin.in";
//     return transporter.sendMail(contents, function (error, info) {
//         if (error) {
//             console.log(error);
//             cb({ mailsuccess: false, data: null });
//         } else
//             cb({ mailsuccess: true, data: info });
//     });
// }