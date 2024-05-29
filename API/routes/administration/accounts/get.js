import { administrator, authenticate } from '../../../middlewares/authenticate.js';
import { headerAuthorization } from '../../../middlewares/schemas.js';
import User from '../../../entities/User.js';

export default function route(app) {
  app.get(
    '/administration/accounts',
    [
      headerAuthorization(),
      authenticate,
      administrator,
    ],
    async (req, res) => {
      const users = await User.all();

      return res
        .send({
          datas: users.map((user) => user.format()),
        });
    },
  );
}
