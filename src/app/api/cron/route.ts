import { NextResponse } from 'next/server';

// This endpoint triggers the alert processing workflow
// In production, this would be called by a cron job (e.g., Vercel Cron)
export async function GET() {
  try {
    console.log('🔄 Starting alert processing cycle...');

    // Trigger alert processing
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/process-alerts`, {
      method: 'POST'
    });

    const data = await response.json();

    console.log(`✅ Alert processing complete: ${data.alertsCreated} alerts created`);

    return NextResponse.json({
      success: true,
      message: 'Alert processing triggered',
      ...data
    });
  } catch (error) {
    console.error('❌ Error in cron trigger:', error);
    return NextResponse.json(
      { error: 'Failed to trigger alert processing' },
      { status: 500 }
    );
  }
}
