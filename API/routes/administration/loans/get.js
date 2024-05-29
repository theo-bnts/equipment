import 'dotenv/config';

import { administrator, authentificate } from '../../../middlewares/authentificate.js';
import Loan from '../../../entities/Loan.js';
import { header_authorization } from '../../../middlewares/schemas.js';

export default function route(app) {
  app.get(
    '/administration/loans',
    [
      header_authorization,
      authentificate,
      administrator,
    ],
    async (req, res) => {
      const loans = await Loan.all();

      return res
        .send({
          datas: loans.map(loan => loan.format()),
        });
    }
  );
}
