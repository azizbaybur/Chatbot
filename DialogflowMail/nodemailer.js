"use strict";
const nodemailer = require("nodemailer");


async function Mail(MailBody, MailSubject){
  var smtpTransport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: '465',
      secure: 'true',
      auth:{
          type:'Oauth2',
          user: '<user>',
          clientId: "<clientId>",
          clientSecret: "<clientSecret>",
          refreshToken: "<refreshToken>"",
      }
  });
  var messageTemplate = {
      from: '"<Display Name>" <e-mail address>',
      to: '<e-mail address>',
      subject: MailSubject,
      text: MailBody,
      //html: req.body.content + '<\br>' + '<b>' +'This is html' + '<\b>',
  };
  try{
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

const express = require('express');
const router = express.Router();
const nodeMailer = require('nodemailer');
//var clientSecret = require('../client_secret');