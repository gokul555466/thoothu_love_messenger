/*
  # Send Love Message Email Function

  1. Purpose
    - Receives love confession form data from the frontend
    - Formats the data into a beautiful HTML email
    - Sends the email to gokulsrg3@gmail.com using Resend API

  2. Security
    - CORS headers configured for web requests
    - Input validation for all form fields
    - Secure API key handling through environment variables

  3. Email Content
    - Professional HTML template with romantic styling
    - All form data formatted clearly for easy reading
    - Includes timestamp and source information
*/

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface LoveMessageData {
  userName: string;
  userPhone: string;
  userGender: string;
  loverName: string;
  loverGender: string;
  message: string;
  contactMethod: string;
  contactDetails: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (req.method !== 'POST') {
      return new Response('Method not allowed', { 
        status: 405, 
        headers: corsHeaders 
      })
    }

    const data: LoveMessageData = await req.json()

    // Validate required fields
    const requiredFields = ['userName', 'userPhone', 'userGender', 'loverName', 'loverGender', 'message', 'contactMethod', 'contactDetails']
    for (const field of requiredFields) {
      if (!data[field]) {
        return new Response(`Missing required field: ${field}`, { 
          status: 400, 
          headers: corsHeaders 
        })
      }
    }

    // Create HTML email content
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #ec4899, #be185d); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #fff; padding: 30px; border: 1px solid #e5e7eb; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; color: #6b7280; }
        .section { margin-bottom: 25px; }
        .label { font-weight: 600; color: #374151; margin-bottom: 5px; }
        .value { background: #f3f4f6; padding: 10px; border-radius: 5px; margin-bottom: 15px; }
        .message-box { background: #fef7f7; border-left: 4px solid #ec4899; padding: 15px; margin: 20px 0; }
        .heart { color: #ec4899; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1><span class="heart">💕</span> New Love Message from Thoothu <span class="heart">💕</span></h1>
          <p>காதல் செய்தி • Love Message</p>
        </div>
        
        <div class="content">
          <div class="section">
            <h2 style="color: #ec4899; border-bottom: 2px solid #ec4899; padding-bottom: 10px;">Sender Details</h2>
            <div class="label">Name:</div>
            <div class="value">${data.userName}</div>
            <div class="label">Phone Number:</div>
            <div class="value">${data.userPhone}</div>
            <div class="label">Gender:</div>
            <div class="value">${data.userGender}</div>
          </div>

          <div class="section">
            <h2 style="color: #be185d; border-bottom: 2px solid #be185d; padding-bottom: 10px;">Recipient Details</h2>
            <div class="label">Name:</div>
            <div class="value">${data.loverName}</div>
            <div class="label">Gender:</div>
            <div class="value">${data.loverGender}</div>
          </div>

          <div class="section">
            <h2 style="color: #7c3aed; border-bottom: 2px solid #7c3aed; padding-bottom: 10px;">Love Message</h2>
            <div class="message-box">
              <p style="margin: 0; font-style: italic; font-size: 16px;">"${data.message}"</p>
            </div>
          </div>

          <div class="section">
            <h2 style="color: #059669; border-bottom: 2px solid #059669; padding-bottom: 10px;">Contact Information</h2>
            <div class="label">Preferred Contact Method:</div>
            <div class="value">${data.contactMethod.charAt(0).toUpperCase() + data.contactMethod.slice(1)}</div>
            <div class="label">Contact Details:</div>
            <div class="value">${data.contactDetails}</div>
          </div>

          <div style="background: #eff6ff; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p style="margin: 0; color: #1e40af;"><strong>Instructions:</strong></p>
            <p style="margin: 5px 0 0 0; color: #1e40af;">Please reach out to ${data.loverName} via ${data.contactMethod} (${data.contactDetails}) and deliver this heartfelt message from ${data.userName}.</p>
          </div>
        </div>

        <div class="footer">
          <p>Sent from Thoothu - Love Messenger of Tamil Nadu</p>
          <p>Timestamp: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
          <p style="font-size: 12px; margin-top: 15px;">💝 Spreading love across Tamil Nadu, one message at a time 💝</p>
        </div>
      </div>
    </body>
    </html>
    `

    // Send email using Resend API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Thoothu Love Messenger <noreply@thoothu.love>',
        to: ['gokulsrg3@gmail.com'],
        subject: `💕 New Love Message: ${data.userName} → ${data.loverName}`,
        html: htmlContent,
      }),
    })

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text()
      console.error('Resend API error:', errorText)
      throw new Error(`Failed to send email: ${resendResponse.status}`)
    }

    const result = await resendResponse.json()
    console.log('Email sent successfully:', result)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Love message sent successfully!',
        emailId: result.id 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error sending love message:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Failed to send love message. Please try again.' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})