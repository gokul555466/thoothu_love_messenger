import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_CONFIG = {
  serviceId: 'service_thoothu',
  templateId: 'template_love_msg',
  publicKey: 'YOUR_PUBLIC_KEY' // This needs to be replaced with actual EmailJS public key
};

export interface EmailData {
  senderName: string;
  senderPhone: string;
  senderGender: string;
  loverName: string;
  loverGender: string;
  message: string;
  contactMethod: string;
  contactDetails: string;
}

export const sendLoveMessageEmail = async (data: EmailData): Promise<void> => {
  const emailParams = {
    to_email: 'gokulsrg3@gmail.com',
    from_name: 'Thoothu Love Messenger',
    sender_name: data.senderName,
    sender_phone: data.senderPhone,
    sender_gender: data.senderGender,
    lover_name: data.loverName,
    lover_gender: data.loverGender,
    love_message: data.message,
    contact_method: data.contactMethod,
    contact_details: data.contactDetails,
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    subject: `💕 New Love Message: ${data.senderName} → ${data.loverName}`
  };

  try {
    const result = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      emailParams,
      EMAILJS_CONFIG.publicKey
    );
    
    console.log('Email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};

// Alternative: Simple fetch-based email sending using a free service
export const sendEmailViaFormspree = async (data: EmailData): Promise<void> => {
  const emailContent = `
    NEW LOVE MESSAGE FROM THOOTHU 💕
    
    SENDER DETAILS:
    Name: ${data.senderName}
    Phone: ${data.senderPhone}
    Gender: ${data.senderGender}
    
    RECIPIENT DETAILS:
    Name: ${data.loverName}
    Gender: ${data.loverGender}
    
    LOVE MESSAGE:
    "${data.message}"
    
    CONTACT INFORMATION:
    Method: ${data.contactMethod}
    Details: ${data.contactDetails}
    
    Timestamp: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
    
    ---
    Sent from Thoothu - Love Messenger of Tamil Nadu
  `;

  const response = await fetch('https://formspree.io/f/xpwagkqr', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'gokulsrg3@gmail.com',
      subject: `💕 New Love Message: ${data.senderName} → ${data.loverName}`,
      message: emailContent
    })
  });

  if (!response.ok) {
    throw new Error('Failed to send email via Formspree');
  }
};