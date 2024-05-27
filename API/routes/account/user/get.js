import 'dotenv/config';

import { authentificate } from '../../../middlewares/authentificate.js';
import { header_authorization } from '../../../middlewares/schemas.js';

export default function route(app) {
  app.get(
    '/account/user',
    [
      header_authorization,
      authentificate,
    ],
    async (req, res) => {
      return res
        .send({
          datas: req.token.User.format(),
        });
    },
  );
}
