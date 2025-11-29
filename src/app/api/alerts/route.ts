import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ALERTS_FILE = path.join(process.cwd(), 'data', 'alerts.json');

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(ALERTS_FILE)) {
    fs.writeFileSync(ALERTS_FILE, JSON.stringify({ alerts: [] }));
  }
}

export async function GET() {
  try {
    ensureDataDir();
    
    const data = fs.readFileSync(ALERTS_FILE, 'utf-8');
    const { alerts } = JSON.parse(data);
    
    // Return last 20 alerts, newest first
    const recentAlerts = alerts
      .sort((a: any, b: any) => b.timestamp - a.timestamp)
      .slice(0, 20);

    return NextResponse.json({
      success: true,
      alerts: recentAlerts,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error reading alerts:', error);
    return NextResponse.json({
      success: true,
      alerts: [],
      timestamp: Date.now()
    });
  }
}

export async function POST(request: Request) {
  try {
    ensureDataDir();
    
    const newAlert = await request.json();
    
    // Read existing alerts
    const data = fs.readFileSync(ALERTS_FILE, 'utf-8');
    const { alerts } = JSON.parse(data);
    
    // Add new alert
    const alert = {
      id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...newAlert,
      timestamp: Date.now()
    };
    
    alerts.push(alert);
    
    // Keep only last 100 alerts to prevent file bloat
    const trimmedAlerts = alerts.slice(-100);
    
    // Save back to file
    fs.writeFileSync(ALERTS_FILE, JSON.stringify({ alerts: trimmedAlerts }, null, 2));
    
    return NextResponse.json({
      success: true,
      alert
    });
  } catch (error) {
    console.error('Error saving alert:', error);
    return NextResponse.json(
      { error: 'Failed to save alert' },
      { status: 500 }
    );
  }
}
