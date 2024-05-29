import { authenticate } from '../../../middlewares/authenticate.js';
import { headerAuthorization } from '../../../middlewares/schemas.js';

export default function route(app) {
  app.get(
    '/account/user',
    [
      headerAuthorization(),
      authenticate,
    ],
    async (req, res) => res
      .send({
        datas: req.Token.User.format(),
      }),
  );
}
