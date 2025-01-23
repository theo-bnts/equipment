import { administrator, authenticate } from '../../../middlewares/authenticate.js';
import Reference from '../../../entities/Reference.js';
import { headerAuthorization } from '../../../middlewares/schemas.js';

export default function route(app) {
  app.get(
    '/administration/references',
    [
      headerAuthorization(),
      authenticate,
      administrator,
    ],
    async (req, res) => {
      const references = await Reference.all();

      return res
        .send({
          datas: references.map((reference) => reference.format()),
        });
    },
  );
}
