import { authenticate } from '../../../../middlewares/authenticate.js';
import Equipment from '../../../../entities/Equipment.js';
import Reference from '../../../../entities/Reference.js';
import { headerAuthorization, queryName } from '../../../../middlewares/schemas.js';
import Type from '../../../../entities/Type.js';

export default function route(app) {
  app.get(
    '/referential/equipments/available',
    [
      headerAuthorization(),
      authenticate,
      queryName('equipment_type_', true),
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

        const equipmentPromises = references.map(
          (reference) => Equipment.allOfReference(reference),
        );

        equipments = await Promise.all(equipmentPromises);

        equipments = equipments.flat();
      } else {
        equipments = await Equipment.all();
      }

      const availableEquipmentsPromises = equipments.map(
        async (equipment) => (await equipment.isAvailable() ? equipment : null),
      );

      const availableEquipments = (await Promise.all(availableEquipmentsPromises))
        .filter((equipment) => equipment !== null);

      return res
        .send({
          datas: availableEquipments.map((equipment) => equipment.format()),
        });
    },
  );
}
