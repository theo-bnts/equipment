import { authenticate } from '../../../middlewares/authenticate.js';
import { headerAuthorization } from '../../../middlewares/schemas.js';
import UserOrganization from '../../../entities/UserOrganization.js';

export default function route(app) {
  app.get(
    '/user/organizations',
    [
      headerAuthorization(),
      authenticate,
    ],
    async (req, res) => {
      const userOrganizations = await UserOrganization.allOfUser(req.Token.User);

      return res
        .send({
          datas: userOrganizations.map(
            (userOrganization) => userOrganization.Organization.format(),
          ),
        });
    },
  );
}
