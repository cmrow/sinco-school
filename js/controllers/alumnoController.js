var
    form = document.getElementById('formHtmlAlumno'),
    btnSave = document.getElementById('btnSaveAlumno'),
    btnCleaner = document.getElementById('btnCleaner');




function getAllAlumnos() {
    hideValidate();
    idxDB.open(appDBModel, function (e) {
        const store = appDBModel.stores.alumnos.name;
        idxDB.getAll(store, data => {
            var tbody = document.getElementById('tbody');
            var str = '';
            data.forEach((p) => {
                str += `<tr><td>${p.firstNameAlumno}</td>`;
                str += `<td>${p.lastNameAlumno}</td>`;
                str += `<td>${p.emailAlumno}</td>`;
                str += `<td class="box-buttons"><div class="box-buttons" title="Perfil" > <a class="control btnPerfilAlumno"
                data-id="${p.clientId}"
                href="#"><img src="resources/svg/perfil.svg" alt=""></a></div><div class="box-buttons" title="Editar" > <a class="control btnEditarAlumno"
                data-id="${p.clientId}"
                href="#"><img src="resources/svg/edit.svg" alt=""></a></div><div class="box-buttons" title="Borrar" > <a class="control btnBorrarAlumno"
                data-id="${p.clientId}"
                href="#"><img src="resources/svg/delete.svg" alt=""></a></div></td>`
                str += `</tr>`
            })

            tbody.innerHTML = str;
            initBtnsActions();

        });

    });
}

function editAlumno(e) {
    const
        clientId = document.getElementById('clientId'),
        firstNameAlumno = document.getElementById('firstNameAlumno'),
        lastNameAlumno = document.getElementById('lastNameAlumno'),
        emailAlumno = document.getElementById('emailAlumno'),
        phoneAlumno = document.getElementById('phoneAlumno'),
        inputs = document.querySelectorAll('div.control>input');
    const key = this.dataset.id;
    const store = appDBModel.stores.alumnos.name;
    idxDB.getById(store, key, function (e) {
        var alumno = e.target.result;
        if (alumno !== null) {
            clientId.value = alumno.clientId;
            firstNameAlumno.value = alumno.firstNameAlumno;
            lastNameAlumno.value = alumno.lastNameAlumno;
            emailAlumno.value = alumno.emailAlumno;
            phoneAlumno.value = alumno.phoneAlumno;
            btnSave.innerText = "Actualizar";

        }
    })
}

function showPerfil() {
    const tableHtml = document.getElementById('tableHtml');
    tableHtml.innerHTML = '';
    secForms.innerHTML = '';
    const key = this.dataset.id;
    const store = appDBModel.stores.alumnos.name;
    idxDB.getById(store, key, function (e) {
        const alumno = e.target.result,
            name = alumno.firstNameAlumno,
            lastName = alumno.lastNameAlumno,
            in1 = name.split('').shift().toUpperCase(),
            in2 = lastName.split('').shift().toUpperCase();
        const boxContent = document.getElementById('boxContent');
        let perfilHtml = ` <div class="perfil">
        <div class="iniciales">
            <abbr>${in1}${in2}</abbr>
        </div>
        <div class="box-perfil">
            <p>${name} ${lastName}</p>
        </div>
        <div class="box-perfil">
            <p>${alumno.emailAlumno}</p>
        </div>
        <div class="box-perfil">
            <p><span>Teléfono:</span> ${alumno.phoneAlumno}</p>
        </div>
        </div>
        <nav class="perfil">
            <button data-id="${alumno.clientId}" class="asignMateria" id="btnAssignMateria">Asignar materia</button>
            <button data-id="${alumno.clientId}" class="asignMateria" id="btnMateriasAsignadas">Materias asignadas</button>
        </nav>`;
        secForms.innerHTML = perfilHtml;
        titleContent.textContent = `Perfil del Alumno`;
        initBtnAssign();

    })
}
function getAllAsignaturas() {
    var keyAlumno = this.dataset.id;
    titleContent.textContent = `Asignar materias`;
    boxContent.innerHTML = tableMaterias;
    idxDB.open(appDBModel, function (e) {
        const store = appDBModel.stores.asignaturas.name;
        var tbody = document.getElementById('tbodyMaterias');
        var str = '';
        idxDB.getAll(store, data => {
            data.forEach(materia => {
                str += `<tr><td>${materia.name}</td>`;
                str += `<td>${materia.profesor.firstNameProfesor} ${materia.profesor.lastNameProfesor}</td>`
                str += `<td>${materia.profesor.emailProfesor}</td>`;
                str += `<td><input type="checkbox" data-id="${materia.clientId}"></td>`
                str += `</tr>`
            });

            str += `<button data-keyalumno="${keyAlumno}" class="asignMateria" id="btnAssign">Asignar</button>`
            tbody.innerHTML = str;
            listenBtnAssign();
        })
    })

}

function listenBtnAssign() {
    const btnAssing = document.getElementById('btnAssign').addEventListener('click', saveAgignaturasAlumno);
}

function saveAgignaturasAlumno() {
    var keyAlumno = this.dataset.keyalumno;
    let checkboxes = document.querySelectorAll('input[type=checkbox]');
    checkboxes = Array.from(checkboxes);
    const chekeds = checkboxes.filter(ipt => ipt.checked == true);
    chekeds.forEach(chk => {
        let key = chk.dataset.id;
        idxDB.getById(appDBModel.stores.asignaturas.name, key, function (e) {
            var asignatura = e.target.result
            var materiaAsignada = crearMateriaAsignada();
            materiaAsignada.clientId = asignatura.clientId;
            materiaAsignada.name = asignatura.name;
            materiaAsignada.profesor = asignatura.profesor;
            idxDB.getById(appDBModel.stores.alumnos.name, keyAlumno, function (e) {
                let alumnoUpdate = e.target.result;
                alumnoUpdate.materias.push(materiaAsignada);
                idxDB.update(appDBModel.stores.alumnos.name, alumnoUpdate, alumnoUpdate.clientId, function (e) {
                    alert(`Materia agregada ${materiaAsignada.name} al alumno ${e.firstNameAlumno}`)
                })
            })
        })

    })
}

function crearMateriaAsignada() {
    return {
        clientId: '',
        name: '',
        notas: [0, 0],
        profesor: {}
    }
}

function showMateriasAsignadas() {
    const idev = this.dataset.id;
    // const idalumno = idev == null ? idm : idev;
    const idalumno = idev;
    titleContent.textContent = `Materias asignadas`;


    idxDB.getById(appDBModel.stores.alumnos.name, idalumno, function (e) {
        var materiasTable = `<table id="tableHtml" class="table table-bordered table-striped table-hover">
    <thead>
        <tr>
            <th>Materia</th>
            <th>Profesor</th>
            <th>Nota 1er periodo</th>
            <th>Nota 2do periodo</th>
        </tr>
    </thead>
    <tbody id="tbody">
 `;
        let mates = e.target.result.materias;
        mates.forEach(ma => {
            materiasTable += `<tr><td>${ma.name}</td>`;
            materiasTable += `<td>${ma.profesor.firstNameProfesor} ${ma.profesor.lastNameProfesor}</td>`;
            materiasTable += `<td>${ma.notas[0]}</td>`;
            materiasTable += `<td>${ma.notas[1]}</td></tr>`;
        })
        materiasTable += `</tbody></table>`
        boxContent.innerHTML = materiasTable;
    })

}

function initBtnAssign() {
    var btnAssignMateria = document.getElementById('btnAssignMateria').addEventListener('click', getAllAsignaturas);
    var btnMateriasAsignadas = document.getElementById('btnMateriasAsignadas').addEventListener('click', showMateriasAsignadas);

}

function initBtnsActions() {
    const btnPerfilAlumno = document.querySelectorAll('a.btnPerfilAlumno');
    const btnEditarAlumno = document.querySelectorAll('a.btnEditarAlumno');
    const btnBorrarAlumno = document.querySelectorAll('a.btnBorrarAlumno');
    btnEditarAlumno.forEach(a => a.addEventListener('click', editAlumno));
    btnBorrarAlumno.forEach(a => a.addEventListener('click', deleteAlumno));
    btnPerfilAlumno.forEach(a => a.addEventListener('click', showPerfil));
}

function saveAlumno() {

    if (btnSave.textContent === 'Actualizar') {
        const
            updateAlumno = crearAlumno();
        const store = appDBModel.stores.alumnos.name;
        idxDB.update(store, updateAlumno, updateAlumno.clientId, function (alumno, e) {
            alert(`Alumno ${alumno.firstNameAlumno} atializado`);
            clearFormAlumno();
            getAllAlumnos();
        })
    } else {


        const
            clientId = idxDB.createUUID();

        const
            newAlumno = crearAlumno();

        if (!newAlumno) {
            return
        }
        newAlumno.clientId = clientId
        idxDB.insert(appDBModel.stores.alumnos.name, newAlumno, function (e) {

            alert('Registro exitoso ' + newAlumno.firstNameAlumno);
            clearFormAlumno();
            getAllAlumnos();
        })
    }


}

function deleteAlumno(obj, e) {

    clearFormAlumno();

    const
        key = this.dataset.id,
        store = appDBModel.stores.alumnos;

    idxDB.delete(store.name, key, function (e) {
        alert(`Alumno borrado`);
        getAllAlumnos();
    });

}

function crearAlumno() {
    const
        clientId = document.getElementById('clientId'),
        firstNameAlumno = document.getElementById('firstNameAlumno'),
        lastNameAlumno = document.getElementById('lastNameAlumno'),
        emailAlumno = document.getElementById('emailAlumno'),
        phoneAlumno = document.getElementById('phoneAlumno'),
        inputs = document.querySelectorAll('div.control>input');
    let validate = validateForm(inputs);
    if (validate) {


        return {
            clientId: clientId.value,
            firstNameAlumno: firstNameAlumno.value,
            lastNameAlumno: lastNameAlumno.value,
            emailAlumno: emailAlumno.value,
            phoneAlumno: phoneAlumno.value,
            stateAlumno: true,
            materias: []
        };
    }
}


function clearFormAlumno() {
    hideValidate();
    document.getElementById('firstNameAlumno').value = "";
    document.getElementById('lastNameAlumno').value = "";
    document.getElementById('emailAlumno').value = "";
    document.getElementById('phoneAlumno').value = "";
    btnSave.innerText = "Guardar";

}

function init() {
    getAllAlumnos();
}

btnCleaner.addEventListener('click', clearFormAlumno);
btnSave.addEventListener('click', saveAlumno);


form.addEventListener('submit', function (e) {
    e.preventDefault();
})
init();
