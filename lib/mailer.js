//Send emails using this modules

var nodemailer = require('nodemailer');
var config = require('../config.json')
  /*
      Mailer function
      @param - (Object) opts - mailing options
      @param - (Function) fn - callback function
  */
var mailer = function(callback) {

  // Send maail
  try {
    var transporter = nodemailer.createTransport();
    var self = this;
    transporter.sendMail({
      from: self.config.from,
      to: config.to,
      subject: "opts.subject",
      html: "opts.body"
    });
  } catch (err) {
    callback('Failed to send email', err);
  }
};

module.exports = mailer;
