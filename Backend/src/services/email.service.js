require('dotenv').config();
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
    },
});

// Verify the connection configuration
transporter.verify((error, success) => {
    if (error) {
        console.error('Error connecting to email server:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});


// Function to send email
const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"QuickChat" <${process.env.EMAIL_USER}>`, // sender address
            to, // list of receivers
            subject, // Subject line
            text, // plain text body
            html, // html body
        });

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error('Error sending email:', error);
    }
};


async function sendRegistrationEmail(userEmail, name) {
    const subject = "🎉 Welcome to QuickChat!";

    const text = `
Hello ${name},

Welcome to QuickChat! 🎉

Your account has been successfully created.

You can now:
• Chat with friends instantly
• Connect with new people
• Enjoy a fast and secure messaging experience

We're excited to have you as part of the QuickChat community.

If you did not create this account, please ignore this email.

Best regards,
The QuickChat Team
`;

    const html = `
    <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; border:1px solid #e5e5e5; border-radius:10px;">
        <h2 style="color:#2563eb;">🎉 Welcome to QuickChat!</h2>

        <p>Hi <strong>${name}</strong>,</p>

        <p>Your account has been <strong>successfully created</strong>. We're excited to welcome you to the QuickChat community!</p>

        <h3>✨ You can now:</h3>

        <ul>
            <li>💬 Chat with friends in real time</li>
            <li>👥 Connect with new people</li>
            <li>🔒 Enjoy a secure messaging experience</li>
        </ul>

        <p>Thank you for choosing <strong>QuickChat</strong>. We hope you enjoy using our platform.</p>

        <p>If you didn't create this account, you can safely ignore this email.</p>

        <hr>

        <p style="color:gray;">
            Best Regards,<br>
            <strong>QuickChat Team</strong>
        </p>
    </div>
    `;

    await sendEmail(userEmail, subject, text, html);
}
 module.exports={sendRegistrationEmail}