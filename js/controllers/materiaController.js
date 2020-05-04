function getAllMaterias() {
    idxDB.open(appDBModel, function (e) {
        const store = appDBModel.stores.asignaturas.name;
        var tbody = document.getElementById('tbodyMaterias');
        var str = '';
        idxDB.getAll(store, data => {
            data.forEach(materia => {
                str += `<tr><td>${materia.name}</td>`;
                str += `<td>${materia.profesor.firstNameProfesor} ${materia.profesor.lastNameProfesor}</td>`
                str += `<td>${materia.profesor.emailProfesor}</td>`;
                str += `<td title="Para asignar materias puede hacerlo desde el perfil del Alumno"><samp>No hay acciones</samp></td>`
                str += `</tr>`
            });
            tbody.innerHTML = str;

        })
    })
}

getAllMaterias();