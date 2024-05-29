import { administrator, authenticate } from '../../../middlewares/authenticate.js';
import Equipment from '../../../entities/Equipment.js';
import { headerAuthorization } from '../../../middlewares/schemas.js';

export default function route(app) {
  app.get(
    '/administration/equipments',
    [
      headerAuthorization(),
      authenticate,
      administrator,
    ],
    async (req, res) => {
      const equipments = await Equipment.all();

      return res
        .send({
          datas: equipments.map((equipment) => equipment.format()),
        });
    },
  );
}
