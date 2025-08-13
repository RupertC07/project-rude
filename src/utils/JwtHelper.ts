import jwt from 'jsonwebtoken';

export class JwtHelper {
  private secret: string;

  constructor(secret: string) {
    if (!secret) throw new Error('JWT secret must be provided');
    this.secret = secret;
  }

  sign<T extends string | object | Buffer>(payload: T): string {
    return jwt.sign(payload, this.secret, {expiresIn:'10m' });
  }

  verify<T>(token: string): T {
    try {
      return jwt.verify(token, this.secret) as T;
    } catch (err) {
      throw new Error('Invalid or expired JWT token');
    }
  }
}
