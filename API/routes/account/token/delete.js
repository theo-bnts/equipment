import 'dotenv/config';

import { authentificate } from '../../../middlewares/authentificate.js';
import { header_authorization } from '../../../middlewares/schemas.js';

export default function route(app) {
  app.delete(
    '/account/token',
    [
      header_authorization,
      authentificate,
    ],
    async (req, res) => {
      req.Token.Expiration = new Date();

      await req.Token.update();

      res
        .status(204)
        .send();
    },
  );
}
