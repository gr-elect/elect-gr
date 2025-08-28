import crypto from 'crypto';

export function ipToHash(ip: string): string {
  const secret = process.env.IP_HASH_SECRET || 'fallback-secret-key';
  return crypto.createHmac('sha256', secret).update(ip).digest('hex');
}