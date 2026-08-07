import nodemailer from "nodemailer";

interface ContactNotification {
  name: string;
  email: string;
  phone: string;
  message: string;
}

function getTransporter() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_APP_PASSWORD;
  if (!user || !pass) return null;

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export async function sendContactNotification(contact: ContactNotification) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn(
      "E-mail de notificação não enviado: EMAIL_USER/EMAIL_APP_PASSWORD não configurados."
    );
    return;
  }

  const to = process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER;

  try {
    await transporter.sendMail({
      from: `"Site Lara Café" <${process.env.EMAIL_USER}>`,
      to,
      replyTo: contact.email,
      subject: `Nova mensagem de contato — ${contact.name}`,
      text: `Nome: ${contact.name}\nE-mail: ${contact.email}\nTelefone: ${contact.phone}\n\nMensagem:\n${contact.message}\n\n---\nVeja e responda no painel: /admin/contacts`,
    });
  } catch (err) {
    console.error("Falha ao enviar e-mail de notificação de contato:", err);
  }
}
