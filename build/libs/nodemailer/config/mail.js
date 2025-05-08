"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("../../../configs/env");
const email_templates_1 = require("../email-templates");
function sendEmail(name_1, email_1, primaryPassword_1, token_1) {
    return __awaiter(this, arguments, void 0, function* (name, email, primaryPassword, token, action = 'first-access') {
        const MAIL_USER = env_1.env.MAIL_USER;
        const MAIL_PASS = env_1.env.MAIL_PASS;
        const transporter = nodemailer_1.default.createTransport({
            host: env_1.env.MAIL_HOST,
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
                address: MAIL_USER,
            },
            to: email,
            subject: action === 'first-access'
                ? 'Primeiro acesso - Goody Cosméticos'
                : 'Redefinição de senha',
            html: action === 'first-access'
                ? (0, email_templates_1.firstPasswordTemplate)(name, primaryPassword)
                : (0, email_templates_1.forgotPasswordTemplete)(name, token),
            text: action === 'first-access'
                ? `Senha para primeiro acesso: ${primaryPassword}`
                : `Você solicitou a redefinição de senha? Se sim, utilize o token: ${token}`,
        };
        transporter
            .sendMail(mailMessage)
            .then(() => {
            if (env_1.env.NODE_ENV === 'development') {
                console.log('Email enviado com sucesso!');
            }
        })
            .catch((error) => {
            if (env_1.env.NODE_ENV === 'development') {
                console.error('Erro ao enviar email: ', error);
            }
        });
    });
}
