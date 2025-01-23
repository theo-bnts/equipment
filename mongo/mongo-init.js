/**
 * Users
 */
db.createUser(
    {
        user: 'equipment',
        pwd: 'equipment',
        roles: [
            {
                role: 'readWrite',
                db: 'equipment'
            }
        ]
    }
);

/**
 * Collections
 */
db = db.getSiblingDB('equipment');

db.createCollection('room', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['name'],
            properties: {
                name: {
                    bsonType: 'string',
                    description: 'must be a string and is required'
                }
            }
        }
    }
});

db.createCollection('type', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['name', 'organization_only'],
            properties: {
                name: {
                    bsonType: 'string',
                    description: 'must be a string and is required'
                },
                organization_only: {
                    bsonType: 'bool',
                    description: 'must be a boolean and is required'
                }
            }
        }
    }
});

db.createCollection('organization', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['name'],
            properties: {
                name: {
                    bsonType: 'string',
                    description: 'must be a string and is required'
                }
            }
        }
    }
});

db.createCollection('role_type', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['name', 'display_name_french'],
            properties: {
                name: {
                    bsonType: 'string',
                    description: 'must be a string and is required'
                },
                display_name_french: {
                    bsonType: 'string',
                    description: 'must be a string and is required'
                }
            }
        }
    }
});

db.createCollection('reference', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['name', 'id_type'],
            properties: {
                name: {
                    bsonType: 'string',
                    description: 'must be a string and is required'
                },
                id_type: {
                    bsonType: 'objectId',
                    description: 'must be an ObjectId and is required'
                }
            }
        }
    }
});

db.createCollection('state_type', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['name', 'display_name_french'],
            properties: {
                name: {
                    bsonType: 'string',
                    description: 'must be a string and is required'
                },
                display_name_french: {
                    bsonType: 'string',
                    description: 'must be a string and is required'
                }
            }
        }
    }
});

db.createCollection('equipment', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['code', 'id_stockage_room', 'id_reference', 'end_of_life_date'],
            properties: {
                reference: {
                    bsonType: 'string',
                    description: 'must be a string and is required'
                },
                id_stockage_room: {
                    bsonType: 'objectId',
                    description: 'must be an ObjectId and is required'
                },
                id_reference: {
                    bsonType: 'objectId',
                    description: 'must be an ObjectId and is required'
                },
                end_of_life_date: {
                    bsonType: 'date',
                    description: 'must be a date and is required'
                }
            }
        }
    }
});

db.createCollection('user', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['email_address', 'password_hash', 'password_hash_salt', 'first_name', 'last_name', 'id_role_type'],
            properties: {
                email_address: {
                    bsonType: 'string',
                    description: 'must be a string and is required'
                },
                password_hash: {
                    bsonType: 'string',
                    description: 'must be a string and is required'
                },
                password_hash_salt: {
                    bsonType: 'string',
                    description: 'must be a string and is required'
                },
                first_name: {
                    bsonType: 'string',
                    description: 'must be a string and is required'
                },
                last_name: {
                    bsonType: 'string',
                    description: 'must be a string and is required'
                },
                id_role_type: {
                    bsonType: 'objectId',
                    description: 'must be an ObjectId and is required'
                }
            }
        }
    }
});

db.createCollection('loan', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['id_state_type', 'loan_date', 'return_date', 'id_room', 'id_user', 'id_organization', 'id_equipment'],
            properties: {
                id_state_type: {
                    bsonType: 'objectId',
                    description: 'must be an ObjectId and is required'
                },
                loan_date: {
                    bsonType: 'date',
                    description: 'must be a date and is required'
                },
                return_date: {
                    bsonType: 'date',
                    description: 'must be a date and is required'
                },
                id_room: {
                    bsonType: 'objectId',
                    description: 'must be an ObjectId and is required'
                },
                id_user: {
                    bsonType: 'objectId',
                    description: 'must be an ObjectId and is required'
                },
                id_organization: {
                    bsonType: ['objectId', 'null'],
                    description: 'must be an ObjectId'
                },
                id_equipment: {
                    bsonType: 'objectId',
                    description: 'must be an ObjectId and is required'
                }
            }
        }
    }
});

db.createCollection('user_organization', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['id_user', 'id_organization'],
            properties: {
                id_user: {
                    bsonType: 'objectId',
                    description: 'must be an ObjectId and is required'
                },
                id_organization: {
                    bsonType: 'objectId',
                    description: 'must be an ObjectId and is required'
                }
            }
        }
    }
});

db.createCollection('token', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['value', 'expiration', 'id_user'],
            properties: {
                value: {
                    bsonType: 'string',
                    description: 'must be a string and is required'
                },
                expiration: {
                    bsonType: 'date',
                    description: 'must be a date and is required'
                },
                id_user: {
                    bsonType: 'objectId',
                    description: 'must be an ObjectId and is required'
                }
            }
        }
    }
});

/**
 * Indexes
 */
db.room.createIndex({ 'name': 1 }, { unique: true });
db.type.createIndex({ 'name': 1 }, { unique: true });
db.organization.createIndex({ 'name': 1 }, { unique: true });
db.role_type.createIndex({ 'name': 1 }, { unique: true });
db.reference.createIndex({ 'name': 1 }, { unique: true });
db.state_type.createIndex({ 'name': 1 }, { unique: true });
db.user.createIndex({ 'email_address': 1 }, { unique: true });
db.user.createIndex({ 'password_hash': 1 }, { unique: true });
db.user.createIndex({ 'password_hash_salt': 1 }, { unique: true });
db.token.createIndex({ 'value': 1 }, { unique: true });

db.reference.createIndex({ 'id_type': 1 });
db.equipment.createIndex({ 'id_stockage_room': 1 });
db.equipment.createIndex({ 'id_reference': 1 });
db.user.createIndex({ 'id_role_type': 1 });
db.loan.createIndex({ 'id_state_type': 1 });
db.loan.createIndex({ 'id_room': 1 });
db.loan.createIndex({ 'id_user': 1 });
db.loan.createIndex({ 'id_organization': 1 });
db.loan.createIndex({ 'id_equipment': 1 });
db.user_organization.createIndex({ 'id_user': 1 });
db.user_organization.createIndex({ 'id_organization': 1 });
db.token.createIndex({ 'id_user': 1 });

/**
 * Data
 */
const generateObjectIds = (count) => Array.from({ length: count }, () => new ObjectId());

const roomIds = generateObjectIds(10);
const typesIds = generateObjectIds(5);
const organizationIds = generateObjectIds(4);
const roleTypeIds = generateObjectIds(2);
const referenceIds = generateObjectIds(10);
const stateTypeIds = generateObjectIds(5);
const userIds = generateObjectIds(3);
const equipmentIds = generateObjectIds(20);
const loanIds = generateObjectIds(5);
const userOrganizationIds = generateObjectIds(3);

db.room.insertMany([
    { _id: roomIds[0], name: 'UFR des Sciences - Salle de stockage du matériel' },
    { _id: roomIds[1], name: 'UFR des Sciences - Bureau des informaticiens' },
    { _id: roomIds[2], name: 'UFR des Sciences - F101' },
    { _id: roomIds[3], name: 'UFR des Sciences - F102' },
    { _id: roomIds[4], name: 'UFR des Sciences - F103' },
    { _id: roomIds[5], name: 'UFR de Médecine - Salle de stockage du matériel' },
    { _id: roomIds[6], name: 'UFR de Médecine - Bureau des informaticiens' },
    { _id: roomIds[7], name: 'UFR de Médecine - M101' },
    { _id: roomIds[8], name: 'UFR de Médecine - M102' },
    { _id: roomIds[9], name: 'UFR de Médecine - M103' },
]);

db.type.insertMany([
    { _id: typesIds[0], name: 'Bureau', organization_only: false },
    { _id: typesIds[1], name: 'Armoire', organization_only: false },
    { _id: typesIds[2], name: 'Téléphone fixe', organization_only: false },
    { _id: typesIds[3], name: 'Imprimante', organization_only: true },
    { _id: typesIds[4], name: 'Projecteur', organization_only: true }
]);

db.organization.insertMany([
    { _id: organizationIds[0], name: 'Administration de l\'UFR des Sciences' },
    { _id: organizationIds[1], name: 'Département Informatique' },
    { _id: organizationIds[2], name: 'Administration de l\'UFR de Médecine' },
    { _id: organizationIds[3], name: 'PAES' }
]);

db.role_type.insertMany([
    { _id: roleTypeIds[0], name: 'ADMINISTRATOR', display_name_french: 'Administrateur' },
    { _id: roleTypeIds[1], name: 'USER', display_name_french: 'Utilisateur' }
]);

db.reference.insertMany([
    { _id: referenceIds[0], name: 'Bureau droit', id_type: typesIds[0] },
    { _id: referenceIds[1], name: 'Bureau angle', id_type: typesIds[0] },
    { _id: referenceIds[2], name: 'Armoire 2 portes', id_type: typesIds[1] },
    { _id: referenceIds[3], name: 'Armoire 3 portes', id_type: typesIds[1] },
    { _id: referenceIds[4], name: 'Téléphone fixe', id_type: typesIds[2] },
    { _id: referenceIds[5], name: 'Imprimante HP', id_type: typesIds[3] },
    { _id: referenceIds[6], name: 'Imprimante Canon', id_type: typesIds[3] },
    { _id: referenceIds[7], name: 'Projecteur Epson', id_type: typesIds[4] },
    { _id: referenceIds[8], name: 'Projecteur BenQ', id_type: typesIds[4] },
    { _id: referenceIds[9], name: 'Projecteur Optoma', id_type: typesIds[4] }
]);

db.state_type.insertMany([
    { _id: stateTypeIds[0], name: 'REQUESTED', display_name_french: 'Demandé' },
    { _id: stateTypeIds[1], name: 'REFUSED', display_name_french: 'Refusé' },
    { _id: stateTypeIds[2], name: 'LOANED', display_name_french: 'Emprunté' },
    { _id: stateTypeIds[3], name: 'RETURN_REQUESTED', display_name_french: 'Retour demandé' },
    { _id: stateTypeIds[4], name: 'RETURNED', display_name_french: 'Retourné' }
]);

db.equipment.insertMany([
    { _id: equipmentIds[0], code: 'FR00001', id_stockage_room: roomIds[0], id_reference: referenceIds[0], end_of_life_date: new Date('2024-01-01') },
    { _id: equipmentIds[1], code: 'FR00002', id_stockage_room: roomIds[0], id_reference: referenceIds[1], end_of_life_date: new Date('2024-07-01') },
    { _id: equipmentIds[2], code: 'FR00003', id_stockage_room: roomIds[0], id_reference: referenceIds[2], end_of_life_date: new Date('2024-07-01') },
    { _id: equipmentIds[3], code: 'FR00004', id_stockage_room: roomIds[0], id_reference: referenceIds[3], end_of_life_date: new Date('2025-01-01') },
    { _id: equipmentIds[4], code: 'FR00005', id_stockage_room: roomIds[0], id_reference: referenceIds[4], end_of_life_date: new Date('2025-01-01') },
    { _id: equipmentIds[5], code: 'FR00006', id_stockage_room: roomIds[0], id_reference: referenceIds[5], end_of_life_date: new Date('2025-01-01') },
    { _id: equipmentIds[6], code: 'FR00007', id_stockage_room: roomIds[0], id_reference: referenceIds[6], end_of_life_date: new Date('2025-01-01') },
    { _id: equipmentIds[7], code: 'FR00008', id_stockage_room: roomIds[0], id_reference: referenceIds[7], end_of_life_date: new Date('2025-01-01') },
    { _id: equipmentIds[8], code: 'FR00009', id_stockage_room: roomIds[0], id_reference: referenceIds[8], end_of_life_date: new Date('2025-01-01') },
    { _id: equipmentIds[9], code: 'FR00010', id_stockage_room: roomIds[0], id_reference: referenceIds[9], end_of_life_date: new Date('2025-01-01') },
    { _id: equipmentIds[10], code: 'FR00011', id_stockage_room: roomIds[5], id_reference: referenceIds[0], end_of_life_date: new Date('2025-01-01') },
    { _id: equipmentIds[11], code: 'FR00012', id_stockage_room: roomIds[5], id_reference: referenceIds[1], end_of_life_date: new Date('2025-01-01') },
    { _id: equipmentIds[12], code: 'FR00013', id_stockage_room: roomIds[5], id_reference: referenceIds[2], end_of_life_date: new Date('2025-01-01') },
    { _id: equipmentIds[13], code: 'FR00014', id_stockage_room: roomIds[5], id_reference: referenceIds[3], end_of_life_date: new Date('2025-01-01') },
    { _id: equipmentIds[14], code: 'FR00015', id_stockage_room: roomIds[5], id_reference: referenceIds[4], end_of_life_date: new Date('2025-01-01') },
    { _id: equipmentIds[15], code: 'FR00016', id_stockage_room: roomIds[5], id_reference: referenceIds[5], end_of_life_date: new Date('2025-01-01') },
    { _id: equipmentIds[16], code: 'FR00017', id_stockage_room: roomIds[5], id_reference: referenceIds[6], end_of_life_date: new Date('2025-01-01') },
    { _id: equipmentIds[17], code: 'FR00018', id_stockage_room: roomIds[5], id_reference: referenceIds[7], end_of_life_date: new Date('2025-01-01') },
    { _id: equipmentIds[18], code: 'FR00019', id_stockage_room: roomIds[5], id_reference: referenceIds[8], end_of_life_date: new Date('2025-01-01') },
    { _id: equipmentIds[19], code: 'FR00020', id_stockage_room: roomIds[5], id_reference: referenceIds[9], end_of_life_date: new Date('2025-01-01') }
]);

db.user.insertMany([
    { _id: userIds[0], email_address: 'frederic.furst@u-picardie.fr', password_hash: '62670b97dd4abc773a8a83d5cf77a57316721511e299112e6bdb01012aab8bb8d22ef20a74d40791dc25982f4a82522c908ea65b3e4d2fdfa1d366eab1c1283c', password_hash_salt: 'c1510d7abd6d2b776c358579029d15242754ded0b175652e6303f0fab5a8dfbb655d86ee4440a529ff639546b9f4caf138defa3bed16bcbc175d22c4cbf78665', first_name: 'Frédéric', last_name: 'Fürst', id_role_type: roleTypeIds[0] },
    { _id: userIds[1], email_address: 'theo.bontemps@etud.u-picardie.fr', password_hash: '5aa326e72e2e6b9cb146a11348718f2210bddaa92b987959a5170e8521a37c34728ca199d96261713037a9bcddc9d80f2a680e9217f01c37ceb8994b370e5e8e', password_hash_salt: '02fffac693893ca2a123efc392f04a04240f3a4cd6750789bc9ca06ac2ae28a923775bebbb58bcdaa6a0dbe1cb496665bd355f311939e246c315140ca023de2c', first_name: 'Théo', last_name: 'Bontemps', id_role_type: roleTypeIds[1] },
    { _id: userIds[2], email_address: 'dorian.descamps@etud.u-picardie.fr', password_hash: '86099dcaccefe1cf9c0bf773e0155a86ab8e2430b91287996b259c4f65a429d67685bed385dc459ade88322225a33e25f7bd2e6213d7ec6a0b41fdb782985e78', password_hash_salt: '574a8d3b175ecf785a8a1b47ac95c05675b41bd820407b260a567eb2e404d5c2684746e3ea1916963b54beebfb575b8bfb8b371a81353caaa5af2fea5c67c1e2', first_name: 'Dorian', last_name: 'Descamps', id_role_type: roleTypeIds[1] }
]);

db.loan.insertMany([
    { _id: loanIds[0], id_state_type: stateTypeIds[0], loan_date: new Date('2023-05-01'), return_date: new Date('2023-05-15'), id_room: roomIds[2], id_user: userIds[1], id_organization: null, id_equipment: equipmentIds[0] },
    { _id: loanIds[1], id_state_type: stateTypeIds[2], loan_date: new Date('2023-06-01'), return_date: new Date('2023-06-10'), id_room: roomIds[3], id_user: userIds[1], id_organization: organizationIds[0], id_equipment: equipmentIds[1] },
    { _id: loanIds[2], id_state_type: stateTypeIds[0], loan_date: new Date('2023-07-01'), return_date: new Date('2023-07-15'), id_room: roomIds[4], id_user: userIds[1], id_organization: organizationIds[1], id_equipment: equipmentIds[2] },
    { _id: loanIds[3], id_state_type: stateTypeIds[3], loan_date: new Date('2023-08-01'), return_date: new Date('2023-08-15'), id_room: roomIds[2], id_user: userIds[1], id_organization: null, id_equipment: equipmentIds[3] },
    { _id: loanIds[4], id_state_type: stateTypeIds[4], loan_date: new Date('2023-09-01'), return_date: new Date('2023-09-15'), id_room: roomIds[3], id_user: userIds[1], id_organization: organizationIds[1], id_equipment: equipmentIds[4] },
]);

db.user_organization.insertMany([
    { _id: userOrganizationIds[0], id_user: userIds[1], id_organization: organizationIds[0] },
    { _id: userOrganizationIds[1], id_user: userIds[1], id_organization: organizationIds[1] }
]);
