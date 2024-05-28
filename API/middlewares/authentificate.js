import authHeader from 'auth-header';

import Token from '../entities/Token.js';

export async function authentificate(req, res, next) {
  const authorization = authHeader.parse(req.header('authorization'));

  if (!await Token.isValidValue(authorization.token)) {
    return res
      .status(401)
      .send({ errors: [{ msg: 'INVALID_TOKEN' }] });
  }

  const token = await Token.fromValue(authorization.token);

  if (token.Expiration < new Date()) {
    return res
      .status(403)
      .send({ errors: [{ msg: 'EXPIRED_TOKEN' }] });
  }

  req.Token = token;
  next();
}

export async function administrator(req, res, next) {
  if (req.Token.User.Role.Name !== 'ADMINISTRATOR') {
    return res
      .status(403)
      .send({ errors: [{ msg: 'NOT_ADMINISTRATOR' }] });
  }

  next();
}
