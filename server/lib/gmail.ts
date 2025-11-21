import { google } from 'googleapis';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=google-mail',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('Gmail not connected');
  }
  return accessToken;
}

// WARNING: Never cache this client.
// Access tokens expire, so a new client must be created each time.
// Always call this function again to get a fresh client.
export async function getUncachableGmailClient() {
  const accessToken = await getAccessToken();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken
  });

  return google.gmail({ version: 'v1', auth: oauth2Client });
}

// Helper to decode base64url email body
export function decodeEmailBody(data: string): string {
  if (!data) return '';
  try {
    return Buffer.from(data.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf-8');
  } catch (error) {
    console.error('Error decoding email body:', error);
    return '';
  }
}

// Helper to extract email body from parts
export function getEmailBody(payload: any): { text: string; html: string } {
  let text = '';
  let html = '';

  function extractParts(parts: any[]) {
    for (const part of parts || []) {
      if (part.mimeType === 'text/plain' && part.body.data) {
        text = decodeEmailBody(part.body.data);
      } else if (part.mimeType === 'text/html' && part.body.data) {
        html = decodeEmailBody(part.body.data);
      } else if (part.parts) {
        extractParts(part.parts);
      }
    }
  }

  if (payload.parts) {
    extractParts(payload.parts);
  } else if (payload.body.data) {
    if (payload.mimeType === 'text/html') {
      html = decodeEmailBody(payload.body.data);
    } else {
      text = decodeEmailBody(payload.body.data);
    }
  }

  return { text, html };
}

// Helper to parse email headers
export function parseHeaders(headers: any[]) {
  const headerMap: Record<string, string> = {};
  for (const header of headers || []) {
    headerMap[header.name.toLowerCase()] = header.value;
  }
  return {
    subject: headerMap['subject'] || 'No Subject',
    from: headerMap['from'] || 'Unknown',
    to: headerMap['to'] || '',
    cc: headerMap['cc'] || '',
    date: headerMap['date'] || '',
  };
}
