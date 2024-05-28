import 'dotenv/config';

import { authentificate } from '../../../../middlewares/authentificate.js';
import Equipment from '../../../../entities/Equipment.js';
import EquipmentType from '../../../../entities/EquipmentType.js';
import EquipmentReference from '../../../../entities/EquipmentReference.js';
import { header_authorization, params_name } from '../../../../middlewares/schemas.js';

export default function route(app) {
  app.get(
    '/referential/equipments/available',
    [
      header_authorization,
      authentificate,
      params_name('equipment_type_', true),
    ],
    async (req, res) => {
      let equipments = [];

      if (req.query.equipment_type_name) {
        if (!await EquipmentType.nameExists(req.query.equipment_type_name)) {
          return res
            .status(409)
            .send({ errors: [{ msg: 'EQUIPMENT_TYPE_NAME_NOT_FOUND' }] });
        }

        const equipmentType = await EquipmentType.fromName(req.query.equipment_type_name);

        const equipmentReferences = await EquipmentReference.allOfType(equipmentType);

        for (const equipmentReference of equipmentReferences) {
          const referenceEquipments = await Equipment.allOfReference(equipmentReference);
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
