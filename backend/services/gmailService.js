import { google } from 'googleapis';
import oauth2Client from '../config/oauth2.js';

const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

export const sendEmail = async ({ to, subject, message }) => {
  const email = [
    `To: ${to}`,
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: ${subject}`,
    '',
    message,
  ].join('\n');

  const encodedEmail = Buffer.from(email).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedEmail,
    },
  });
};
