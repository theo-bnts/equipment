import { administrator, authenticate } from '../../../middlewares/authenticate.js';
import Loan from '../../../entities/Loan.js';
import { headerAuthorization } from '../../../middlewares/schemas.js';

export default function route(app) {
  app.get(
    '/administration/loans',
    [
      headerAuthorization(),
      authenticate,
      administrator,
    ],
    async (req, res) => {
      const loans = await Loan.all();

      return res
        .send({
          datas: loans.map((loan) => loan.format()),
        });
    },
  );
}
