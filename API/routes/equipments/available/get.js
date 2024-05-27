import 'dotenv/config';

import { authentificate } from '../../../middlewares/authentificate.js';
import Equipment from '../../../entities/Equipment.js';
import EquipmentLoan from '../../../entities/EquipmentLoan.js';
import EquipmentLoanStateType from '../../../entities/EquipmentLoanStateType.js';
import EquipmentType from '../../../entities/EquipmentType.js';
import EquipmentReference from '../../../entities/EquipmentReference.js';
import { header_authorization, params_name } from '../../../middlewares/schemas.js';

export default function route(app) {
  app.get(
    '/equipments/available',
    [
      header_authorization,
      authentificate,
      params_name('equipment_type_'),
    ],
    async (req, res) => {
      let equipments = [];

      if (req.query.equipment_type_name) {
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

      const stateTypes = [
        await EquipmentLoanStateType.fromName('Demandé'),
        await EquipmentLoanStateType.fromName('Emprunté'),
        await EquipmentLoanStateType.fromName('Retour demandé'),
      ];

      const equipmentLoans = await EquipmentLoan.allOfStateTypes(stateTypes);

      equipments = equipments.filter((equipment) => {
        return !equipmentLoans.some((equipmentLoan) => equipmentLoan.Equipment.Id.equals(equipment.Id));
      });

      return res
        .send({
          datas: equipments.map(equipment => equipment.format()),
        });
    }
  );
}
