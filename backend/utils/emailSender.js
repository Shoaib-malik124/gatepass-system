import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_MAIL,
    pass: process.env.GMAIL_PASS,
  },
});

export const sendOtpEmail = async (targetEmail, otp) => {
  const mailOptions = {
    from: `"NITSRI Portal" <${process.env.GMAIL_MAIL}>`,
    to: targetEmail,
    subject: 'Your Registration OTP',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 600px;">
        <h2 style="color: #0056b3; border-bottom: 2px solid #0056b3; padding-bottom: 10px;">NIT Srinagar Digital Gatepass</h2>
        <p>Hello Student,</p>
        <p>You are requesting a digital gatepass. Please use the One-Time Password (OTP) below to verify your identity:</p>
        <div style="background: #f9f9f9; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0;">
            <h1 style="letter-spacing: 8px; color: #333; margin: 0; font-size: 32px;">${otp}</h1>
        </div>
        <p style="color: #666; font-size: 14px;">This code is valid for <b>5 minutes</b>. For security reasons, do not share this code with anyone, including security personnel.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #999;">This is an automated message from the NIT Srinagar Gatepass System.</p>
      </div>
    `,
  };
  
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Nodemailer Error:', error);
    return { success: false, error: error.message };
  }
};

export const sendSecurityMail=async(targetEmail,password)=>{
  const mailOptions = {
    from: `"NITSRI Portal" <${process.env.GMAIL_MAIL}>`,
    to: targetEmail,
    subject: 'Your Registration OTP',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 600px;">
        <h2 style="color: #0056b3; border-bottom: 2px solid #0056b3; padding-bottom: 10px;">NIT Srinagar Digital Gatepass</h2>
        <p>Hello Security guard,</p>
        <p>Here is the your password for Digital Gatepass app:</p>
        <div style="background: #f9f9f9; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0;">
            <h1 style="letter-spacing: 8px; color: #333; margin: 0; font-size: 32px;">${password}</h1>
        </div>
        <p style="color: #666; font-size: 14px;">For security reasons, do not share this code with anyone, including security personnel.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #999;">This is an automated message from the NIT Srinagar Gatepass System.</p>
      </div>
    `,
  };
  
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return { success: true, message: "Security added successfully" };
  } catch (error) {
    console.error('Nodemailer Error:', error);
    return { success: false, error: error.message };
  }
}
