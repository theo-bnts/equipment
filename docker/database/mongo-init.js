db.createUser(
    {
        user: 'angular',
        pwd: 'angular',
        roles: [
            {
                role: 'readWrite',
                db: 'project'
            }
        ]
    }
);

db = db.getSiblingDB('project');

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

db.createCollection('equipment_type', {
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

db.createCollection('equipment_reference', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['name', 'id_equipment_type'],
            properties: {
                name: {
                    bsonType: 'string',
                    description: 'must be a string and is required'
                },
                id_equipment_type: {
                    bsonType: 'int',
                    description: 'must be an integer and is required'
                }
            }
        }
    }
});

db.createCollection('equipment_loan_state_type', {
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

db.createCollection('equipment', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['id_stockage_room', 'id_equipment_reference'],
            properties: {
                id_stockage_room: {
                    bsonType: 'int',
                    description: 'must be an integer and is required'
                },
                id_equipment_reference: {
                    bsonType: 'int',
                    description: 'must be an integer and is required'
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
                    bsonType: 'int',
                    description: 'must be an integer and is required'
                }
            }
        }
    }
});

db.createCollection('equipment_loan', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['id_state_type', 'loan_date', 'return_date', 'id_loan_room', 'id_user', 'id_equipment'],
            properties: {
                id_state_type: {
                    bsonType: 'int',
                    description: 'must be an integer and is required'
                },
                loan_date: {
                    bsonType: 'date',
                    description: 'must be a date and is required'
                },
                return_date: {
                    bsonType: 'date',
                    description: 'must be a date and is required'
                },
                id_loan_room: {
                    bsonType: 'int',
                    description: 'must be an integer and is required'
                },
                id_user: {
                    bsonType: 'int',
                    description: 'must be an integer and is required'
                },
                id_organization: {
                    bsonType: 'int',
                    description: 'must be an integer'
                },
                id_equipment: {
                    bsonType: 'int',
                    description: 'must be an integer and is required'
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
                    bsonType: 'int',
                    description: 'must be an integer and is required'
                },
                id_organization: {
                    bsonType: 'int',
                    description: 'must be an integer and is required'
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
                    bsonType: 'int',
                    description: 'must be an integer and is required'
                }
            }
        }
    }
});

db.room.createIndex({ 'name': 1 }, { unique: true });
db.equipment_type.createIndex({ 'name': 1 }, { unique: true });
db.organization.createIndex({ 'name': 1 }, { unique: true });
db.role_type.createIndex({ 'name': 1 }, { unique: true });
db.equipment_reference.createIndex({ 'name': 1 }, { unique: true });
db.equipment_loan_state_type.createIndex({ 'name': 1 }, { unique: true });
db.user.createIndex({ 'email_address': 1 }, { unique: true });
db.user.createIndex({ 'password_hash': 1 }, { unique: true });
db.user.createIndex({ 'password_hash_salt': 1 }, { unique: true });
db.token.createIndex({ 'value': 1 }, { unique: true });

db.equipment_reference.createIndex({ 'id_equipment_type': 1 });
db.equipment.createIndex({ 'id_stockage_room': 1 });
db.equipment.createIndex({ 'id_equipment_reference': 1 });
db.user.createIndex({ 'id_role_type': 1 });
db.equipment_loan.createIndex({ 'id_state_type': 1 });
db.equipment_loan.createIndex({ 'id_loan_room': 1 });
db.equipment_loan.createIndex({ 'id_user': 1 });
db.equipment_loan.createIndex({ 'id_organization': 1 });
db.equipment_loan.createIndex({ 'id_equipment': 1 });
db.user_organization.createIndex({ 'id_user': 1 });
db.user_organization.createIndex({ 'id_organization': 1 });
db.token.createIndex({ 'id_user': 1 });

db.room.insertMany([
    { _id: 1, name: 'UFR des Sciences - Salle de stockage du matériel' },
    { _id: 2, name: 'UFR des Sciences - Bureau des informaticiens' },
    { _id: 3, name: 'UFR des Sciences - F101' },
    { _id: 4, name: 'UFR des Sciences - F102' },
    { _id: 5, name: 'UFR des Sciences - F103' },
    { _id: 6, name: 'UFR des Sciences - F104' },
    { _id: 7, name: 'UFR des Sciences - F105' },
    { _id: 8, name: 'UFR de Médecine - Salle de stockage du matériel' },
    { _id: 9, name: 'UFR de Médecine - Bureau des informaticiens' },
    { _id: 10, name: 'UFR de Médecine - M101' },
    { _id: 11, name: 'UFR de Médecine - M102' },
    { _id: 12, name: 'UFR de Médecine - M103' },
    { _id: 13, name: 'UFR de Médecine - M104' },
    { _id: 14, name: 'UFR de Médecine - M105' }
]);

db.equipment_type.insertMany([
    { _id: 1, name: 'Ordinateur portable', organization_only: false },
    { _id: 2, name: 'Projecteur', organization_only: true }
]);

db.organization.insertMany([
    { _id: 1, name: 'Administration de l\'UFR des Sciences' },
    { _id: 2, name: 'Département Informatique' },
    { _id: 3, name: 'Administration de l\'UFR de Médecine' },
    { _id: 4, name: 'PAES' }
]);

db.role_type.insertMany([
    { _id: 1, name: 'Administrateur' },
    { _id: 2, name: 'Utilisateur' }
]);

db.equipment_reference.insertMany([
    { _id: 1, name: 'Ordinateur portable Dell', id_equipment_type: 1 },
    { _id: 2, name: 'Ordinateur portable HP', id_equipment_type: 1 },
    { _id: 3, name: 'MacBook Pro', id_equipment_type: 1 },
    { _id: 4, name: 'Projecteur Dell', id_equipment_type: 2 }
]);

db.equipment_loan_state_type.insertMany([
    { _id: 1, name: 'Disponible' },
    { _id: 2, name: 'Demandé' },
    { _id: 3, name: 'Emprunté' },
    { _id: 4, name: 'Retour demandé' }
]);

db.equipment.insertMany([
    { _id: 1, id_stockage_room: 1, id_equipment_reference: 1 },
    { _id: 2, id_stockage_room: 1, id_equipment_reference: 1 },
    { _id: 3, id_stockage_room: 1, id_equipment_reference: 1 },
    { _id: 4, id_stockage_room: 1, id_equipment_reference: 2 },
    { _id: 5, id_stockage_room: 1, id_equipment_reference: 3 },
    { _id: 6, id_stockage_room: 1, id_equipment_reference: 4 },
    { _id: 7, id_stockage_room: 2, id_equipment_reference: 1 },
    { _id: 8, id_stockage_room: 8, id_equipment_reference: 1 },
    { _id: 9, id_stockage_room: 8, id_equipment_reference: 2 },
    { _id: 10, id_stockage_room: 8, id_equipment_reference: 2 },
    { _id: 11, id_stockage_room: 8, id_equipment_reference: 3 },
    { _id: 12, id_stockage_room: 8, id_equipment_reference: 4 }
]);

db.user.insertMany([
    { _id: 1, email_address: 'frederic.furst@u-picardie.fr', password_hash: '62670b97dd4abc773a8a83d5cf77a57316721511e299112e6bdb01012aab8bb8d22ef20a74d40791dc25982f4a82522c908ea65b3e4d2fdfa1d366eab1c1283c', password_hash_salt: 'c1510d7abd6d2b776c358579029d15242754ded0b175652e6303f0fab5a8dfbb655d86ee4440a529ff639546b9f4caf138defa3bed16bcbc175d22c4cbf78665', first_name: 'Frédéric', last_name: 'Furst', id_role_type: 1 },
    { _id: 2, email_address: 'theo.bontemps@etud.u-picardie.fr', password_hash: '5aa326e72e2e6b9cb146a11348718f2210bddaa92b987959a5170e8521a37c34728ca199d96261713037a9bcddc9d80f2a680e9217f01c37ceb8994b370e5e8e', password_hash_salt: '02fffac693893ca2a123efc392f04a04240f3a4cd6750789bc9ca06ac2ae28a923775bebbb58bcdaa6a0dbe1cb496665bd355f311939e246c315140ca023de2c', first_name: 'Théo', last_name: 'Bontemps', id_role_type: 2 },
    { _id: 3, email_address: 'dorian.descamps@etud.u-picardie.fr', password_hash: '86099dcaccefe1cf9c0bf773e0155a86ab8e2430b91287996b259c4f65a429d67685bed385dc459ade88322225a33e25f7bd2e6213d7ec6a0b41fdb782985e78', password_hash_salt: '574a8d3b175ecf785a8a1b47ac95c05675b41bd820407b260a567eb2e404d5c2684746e3ea1916963b54beebfb575b8bfb8b371a81353caaa5af2fea5c67c1e2', first_name: 'Dorian', last_name: 'Descamps', id_role_type: 2 },
]);

db.equipment_loan.insertMany([
    { _id: 1, id_state_type: 3, loan_date: new Date('2023-01-01'), return_date: new Date('2023-01-10'), id_loan_room: 3, id_user: 2, id_organization: 1, id_equipment: 1 },
    { _id: 2, id_state_type: 1, loan_date: new Date('2023-01-15'), return_date: new Date('2023-01-20'), id_loan_room: 4, id_user: 3, id_organization: 2, id_equipment: 2 },
    { _id: 3, id_state_type: 4, loan_date: new Date('2023-02-01'), return_date: new Date('2023-02-10'), id_loan_room: 5, id_user: 4, id_organization: 3, id_equipment: 3 },
    { _id: 4, id_state_type: 2, loan_date: new Date('2023-02-05'), return_date: new Date('2023-02-15'), id_loan_room: 6, id_user: 5, id_organization: 4, id_equipment: 4 },
    { _id: 5, id_state_type: 3, loan_date: new Date('2023-03-01'), return_date: new Date('2023-03-05'), id_loan_room: 7, id_user: 2, id_organization: 2, id_equipment: 5 }
]);

db.user_organization.insertMany([
    { _id: 1, id_user: 2, id_organization: 1 },
    { _id: 2, id_user: 2, id_organization: 2 },
    { _id: 3, id_user: 3, id_organization: 2 }
]);