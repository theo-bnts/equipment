import 'dotenv/config';

import { authentificate } from '../../../middlewares/authentificate.js';
import Room from '../../../entities/Room.js';
import { header_authorization } from '../../../middlewares/schemas.js';

export default function route(app) {
  app.get(
    '/referential/rooms',
    [
      header_authorization,
      authentificate,
    ],
    async (req, res) => {
      const rooms = await Room.all();

      return res
        .send({
          datas: rooms.map(room => room.format()),
        });
    }
  );
}
