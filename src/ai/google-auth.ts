/**
 * @fileOverview Google OAuth2 authentication for Fact Check API
 */

import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

let cachedAuth: any = null;

/**
 * Authenticate with Google Cloud using service account
 */
export async function getGoogleAuth() {
  if (cachedAuth) {
    return cachedAuth;
  }

  try {
    // Try to find service account JSON in project root
    const serviceAccountPath = path.join(process.cwd(), 'service-account.json');
    
    if (!fs.existsSync(serviceAccountPath)) {
      console.error('service-account.json not found in project root');
      console.error('Please follow the OAuth2 setup guide to create one');
      return null;
    }

    const credentials = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));

    cachedAuth = new google.auth.GoogleAuth({
      credentials,
      scopes: [
        'https://www.googleapis.com/auth/cloud-platform',
        'https://www.googleapis.com/auth/generative-language',
        'https://www.googleapis.com/auth/factchecktools',
        'https://www.googleapis.com/auth/cloud-vision'
      ],
    });

    console.log('[OAuth2] GoogleAuth created (service account found)');
    return cachedAuth;
  } catch (error) {
    console.error('[OAuth2] Authentication failed:', error);
    return null;
  }
}

/**
 * Get an access token for making API requests
 */
export async function getAccessToken() {
  try {
    const auth = await getGoogleAuth();
    if (!auth) return null;

    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();
    if (!accessToken) return null;
    if (typeof accessToken === 'string') return accessToken;
    return (accessToken as any).token ?? null;
  } catch (error) {
    console.error('[OAuth2] Failed to get access token:', error);
    return null;
  }
}
