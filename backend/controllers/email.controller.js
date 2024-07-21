import { Email } from "../models/email.model.js";

export const createEmail = async (req, res) => {
    try {
        const userId = req.id;
        const {to, subject, message} = req.body;
        if(!to || !subject || !message) return res.status(400).json({message:"All fields are required", success:false});
        
        const email = await Email.create({
            to,
            subject,
            message,
            userId
        });
        return res.status(201).json({
            email
        })
    } catch (error) {
        console.log(error);
    }
}
export const deleteEmail = async (req,res) => {
    try {
        const emailId = req.params.id;
        
        if(!emailId) return res.status(400).json({message:"Email id is required"});

        const email = await Email.findByIdAndDelete(emailId);

        if(!email) return res.status(404).json({message:"Email is not found"});

        return res.status(200).json({
            message:"Email Deleted successfully"
        });
    } catch (error) {
        console.log(error);
    }
}

import { sendEmail } from '../services/gmailService.js';

export const sendEmailHandler = async (req, res) => {
  try {
    const { to, subject, message } = req.body;
    const userId = req.user.id;

    // Save email to the database
    const email = new Email({ to, subject, message, userId });
    await email.save();

    // Send email via Gmail API
    await sendEmail({ to, subject, message });

    res.status(201).json({ message: 'Email sent successfully', email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};

export const getAllEmails = async (req, res) => {
  try {
    const userId = req.user.id;
    const emails = await Email.find({ userId });
    res.status(200).json({ emails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch emails' });
  }
};