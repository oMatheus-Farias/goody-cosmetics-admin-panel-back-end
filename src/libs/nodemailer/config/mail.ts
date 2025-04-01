import nodemailer from 'nodemailer';

import { env } from '../../../configs/env';
import {
  firstPasswordTemplate,
  forgotPasswordTemplete,
} from '../email-templates';

export async function sendEmail(
  name: string,
  email: string,
  primaryPassword: string | null,
  token: string | null,
  action: string = 'first-access',
) {
  const MAIL_USER = env.MAIL_USER;
  const MAIL_PASS = env.MAIL_PASS;

  const transporter = nodemailer.createTransport({
    host: env.MAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS,
    },
  });

  const mailMessage = {
    from: {
      name: 'Goody Cosméticos',
      address: MAIL_USER as string,
    },
    to: email,
    subject:
      action === 'first-access'
        ? 'Primeiro acesso - Goody Cosméticos'
        : 'Redefinição de senha',
    html:
      action === 'first-access'
        ? firstPasswordTemplate(name, primaryPassword!)
        : forgotPasswordTemplete(name, token!),
    text:
      action === 'first-access'
        ? `Senha para primeiro acesso: ${primaryPassword}`
        : `Você solicitou a redefinição de senha? Se sim, utilize o token: ${token}`,
  };

  transporter
    .sendMail(mailMessage)
    .then(() => {
      if (env.NODE_ENV === 'development') {
        console.log('Email enviado com sucesso!');
      }
    })
    .catch((error) => {
      if (env.NODE_ENV === 'development') {
        console.error('Erro ao enviar email: ', error);
      }
    });
}
