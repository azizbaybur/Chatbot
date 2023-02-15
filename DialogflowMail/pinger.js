const http = require("http");

console.log("Program started. TIME = " + new Date());
// call service for every min
setInterval(function () {
  var time = new Date();

  if (time.getHours() > 6) {
    if (time.getHours() === 23) {
      if (time.getMinutes() <= 30) {
        try {
          http.get("<herokuapp>");
          console.log("Service is pinged. TIME = " + time);
          //restService.get("/");
        }
        catch (err) {
          var body = "Error: " + err.message + " TIME = " + time;
          setTimeout(() => Mail("Service cannot be pinged." + "\r\n" + body, "Heroku Service Ping Error"), 0);
          console.log("Serive cannot be pinged. TIME = " + time);
        }
      }
      else {
        console.log("Less than 30 min left to sleep. TIME = " + time);
      }
    }
    else {
      try {
        http.get("<herokuapp>");
        console.log("Service is pinged. TIME = " + time);
        //restService.get("/");
      }
      catch (err) {
        var body = "Error: " + err.message + " at TIME = " + time;
        setTimeout(() => Mail("Service cannot be pinged." + "\r\n" + body, "Heroku Service Ping Error"), 0);
        console.log("Serive cannot be pinged. TIME = " + time);
      }
    }
  }
  else {
    console.log("Sleeping time now. TIME = "  + time);
  }
}, 60000);

async function Mail(MailBody, MailSubject) {
  var smtpTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: '465',
    secure: 'true',
    auth: {
      type: 'Oauth2',
      user: '<user>',
      clientId: "<clientId>",
      clientSecret: "<clientSecret>",
      refreshToken: "<refreshToken>",
    }
  });
  var messageTemplate = {
    from: '"Display Name" <e-mail address>',
    to: '<e-mail address>',
    subject: MailSubject,
    text: MailBody,
    //html: req.body.content + '<\br>' + '<b>' +'This is html' + '<\b>',
  };
  try {
    // send mail with defined transport object
    //let info = await smtpTransport.sendMail(messageTemplate);
    (async () => {
      await smtpTransport.sendMail(messageTemplate);
      smtpTransport.close();
      return true;
      //return await info.messageId;
    })()
  }
  catch (err) {
    smtpTransport.close();
    return err.message;
  }
}