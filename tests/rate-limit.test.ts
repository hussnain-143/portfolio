import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { checkRateLimit } from '../src/lib/rate-limit';

describe('Rate Limiter', () => {
  it('allows requests within limit and throttles excess', () => {
    const key = `test-key-${Date.now()}`;
    const opts = { limit: 3, windowMs: 5000 };

    const r1 = checkRateLimit(key, opts);
    assert.equal(r1.success, true);
    assert.equal(r1.remaining, 2);

    const r2 = checkRateLimit(key, opts);
    assert.equal(r2.success, true);
    assert.equal(r2.remaining, 1);

    const r3 = checkRateLimit(key, opts);
    assert.equal(r3.success, true);
    assert.equal(r3.remaining, 0);

    const r4 = checkRateLimit(key, opts);
    assert.equal(r4.success, false);
    assert.equal(r4.remaining, 0);
  });
});
