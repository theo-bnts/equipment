import { authenticate } from '../../../middlewares/authenticate.js';
import { headerAuthorization } from '../../../middlewares/schemas.js';
import Type from '../../../entities/Type.js';

export default function route(app) {
  app.get(
    '/referential/types',
    [
      headerAuthorization(),
      authenticate,
    ],
    async (req, res) => {
      const types = await Type.all();

      return res
        .send({
          datas: types.map((type) => type.format()),
        });
    },
  );
}
