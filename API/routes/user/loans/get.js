import { authenticate } from '../../../middlewares/authenticate.js';
import Loan from '../../../entities/Loan.js';
import { headerAuthorization } from '../../../middlewares/schemas.js';

export default function route(app) {
  app.get(
    '/user/loans',
    [
      headerAuthorization(),
      authenticate,
    ],
    async (req, res) => {
      const loans = await Loan.allOfUser(req.Token.User);

      return res
        .send({
          datas: loans.map((loan) => loan.format()),
        });
    },
  );
}
