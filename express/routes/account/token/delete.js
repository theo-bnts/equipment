import { authenticate } from '../../../middlewares/authenticate.js';
import { headerAuthorization } from '../../../middlewares/schemas.js';

export default function route(app) {
  app.delete(
    '/account/token',
    [
      headerAuthorization(),
      authenticate,
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
