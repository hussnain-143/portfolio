import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { hashPassword, verifyPassword, createSessionToken, verifySessionToken } from '../src/lib/auth';

describe('Auth Utilities', () => {
  it('hashes password and verifies successfully', async () => {
    const raw = 'SuperSecret123!';
    const hash = await hashPassword(raw);

    assert.notEqual(hash, raw);
    assert.ok(hash.startsWith('$2'));

    const isMatch = await verifyPassword(raw, hash);
    assert.equal(isMatch, true);

    const isWrong = await verifyPassword('WrongPassword', hash);
    assert.equal(isWrong, false);
  });

  it('signs and verifies JWT tokens with jose', async () => {
    const payload = {
      userId: '64f1234567890abcdef12345',
      email: 'admin@hussnain.dev',
      role: 'admin',
    };

    const token = await createSessionToken(payload);
    assert.ok(typeof token === 'string' && token.length > 20);

    const decoded = await verifySessionToken(token);
    assert.ok(decoded);
    assert.equal(decoded.userId, payload.userId);
    assert.equal(decoded.email, payload.email);
    assert.equal(decoded.role, payload.role);
  });

  it('rejects tampered JWT tokens', async () => {
    const payload = {
      userId: '64f1234567890abcdef12345',
      email: 'admin@hussnain.dev',
      role: 'admin',
    };

    const token = await createSessionToken(payload);
    const tampered = token.slice(0, -6) + 'abc123';

    const decoded = await verifySessionToken(tampered);
    assert.equal(decoded, null);
  });
});
