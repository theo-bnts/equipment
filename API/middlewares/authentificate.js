import authHeader from 'auth-header';

import Token from '../entities/Token.js';

export default async function authentificate(req, res, next) {
  const authorization = authHeader.parse(req.header('authorization'));
  
  if (!Token.isValidValue(authorization.token)) {
    return res
      .status(401)
      .send({ errors: [{ type: 'INVALID_TOKEN' }] });
  }

  const token = await Token.fromValue(authorization.token);

  if (token.Expiration < new Date()) {
    return res
      .status(403)
      .send({ errors: [{ type: 'EXPIRED_TOKEN' }] });
  }

  req.token = token;
  next();
}