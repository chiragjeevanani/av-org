import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import Settings from '../models/Settings.js';

const loadTemplate = (templateName, variables = {}) => {
  try {
    const layoutPath = path.join(process.cwd(), 'src', 'templates', 'layout.html');
    const templatePath = path.join(process.cwd(), 'src', 'templates', 'emails', `${templateName}.html`);

    let layout = fs.readFileSync(layoutPath, 'utf8');
    let body = fs.readFileSync(templatePath, 'utf8');

    // Replace body content placeholders
    Object.keys(variables).forEach(key => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      body = body.replace(regex, variables[key] || '');
      layout = layout.replace(regex, variables[key] || '');
    });

    // Insert body into layout
    let fullHtml = layout.replace('{{bodyContent}}', body);
    return fullHtml;
  } catch (error) {
    console.error(`[EmailService] Error loading template ${templateName}:`, error.message);
    return null;
  }
};

const getEmailConfig = async () => {
  try {
    const settings = await Settings.findOne().maxTimeMS(3000);
    return {
      receiverEmail: settings?.emailSettings?.receiverEmail || process.env.INQUIRY_RECEIVER_EMAIL || 'avgroup284@gmail.com',
      replyEmail: settings?.emailSettings?.replyEmail || 'avgroup284@gmail.com',
      companyDisplayName: settings?.emailSettings?.companyDisplayName || 'AV Group Organization Management',
      signature: settings?.emailSettings?.signature || 'AV Group Organization Executive Team',
      supportPhone: settings?.emailSettings?.supportPhone || settings?.contact?.phone || '+91 99786 55799'
    };
  } catch (err) {
    console.warn('[EmailService] Could not load dynamic settings, using fallback email config:', err.message);
    return {
      receiverEmail: process.env.INQUIRY_RECEIVER_EMAIL || 'avgroup284@gmail.com',
      replyEmail: 'avgroup284@gmail.com',
      companyDisplayName: 'AV Group Organization Management',
      signature: 'AV Group Organization Executive Team',
      supportPhone: '+91 99786 55799'
    };
  }
};

export const sendInquiryNotification = async (inquiryData) => {
  const { name, phone, email, project, message } = inquiryData;

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const config = await getEmailConfig();

  if (!smtpUser || !smtpPass) {
    console.log('[EmailService] SMTP credentials missing. Simulated Notification Email:');
    console.log(`To: ${config.receiverEmail}`);
    return { success: true, simulated: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: smtpUser, pass: smtpPass }
    });

    const adminHtml = loadTemplate('inquiryNotification', {
      name,
      phone,
      email: email || 'N/A',
      project,
      message: message || 'No additional message provided.',
      companyDisplayName: config.companyDisplayName,
      emailSignature: config.signature
    });

    // 1. Send Admin Notification Email
    const adminMailPromise = transporter.sendMail({
      from: `"${config.companyDisplayName}" <${smtpUser}>`,
      to: config.receiverEmail,
      replyTo: (email && email.trim()) ? email.trim() : undefined,
      subject: `⚡ New Inquiry: ${project} - ${name}`,
      html: adminHtml
    });

    // 2. Send Customer Auto Thank-You Email if customer email was provided
    let customerMailPromise = Promise.resolve(null);
    if (email && email.trim()) {
      const thankYouHtml = loadTemplate('thankYou', {
        name,
        phone,
        project,
        companyDisplayName: config.companyDisplayName,
        emailSignature: config.signature,
        supportPhone: config.supportPhone
      });

      customerMailPromise = transporter.sendMail({
        from: `"${config.companyDisplayName}" <${smtpUser}>`,
        to: email.trim(),
        subject: `Thank you for contacting ${config.companyDisplayName}`,
        html: thankYouHtml
      });
    }

    const [adminResult, customerResult] = await Promise.allSettled([adminMailPromise, customerMailPromise]);

    if (adminResult.status === 'fulfilled') {
      console.log(`[EmailService] Admin notification email sent to ${config.receiverEmail}. MessageId: ${adminResult.value.messageId}`);
    } else {
      console.error(`[EmailService] Admin notification email failed:`, adminResult.reason?.message);
    }

    if (customerResult.status === 'fulfilled' && customerResult.value) {
      console.log(`[EmailService] Auto Thank-You email sent to customer (${email.trim()}). MessageId: ${customerResult.value.messageId}`);
    } else if (customerResult.status === 'rejected') {
      console.error(`[EmailService] Customer Thank-You email failed:`, customerResult.reason?.message);
    }

    return { success: true };
  } catch (error) {
    console.error(`[EmailService] Error sending notification email:`, error.message);
    return { success: false, error: error.message };
  }
};


export const sendThankYouEmail = async (inquiryData, customConfig = null) => {
  const { name, phone, email, project } = inquiryData;
  if (!email) return;

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const config = customConfig || await getEmailConfig();

  if (!smtpUser || !smtpPass) {
    console.log(`[EmailService] Simulated Auto Thank-You Email to Customer (${email})`);
    return { success: true, simulated: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: smtpUser, pass: smtpPass }
    });

    const htmlContent = loadTemplate('thankYou', {
      name,
      phone,
      project,
      companyDisplayName: config.companyDisplayName,
      emailSignature: config.signature,
      supportPhone: config.supportPhone
    });

    const info = await transporter.sendMail({
      from: `"${config.companyDisplayName}" <${smtpUser}>`,
      to: email.trim(),
      subject: `Thank you for contacting ${config.companyDisplayName}`,
      html: htmlContent
    });

    console.log(`[EmailService] Auto Thank-You email sent to ${email}. MessageId: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[EmailService] Error sending Thank-You email to ${email}:`, error);
  }
};

export const sendReplyEmail = async ({ toEmail, clientName, subject, replyMessage }) => {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const config = await getEmailConfig();

  if (!smtpUser || !smtpPass) {
    console.log(`[EmailService] Simulated Reply Email to ${toEmail}`);
    return { success: true, simulated: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: smtpUser, pass: smtpPass }
    });

    const htmlContent = loadTemplate('replyEmail', {
      clientName,
      replyMessage,
      companyDisplayName: config.companyDisplayName,
      emailSignature: config.signature
    });

    const info = await transporter.sendMail({
      from: `"${config.companyDisplayName}" <${smtpUser}>`,
      to: toEmail,
      subject: subject,
      html: htmlContent
    });

    console.log(`[EmailService] Reply email sent to ${toEmail}. MessageId: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[EmailService] Error sending reply email:`, error);
    throw error;
  }
};
