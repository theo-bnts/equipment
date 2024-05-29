import 'dotenv/config';

import { authentificate } from '../../../../middlewares/authentificate.js';
import Equipment from '../../../../entities/Equipment.js';
import Type from '../../../../entities/Type.js';
import Reference from '../../../../entities/Reference.js';
import { header_authorization, query_name } from '../../../../middlewares/schemas.js';

export default function route(app) {
  app.get(
    '/referential/equipments/available',
    [
      header_authorization,
      authentificate,
      query_name('equipment_type_', true),
    ],
    async (req, res) => {
      let equipments = [];

      if (req.query.equipment_type_name) {
        if (!await Type.nameExists(req.query.equipment_type_name)) {
          return res
            .status(409)
            .send({ errors: [{ msg: 'EQUIPMENT_TYPE_NAME_NOT_FOUND' }] });
        }

        const type = await Type.fromName(req.query.equipment_type_name);

        const references = await Reference.allOfType(type);

        for (const reference of references) {
          const referenceEquipments = await Equipment.allOfReference(reference);
          equipments.push(...referenceEquipments);
        }
      }
      else {
        equipments = await Equipment.all();
      }

      const availableEquipments = equipments.filter(async (equipment) => await equipment.isAvailable());

      return res
        .send({
          datas: availableEquipments.map(equipment => equipment.format()),
        });
    }
  );
}
