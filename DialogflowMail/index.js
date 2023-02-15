"use strict";

const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
const express = require("express");
const bodyParser = require("body-parser");

const restService = express();
restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);
restService.use(bodyParser.json());

restService.post("/mail", function (req, res) {
  // form_tipi
  var form_tipi =
    req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.form_tipi
      ? req.body.queryResult.parameters.form_tipi : "Form tipi hatalı!";
  // sicil no
  var sicil_no_yillik =
    req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.sicil_no_yillik
      ? req.body.queryResult.parameters.sicil_no_yillik : "Sicil no hatalı!";
  var sicil_no_gunluk =
    req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.sicil_no_gunluk
      ? req.body.queryResult.parameters.sicil_no_gunluk : "Sicil no hatalı!";
  var sicil_no_saatlik =
    req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.sicil_no_saatlik
      ? req.body.queryResult.parameters.sicil_no_saatlik : "Sicil no hatalı!";
  // baslangic tarihi
  var baslangic_tarihi_yillik =
    req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.baslangic_tarihi_yillik
      ? req.body.queryResult.parameters.baslangic_tarihi_yillik : "Baslangıç tarihi hatalı!";
  var baslangic_tarihi_gunluk =
    req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.baslangic_tarihi_gunluk
      ? req.body.queryResult.parameters.baslangic_tarihi_gunluk : "Baslangıç tarihi hatalı!";
  var baslangic_tarihi_saatlik =
    req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.baslangic_tarihi_saatlik
      ? req.body.queryResult.parameters.baslangic_tarihi_saatlik : "Baslangıç tarihi hatalı!";
  // bitis tarihi
  var bitis_tarihi_yillik =
    req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.bitis_tarihi_yillik
      ? req.body.queryResult.parameters.bitis_tarihi_yillik : "Bitiş tarihi hatalı!";
  var bitis_tarihi_gunluk =
    req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.bitis_tarihi_gunluk
      ? req.body.queryResult.parameters.bitis_tarihi_gunluk : "Bitiş tarihi hatalı!";
  // baslangic saati
  var baslangic_saati_saatlik =
    req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.baslangic_saati_saatlik
      ? req.body.queryResult.parameters.baslangic_saati_saatlik : "Başlangıç saati hatalı!";
  // bitis saati
  var bitis_saati_saatlik =
    req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.bitis_saati_saatlik
      ? req.body.queryResult.parameters.bitis_saati_saatlik : "Bitiş saati hatalı!";
  // masraf turu
  var masraf_turu =
    req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.masraf_turu
      ? req.body.queryResult.parameters.masraf_turu : "Masraf türü hatalı!";
  // masraf yeri
  var masraf_yeri =
    req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.masraf_yeri
      ? req.body.queryResult.parameters.masraf_yeri : "Masraf yeri hatalı!";
  // masraf tutari
  var masraf_tutari =
    req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.masraf_tutari
      ? req.body.queryResult.parameters.masraf_tutari : "Masraf tutarı hatalı!";
  // cikis alim durumu
  var cikis_alim_durumu =
    req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.cikis_alim_durumu
      ? req.body.queryResult.parameters.cikis_alim_durumu : "Çıkış alım durumu hatalı!";
  // durak bilgisi
  var durak_bilgisi =
    req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.durak_bilgisi
      ? req.body.queryResult.parameters.durak_bilgisi : "Durak bilgisi hatalı!";
  // avans durumu
  var avans_durumu =
    req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.avans_durumu
      ? req.body.queryResult.parameters.avans_durumu : "Avans durumu hatalı!";
  // onay durumu
  var onay_durumu =
    req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.onay_durumu
      ? req.body.queryResult.parameters.onay_durumu : "Onay durumu hatalı!";

  // ~ONAYLANDI~
  if (onay_durumu.toUpperCase() === "ONAY") {

    //  1 - Gunluk Mazeret
    if (form_tipi === 'gunluk_mazeret') {
      var MailBody = "Sicil No: " + sicil_no_gunluk + "\r\n" + "İzin Baş Tarihi: " + baslangic_tarihi_gunluk.substring(0, 10) +
        "\r\n" + "İş Başı Tarihi: " + bitis_tarihi_gunluk.substring(0, 10) + "\r\n" + "Mazeret Tipi: Günlük";
      try {
        var msg = setTimeout(() => Mail(MailBody, "Mazeret"), 0); //send mail immediately
        //var msg = Mail(MailBody, "Yıllık İzin");  //send mail
        if (msg) {
          return res.json({
            fulfillmentText: "Talebiniz alındı. Onay mail ile bildirilecektir. ",
            source: "dialog-flow-mail-sample"
          })
        }
        else {
          return res.json({
            fulfillmentText: "Error: " + msg,
            source: "dialog-flow-mail-sample"
          })
        }
      }
      catch (err) {
        return res.json({
          fulfillmentText: err.message,
          source: "dialog-flow-mail-sample"
        })
      }
    }
    //  2 - Saatlik Mazeret
    else if (form_tipi === 'saatlik_mazeret') {
      var MailBody = "Sicil No: " + sicil_no_saatlik + "\r\n" + "İzin Baş Tarihi: " + baslangic_tarihi_saatlik.substring(0, 10) + " - " + baslangic_saati_saatlik.substring(11, 16) +
        "\r\n" + "İş Başı Tarihi: " + baslangic_tarihi_saatlik.substring(0, 10) + " - " + bitis_saati_saatlik.substring(11, 16) + "\r\n" + "Mazeret Tipi: Saatlik";
      try {
        var msg = setTimeout(() => Mail(MailBody, "Mazeret"), 0); //send mail immediately
        //var msg = Mail(MailBody, "Yıllık İzin");  //send mail
        if (msg) {
          return res.json({
            fulfillmentText: "Talebiniz alındı. Onay mail ile bildirilecektir. ",
            source: "dialog-flow-mail-sample"
          })
        }
        else {
          return res.json({
            fulfillmentText: "Error: " + msg,
            source: "dialog-flow-mail-sample"
          })
        }
      }
      catch (err) {
        return res.json({
          fulfillmentText: err.message,
          source: "dialog-flow-mail-sample"
        })
      }
    }
    //  3 - Yillik Izin
    else if (form_tipi === 'yillik_izin') {
      if (avans_durumu.toUpperCase() === "EVET" || avans_durumu.toUpperCase() === "HAYIR") {
        var MailBody = "Sicil No: " + sicil_no_yillik + "\r\n" + "Avans: " + avans_durumu.toUpperCase()
          + "\r\n" + "İzin Baş Tarihi: " + baslangic_tarihi_yillik.substring(0, 10) + "\r\n" + "İş Başı Tarihi: " + bitis_tarihi_yillik.substring(0, 10);
        try {
          var msg = setTimeout(() => Mail(MailBody, "Yıllık İzin"), 0); //send mail immediately
          //var msg = Mail(MailBody, "Yıllık İzin");  //send mail
          if (msg) {
            return res.json({
              fulfillmentText: "Talebiniz alındı. Onay mail ile bildirilecektir. ",
              source: "dialog-flow-mail-sample"
            })
          }
          else {
            return res.json({
              fulfillmentText: "Error: " + msg,
              source: "dialog-flow-mail-sample"
            })
          }
        }
        catch (err) {
          return res.json({
            fulfillmentText: err.message,
            source: "dialog-flow-mail-sample"
          })
        }
      }
      else {
        return res.json({
          fulfillmentText: "Hatalı data girişi, tekrar kayıt oluşturun.",
          source: "dialog-flow-mail-sample"
        })
      }
    }
    // Hatali Form
    else {
      return res.json({
        fulfillmentText: "Form tipi hatalı, lütfen tekrar kayıt oluşturun.",
        source: "dialog-flow-mail-sample"
      });
    }
  }
  // ~IPTAL EDILDI~
  else if (onay_durumu.toUpperCase() === "IPTAL" || "İPTAL") {
    return res.json({
      fulfillmentText: "Form talebi iptal edildi.",
      source: "dialog-flow-mail-sample"
    });
  }
  else {
    return res.json({
      fulfillmentText: "Geçersiz giriş, form talebi iptal edildi.",
      source: "dialog-flow-mail-sample"
    });
  }
});

restService.listen(process.env.PORT || 8000, function () {
  console.log("Server up and listening..");
});

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
    from: '"<Display Name>" <e-mail address>',
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