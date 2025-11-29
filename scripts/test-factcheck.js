const fetch = require('node-fetch');
const {JWT} = require('google-auth-library');
const fs = require('fs');
const path = require('path');

async function getServiceAccountToken() {
  try {
    const keyPath = path.join(process.cwd(), 'service-account.json');
    if (!fs.existsSync(keyPath)) return null;
    const key = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
    const client = new JWT({
      email: key.client_email,
      key: key.private_key,
      scopes: [
        'https://www.googleapis.com/auth/factchecktools',
        'https://www.googleapis.com/auth/cloud-platform',
      ],
    });
    const res = await client.getAccessToken();
    if (!res) return null;
    return typeof res === 'string' ? res : res.token || null;
  } catch (err) {
    console.error('Failed to get token from service account:', err);
    return null;
  }
}

async function test(query) {
  try {
    const token = await getServiceAccountToken();
    const url = `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${encodeURIComponent(query)}`;
    const headers = { 'Accept': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    console.log('Request URL:', url);
    console.log('Using token:', !!token);

    const res = await fetch(url, { headers });
    console.log('Status:', res.status);
    const text = await res.text();
    console.log('Body:', text.substring(0, 4000));
  } catch (err) {
    console.error('Error:', err);
  }
}

const q = process.argv.slice(2).join(' ') || 'earth is round';
test(q);
