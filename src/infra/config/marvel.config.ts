import { registerAs } from '@nestjs/config';

export default registerAs('marvel', () => ({
  base_url:
    process.env.MARVEL_GATEWAY_BASE_URL ||
    'https://gateway.marvel.com/v1/public',
  private_key: process.env.MARVEL_GATEWAY_PRIVATE_KEY || '',
  public_key: process.env.MARVEL_GATEWAY_PUBLIC_KEY || '',
  status_ok_response: process.env.MARVEL_GATEWAY_STATUS_OK_RESPONSE || 'Ok',
}));
