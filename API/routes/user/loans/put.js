import { authenticate } from '../../../middlewares/authenticate.js';
import Equipment from '../../../entities/Equipment.js';
import Loan from '../../../entities/Loan.js';
import Organization from '../../../entities/Organization.js';
import Room from '../../../entities/Room.js';
import { bodyCode, bodyName, headerAuthorization } from '../../../middlewares/schemas.js';
import StateType from '../../../entities/StateType.js';
import UserOrganization from '../../../entities/UserOrganization.js';

export default function route(app) {
  app.put(
    '/user/loans',
    [
      headerAuthorization(),
      authenticate,
      bodyCode('equipment.'),
      bodyName('organization.', true),
      bodyName('room.'),
    ],
    async (req, res) => {
      if (!await Equipment.codeExists(req.body.equipment.code)) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'EQUIPMENT_CODE_NOT_FOUND' }] });
      }

      const equipment = await Equipment.fromCode(req.body.equipment.code);

      if (!await equipment.isAvailable()) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'EQUIPMENT_NOT_AVAILABLE' }] });
      }

      let organization;

      if (req.body.organization && req.body.organization.name) {
        if (!await Organization.nameExists(req.body.organization.name)) {
          return res
            .status(409)
            .send({ errors: [{ msg: 'ORGANIZATION_NAME_NOT_FOUND' }] });
        }

        organization = await Organization.fromName(req.body.organization.name);

        if (!await UserOrganization.userAndOrganizationExists(req.Token.User, organization)) {
          return res
            .status(403)
            .send({ errors: [{ msg: 'USER_NOT_IN_ORGANIZATION' }] });
        }
      }
      else {
        if (equipment.Reference.Type.OrganizationOnly) {
          return res
            .status(409)
            .send({ errors: [{ msg: 'ORGANIZATION_REQUIRED_FOR_TYPE' }] });
        }

        organization = null;
      }

      if (!await Room.nameExists(req.body.room.name)) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'ROOM_NAME_NOT_FOUND' }] });
      }

      const loan = new Loan(
        null,
        await StateType.fromName('REQUESTED'),
        new Date(),
        new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        req.Token.User,
        organization,
        equipment,
        await Room.fromName(req.body.room.name),
      );

      await loan.insert();

      return res
        .status(204)
        .send();
    },
  );
}
