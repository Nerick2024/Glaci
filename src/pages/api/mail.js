// server.js - versión básica y funcional
require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const nodemailer = require('nodemailer');
const validator = require('validator');
const multer = require('multer');

const app = express();

// Middlewares mínimos
app.use(helmet()); // headers de seguridad básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // acepta peticiones desde cualquier origen

// Rate limiter simple para evitar abusos
app.use('/api/', rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 60_000),
  max: Number(process.env.RATE_LIMIT_MAX || 6),
  standardHeaders: true,
  legacyHeaders: false
}));

// Comprobar variables críticas (log si faltan)
['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'RECEIVER_EMAIL'].forEach(k => {
  if (!process.env[k]) console.warn(`WARN: missing env ${k}`);
});

// Configurar transporter SMTP (ajusta REJECT_UNAUTHORIZED si tu host tiene certificado problemático)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'mail.glaci.city',
  port: Number(process.env.SMTP_PORT || 465),
  secure: (process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465'), // true para 465
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  tls: { rejectUnauthorized: process.env.REJECT_UNAUTHORIZED !== 'false' }
});

// Verificar conexión SMTP al iniciar (útil para ver problemas de auth/host)
transporter.verify(err => {
  if (err) console.error('SMTP verify failed:', err && err.message ? err.message : err);
  else console.log('SMTP conectado correctamente');
});

// Healthcheck
app.get('/ping', (_, res) => res.json({ ok: true }));

const upload = multer();  // Create multer instance

// Endpoint para formulario de contacto: recibe name, email, message y manda correo
app.post('/api/contact', upload.none(), async (req, res) => {
  try {
    const name = (req.body.name || '').toString().trim();
    const email = (req.body.email || '').toString().trim();
    const message = (req.body.message || '').toString().trim();

    // Validaciones
    if (!name || !email || !message) return res.status(400).json({ success: false, error: 'Todos los campos son requeridos.' });
    if (!validator.isEmail(email)) return res.status(400).json({ success: false, error: 'Email inválido.' });
    if (name.length > 200 || email.length > 200 || message.length > 5000) return res.status(400).json({ success: false, error: 'Campos demasiado largos.' });

    // Sanitizar
    const safeName = validator.escape(name);
    const safeEmail = validator.normalizeEmail(email);
    const safeMessageHtml = validator.escape(message).replace(/\n/g, '<br>');

    const mail = {
      from: `"${process.env.SITE_NAME || 'Website'} (Formulario de Contacto)" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      replyTo: `${safeName} <${safeEmail}>`,
      subject: `Contacto: ${safeName}`,
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: Arial, sans-serif; background-color: #001f3f; color: #ffffff; padding: 20px; margin: 0; }
            .container { max-width: 600px; margin: 0 auto; background-color: #002b5b; border-radius: 10px; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.2); }
            h2 { color: #00bfff; text-align: center; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 12px 10px; text-align: left; border-bottom: 1px solid #00bfff; }
            th { color: #00bfff; font-weight: bold; }
            td { color: #ffffff; word-break: break-word; }
            .message { white-space: pre-wrap; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #a0a0a0; }
            @media screen and (max-width: 600px) {
              .container { padding: 15px; }
              th, td { padding: 10px 8px; font-size: 14px; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Mensaje de Contacto</h2>
            <table>
              <tr>
                <th>Nombre:</th>
                <td>${safeName}</td>
              </tr>
              <tr>
                <th>Email:</th>
                <td>${safeEmail}</td>
              </tr>
              <tr>
                <th>Mensaje:</th>
                <td class="message">${safeMessageHtml}</td>
              </tr>
            </table>
            <div class="footer">
              Enviado desde el formulario de contacto de ${process.env.SITE_NAME || 'Glaci City'}.
            </div>
          </div>
        </body>
        </html>
      `,
      text: `Nombre: ${name}\nEmail: ${safeEmail}\n\nMensaje:\n${message}`
    };

    const info = await transporter.sendMail(mail);
    return res.json({ success: true, messageId: info && info.messageId ? info.messageId : undefined });
  } catch (err) {
    console.error('/api/contact error:', err && (err.stack || err));
    return res.status(500).json({ success: false, error: err && err.message ? err.message : 'Error interno' });
  }
});

// Nuevo endpoint para formulario de información: recibe name, position, company, email, interest, message y manda correo
app.post('/api/register-info', upload.none(), async (req, res) => {
  try {
    const name = (req.body.name || '').toString().trim();
    const position = (req.body.position || '').toString().trim();
    const company = (req.body.company || '').toString().trim();
    const email = (req.body.email || '').toString().trim();
    const interest = (req.body.interest || '').toString().trim();
    const message = (req.body.message || '').toString().trim();

    // Validaciones
    if (!name || !position || !company || !email || !interest || !message) return res.status(400).json({ success: false, error: 'Todos los campos son requeridos.' });
    if (!validator.isEmail(email)) return res.status(400).json({ success: false, error: 'Email inválido.' });
    if (name.length > 200 || position.length > 200 || company.length > 200 || email.length > 200 || interest.length > 200 || message.length > 5000) return res.status(400).json({ success: false, error: 'Campos demasiado largos.' });

    // Sanitizar
    const safeName = validator.escape(name);
    const safePosition = validator.escape(position);
    const safeCompany = validator.escape(company);
    const safeEmail = validator.normalizeEmail(email);
    const safeInterest = validator.escape(interest);
    const safeMessageHtml = validator.escape(message).replace(/\n/g, '<br>');

    const mail = {
      from: `"${process.env.SITE_NAME || 'Website'} (Formulario de Información)" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      replyTo: `${safeName} <${safeEmail}>`,
      subject: `Registro de Información: ${safeName}`,
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: Arial, sans-serif; background-color: #001f3f; color: #ffffff; padding: 20px; margin: 0; }
            .container { max-width: 600px; margin: 0 auto; background-color: #002b5b; border-radius: 10px; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.2); }
            h2 { color: #00bfff; text-align: center; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 12px 10px; text-align: left; border-bottom: 1px solid #00bfff; }
            th { color: #00bfff; font-weight: bold; }
            td { color: #ffffff; word-break: break-word; }
            .message { white-space: pre-wrap; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #a0a0a0; }
            @media screen and (max-width: 600px) {
              .container { padding: 15px; }
              th, td { padding: 10px 8px; font-size: 14px; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Solicitud de Información</h2>
            <table>
              <tr>
                <th>Nombre:</th>
                <td>${safeName}</td>
              </tr>
              <tr>
                <th>Puesto:</th>
                <td>${safePosition}</td>
              </tr>
              <tr>
                <th>Empresa:</th>
                <td>${safeCompany}</td>
              </tr>
              <tr>
                <th>Email:</th>
                <td>${safeEmail}</td>
              </tr>
              <tr>
                <th>Interés:</th>
                <td>${safeInterest}</td>
              </tr>
              <tr>
                <th>Mensaje:</th>
                <td class="message">${safeMessageHtml}</td>
              </tr>
            </table>
            <div class="footer">
              Enviado desde el formulario de información de ${process.env.SITE_NAME || 'Glaci City'}.
            </div>
          </div>
        </body>
        </html>
      `,
      text: `Nombre: ${name}\nPuesto: ${position}\nEmpresa: ${company}\nEmail: ${safeEmail}\nInterés: ${interest}\n\nMensaje:\n${message}`
    };

    const info = await transporter.sendMail(mail);
    return res.json({ success: true, messageId: info && info.messageId ? info.messageId : undefined });
  } catch (err) {
    console.error('/api/register-info error:', err && (err.stack || err));
    return res.status(500).json({ success: false, error: err && err.message ? err.message : 'Error interno' });
  }
});

// Iniciar servidor
const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, () => console.log(`Contact API listening on http://localhost:${PORT}`));