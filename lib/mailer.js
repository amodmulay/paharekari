//Send emails using this modules

var nodemailer = require('nodemailer');
/*
    Mailer function
    @param - (Object) opts - mailing options
    @param - (Function) fn - callback function
*/
var mailer = function(opts, callback) {

  // Send maail
  try {
    var transporter = nodemailer.createTransport();

    transporter.sendMail({
      from: opts.from,
      to: opts.to,
      subject: opts.subject,
      html: opts.body
    });
  } catch (err) {
    callback('Failed to send email', '');
  }
};

module.exports = mailer;
