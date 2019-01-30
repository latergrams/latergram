require('dotenv').config();
const jwt = require('jsonwebtoken');
const { tokenize, untokenize } = require('../../lib/utils/token');

describe('tokens', () => {
  it('can create a token', () => {
    const token = jwt.sign({ payload: { hi: 'there' } }, 'seekrat');
    expect(token).toEqual(expect.any(String));
  });

  it('can verify a token', () => {
    const token = jwt.sign({ payload: { hi: 'there' } }, 'seekrat');
    const body = jwt.verify(token, 'seekrat');
    expect(body).toEqual({ payload: { hi: 'there' }, iat: expect.any(Number) });
  });

  it('can verify a token with expiration', () => {
    const token = jwt.sign({ payload: { hi: 'there' } }, 'seekrat', { expiresIn: '1h' });
    const body = jwt.verify(token, 'seekrat');
    expect(body).toEqual({
      payload: { hi: 'there' },
      iat: expect.any(Number),
      exp: expect.any(Number)
    });
  });

  it('can tokenize a payload', () => {
    const token = tokenize({ hi: 'there' });
    expect(token).toEqual(expect.any(String));
  });

  it('can untokenize a payload', () => {
    const token = tokenize({ hi: 'there' });
    const payload = untokenize(token);
    expect(payload).toEqual({ hi: 'there' });
  });
});
