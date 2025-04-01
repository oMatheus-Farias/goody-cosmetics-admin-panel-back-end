import { env } from '../../../configs/env';

export function forgotPasswordTemplete(name: string, token: string) {
  const redirectUrl = `${env.APP_URL}/reset-password?token=${token}`;

  return `
  <html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Goody Cosméticos - Redefinição de senha</title>
    <style>
      body {
        font-family: "Arial", sans-serif;
        background-color: #f4f4f9;
        margin: 0;
        padding: 0;
        color: #333333;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background: #ffffff;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 20px;
      }
      .header {
        text-align: center;
        padding: 20px 0;
        background-color: #f0f0f0;
        border-radius: 10px 10px 0 0;
      }
      .header h1 {
        color: #af6f49;
        margin: 0;
        font-size: 24px;
        font-weight: bold;
      }
      .content {
        padding: 20px;
        text-align: center;
        line-height: 1.6;
      }
      .content p {
        margin: 10px 0;
      }
      .button-container {
        margin: 20px 0;
      }
      .button-container a {
        color: #ffffff;
        text-decoration: none;
      }
      .button {
        background-color: #c78c6a;
        color: #f7f7f7;
        padding: 12px 20px;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
        display: inline-block;
        font-size: 16px;
        width: 400px;
        text-align: center;
        transition: background-color 0.3s ease;
        border: none;
        cursor: pointer;
        text-decoration: none;
      }
      .button:hover {
        background-color: #af6f49;
      }
      .footer {
        text-align: center;
        padding: 15px;
        font-size: 12px;
        color: #888888;
        border-top: 1px solid #eaeaea;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Goody Cosméticos - Redefinição de senha</h1>
      </div>
      <div class="content">
        <p>Olá, <strong>${name}</strong>!</p>
        <p>
          Você esqueceu sua senha? Não se preocupe, clique no botão abaixo para
          redefini-la.
        </p>
        <div class="button-container">
          <a href="${redirectUrl}" target="_blank" class="button"
            >Redefinir senha</a
          >
        </div>
        <p>Se você não solicitou essa redefinição, ignore este e-mail.</p>
        <p>Atenciosamente, <br />Equipe Goody Cosméticos</p>
      </div>
      <div class="footer">
        <p>
          &copy; ${new Date().getFullYear()} Goody Cosméticos. Todos os direitos
          reservados.
        </p>
      </div>
    </div>
  </body>
</html>

  `;
}
