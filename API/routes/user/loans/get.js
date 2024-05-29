import 'dotenv/config';

import { authentificate } from '../../../middlewares/authentificate.js';
import Loan from '../../../entities/Loan.js';
import { header_authorization } from '../../../middlewares/schemas.js';

export default function route(app) {
  app.get(
    '/user/loans',
    [
      header_authorization,
      authentificate,
    ],
    async (req, res) => {
      const loans = await Loan.allOfUser(req.Token.User);

      return res
        .send({
          datas: loans.map(loan => loan.format()),
        });
    }
  );
}
