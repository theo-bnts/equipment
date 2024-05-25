import 'dotenv/config';

import authentificate from '../../../../middlewares/authentificate.js';
import { authorization } from '../../../../middlewares/schemas.js';

export default function route(app) {
  app.delete(
    '/account/security/token',
    [
      authorization,
      authentificate,
    ],
    async (req, res, next) => {
      req.token.Expiration = new Date();

      await req.token.update();

      res
        .status(204)
        .send();
    },
  );
}