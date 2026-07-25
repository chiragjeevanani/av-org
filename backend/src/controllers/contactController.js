import Inquiry from '../models/Inquiry.js';
import Notification from '../models/Notification.js';
import { sendInquiryNotification, sendReplyEmail } from '../services/emailService.js';

export const createInquiry = async (req, res) => {
  try {
    const { name, phone, email, project, message } = req.body;

    if (!name || !phone || !project) {
      return res.status(400).json({
        success: false,
        message: 'Name, Phone, and Project fields are required.'
      });
    }

    const inquiry = await Inquiry.create({
      name,
      phone,
      email: email || '',
      project,
      message: message || '',
      status: 'pending',
      activity: [
        { type: 'CREATED', message: 'Inquiry Created from website contact form', createdAt: new Date() }
      ]
    });

    // Create Notification document
    const notification = await Notification.create({
      title: 'New Inquiry Received',
      message: `${name} submitted an inquiry for "${project}"`,
      type: 'INQUIRY',
      referenceType: 'Inquiry',
      referenceId: inquiry._id,
      createdBy: name
    });

    // Emit standardized Socket.IO real-time events
    const io = req.app.get('io');
    if (io) {
      io.emit('notification:new', notification);
      io.emit('inquiry:new', inquiry);
    }

    // Trigger email notification service asynchronously
    sendInquiryNotification({ name, phone, email, project, message }).catch(err => {
      console.error('[Inquiry] Email notification failed:', err);
    });

    return res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully! Our team will get back to you shortly.',
      inquiryId: inquiry._id
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getInquiries = async (req, res) => {
  try {
    const { status, search } = req.query;
    let query = {};

    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { project: { $regex: search, $options: 'i' } }
      ];
    }

    const inquiries = await Inquiry.find(query).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: inquiries.length, inquiries });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateInquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    inquiry.status = status || inquiry.status;
    inquiry.activity.push({
      type: 'STATUS_UPDATED',
      message: `Status updated to ${status.toUpperCase()}`,
      createdAt: new Date()
    });

    await inquiry.save();

    const io = req.app.get('io');
    if (io) {
      io.emit('inquiry:updated', inquiry);
    }

    return res.status(200).json({ success: true, message: 'Inquiry status updated', inquiry });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const replyToInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const { subject, replyMessage } = req.body;

    const inquiry = await Inquiry.findById(id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry record not found' });
    }

    if (!inquiry.email) {
      return res.status(400).json({ success: false, message: 'Client email is missing for this inquiry.' });
    }

    if (!replyMessage) {
      return res.status(400).json({ success: false, message: 'Reply message cannot be empty.' });
    }

    await sendReplyEmail({
      toEmail: inquiry.email,
      clientName: inquiry.name,
      subject: subject || `Re: Inquiry regarding ${inquiry.project}`,
      replyMessage
    });

    inquiry.status = 'contacted';
    inquiry.replies.push({
      subject: subject || `Re: Inquiry regarding ${inquiry.project}`,
      message: replyMessage,
      sentAt: new Date()
    });

    inquiry.activity.push({
      type: 'REPLY_SENT',
      message: `Reply email sent to ${inquiry.email}`,
      createdAt: new Date()
    });

    await inquiry.save();

    // Create Notification document for Reply Sent
    const notification = await Notification.create({
      title: 'Reply Email Sent',
      message: `Response sent to ${inquiry.name} (${inquiry.email})`,
      type: 'REPLY',
      referenceType: 'Inquiry',
      referenceId: inquiry._id,
      createdBy: 'Admin'
    });

    const io = req.app.get('io');
    if (io) {
      io.emit('notification:new', notification);
      io.emit('inquiry:updated', inquiry);
    }

    return res.status(200).json({
      success: true,
      message: `Reply email successfully sent to ${inquiry.email}`,
      inquiry
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const exportInquiriesCSV = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });

    let csv = 'Name,Phone,Email,Project,Status,Created Date\n';
    inquiries.forEach(inq => {
      const name = `"${(inq.name || '').replace(/"/g, '""')}"`;
      const phone = `"${(inq.phone || '').replace(/"/g, '""')}"`;
      const email = `"${(inq.email || '').replace(/"/g, '""')}"`;
      const project = `"${(inq.project || '').replace(/"/g, '""')}"`;
      const status = `"${(inq.status || '').toUpperCase()}"`;
      const createdAt = `"${new Date(inq.createdAt).toLocaleString()}"`;

      csv += `${name},${phone},${email},${project},${status},${createdAt}\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=AV_Group_Inquiries.csv');
    return res.status(200).send(csv);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    return res.status(200).json({ success: true, message: 'Inquiry deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
