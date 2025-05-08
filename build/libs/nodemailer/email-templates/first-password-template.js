"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firstPasswordTemplate = firstPasswordTemplate;
const env_1 = require("../../../configs/env");
function firstPasswordTemplate(name, primaryPassword) {
    const currentYear = new Date().getFullYear();
    return `
  <!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bem-vindo à Goody Cosméticos</title>
    <style>
      body {
        font-family: sans-serif;
        background-color: #f7f7f7;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
      .header {
        background-color: #f3f3f3;
        color: #ffffff;
        padding: 20px;
        text-align: center;
      }
      .header h1 {
        margin: 0;
        font-size: 20px;
        font-weight: bold;
        color: #b06d45;
      }
      .content {
        padding: 20px;
        color: #4b5563;
        line-height: 1.6;
      }
      .content h2 {
        margin-top: 0;
        color: #111827;
        font-size: 24px;
        font-weight: bold;
      }
      .content p {
        margin: 10px 0;
      }
      .button {
        text-align: center;
        margin: 20px 0;
      }
      .button a {
        background-color: #c78c6a;
        color: #f7f7f7;
        padding: 12px 30px;
        text-decoration: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: bold;
        display: inline-block;
        transition: background-color 0.3s;
      }
      .button a:hover {
        background-color: #af6f49;
      }
      .footer {
        background-color: #f3f3f3;
        color: #000000;
        text-align: center;
        padding: 15px;
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Bem-vindo à Goody Cosmésticos!</h1>
      </div>
      <div class="content">
        <h2>Olá, ${name}!</h2>
        <p>Para começar, aqui estão seus dados de acesso:</p>
        <p><strong>Senha:</strong> ${primaryPassword}</p>
        <p>
          Por motivos de segurança, recomendamos que você altere sua senha assim
          que acessar a plataforma.
        </p>
        <div class="button">
          <a href="${env_1.env.APP_URL}" target="_blank"
            >Acessar Goody Cosméticos</a
          >
        </div>
        <p>Atenciosamente, <br />Equipe Goody Cosméticos</p>
      </div>
      <div class="footer">
        © ${currentYear} Goody Cosméticos. Todos os direitos reservados.
      </div>
    </div>
  </body>
</html>

  `;
}
