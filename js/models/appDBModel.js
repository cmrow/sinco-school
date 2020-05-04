var appDBModel = (function () {
    var model = {
        name: 'Sinco_DB',
        version: 1,
        stores: {
            alumnos: {
                name: 'alumnos',
                key: { keyPath: 'clientId' },
                indexes: {
                    name: {
                        name: 'email',
                        definition: { unique: true }
                    }
                }
            },
            profesores: {
                name: 'profesores',
                key: { keyPath: 'clientId' },
                indexes: {
                    name: {
                        name: 'email',
                        definition: { unique: true }
                    }
                }
            },
            asignaturas: {
                name: 'asignaturas',
                key: { keyPath: 'clientId' },
                indexes: {
                    name: {
                        name: 'name',
                        definition: { unique: false }
                    }
                }

            },
        },
        upgrade: function (e) {
            var newVersion = e.target.result;
            const
                storeModelAlumnos = appDBModel.stores.alumnos,
                storeModelProfesores = appDBModel.stores.profesores,
                storeModelAsignaturas = appDBModel.stores.asignaturas;

            validateStore(storeModelAlumnos);
            validateStore(storeModelProfesores);
            validateStore(storeModelAsignaturas);

            function validateStore(storeModel) {
                if (!newVersion.objectStoreNames.contains(storeModel.name)) {
                    const indexModel = storeModel.indexes.name;
                    const store = newVersion.createObjectStore(storeModel.name,
                        storeModel.key);
                    store.createIndex(indexModel.name,
                        indexModel.name,
                        indexModel.definition)

                }
            }
        }
    };

    return model;
})();