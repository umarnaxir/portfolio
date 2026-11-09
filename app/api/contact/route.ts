import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, phone, projectType, budget, description } = data;

    if (!name || !email || !description) {
      return NextResponse.json(
        { error: 'Name, email, and project description are required.' },
        { status: 400 }
      );
    }

    // In production, forward to Resend, SendGrid, Telegram, or database
    console.log('[New Project Enquiry]', {
      name,
      email,
      phone,
      projectType,
      budget,
      description,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully. Umar Nazir will review your requirements and respond within one business day.',
    });
  } catch (error) {
    console.error('[Contact API Error]', error);
    return NextResponse.json(
      { error: 'Failed to process inquiry. Please try again or email directly.' },
      { status: 500 }
    );
  }
}

