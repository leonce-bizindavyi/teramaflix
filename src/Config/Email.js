const nodemailer = require('nodemailer');

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'teramaflix@gmail.com',
      pass: 'cbglwxpkcfeekrwj'
    }
  });
