import 'dotenv/config';

import { authentificate } from '../../../middlewares/authentificate.js';
import Equipment from '../../../entities/Equipment.js';
import EquipmentLoan from '../../../entities/EquipmentLoan.js';
import EquipmentLoanStateType from '../../../entities/EquipmentLoanStateType.js';
import Organization from '../../../entities/Organization.js';
import Room from '../../../entities/Room.js';
import { header_authorization, body_code, body_name } from '../../../middlewares/schemas.js';
import UserOrganization from '../../../entities/UserOrganization.js';

export default function route(app) {
  app.put(
    '/user/loans',
    [
      header_authorization,
      authentificate,
      body_code('equipment.'),
      body_name('organization.', true),
      body_name('room.'),
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

      let organization = null;

      if (req.body.organization.name) {
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

      if (!await Room.nameExists(req.body.room.name)) {
        return res
          .status(409)
          .send({ errors: [{ msg: 'ROOM_NAME_NOT_FOUND' }] });
      }

      const equipmentLoan = new EquipmentLoan(
        null,
        await EquipmentLoanStateType.fromName('REQUESTED'),
        new Date(),
        new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        req.Token.User,
        organization,
        equipment,
        await Room.fromName(req.body.room.name),
      );

      await equipmentLoan.insert();

      return res
        .status(204)
        .send();
    }
  );
}
