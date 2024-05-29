import { authenticate } from '../../../middlewares/authenticate.js';
import Room from '../../../entities/Room.js';
import { headerAuthorization } from '../../../middlewares/schemas.js';

export default function route(app) {
  app.get(
    '/referential/rooms',
    [
      headerAuthorization(),
      authenticate,
    ],
    async (req, res) => {
      const rooms = await Room.all();

      return res
        .send({
          datas: rooms.map((room) => room.format()),
        });
    },
  );
}
