
var
    form = document.getElementById('formHtmlProfesor'),
    btnSave = document.getElementById('btnSaveProfesor'),
    btnCleaner = document.getElementById('btnCleaner');






function getAllProfesores() {
    hideValidate();
    idxDB.open(appDBModel, function (e) {
        const store = appDBModel.stores.profesores.name;
        idxDB.getAll(store, data => {
            // let profesoresArray = [];
            // profesoresArray.push(...data);
            var tbody = document.getElementById('tbody')
            var tr = '';
            var str = '';
            data.forEach((p) => {
                str += `<tr><td>${p.firstNameProfesor}</td>`;
                str += `<td>${p.lastNameProfesor}</td>`;
                str += `<td>${p.emailProfesor}</td>`;
                str += `<td class="box-buttons"><div class="box-buttons" title="Asignar materia" > <a class="control assign"
                data-id="${p.clientId}"
                href="#"><img src="resources/svg/materias.svg" alt=""></a></div><div class="box-buttons" title="Borrar profesor" > <a class="control btnDeleteProfesor"
                data-id="${p.clientId}"
                href="#"><img src="resources/svg/delete.svg" alt=""></a></div></td>`
                str += `</tr>`
            })

            tbody.innerHTML = str;
            initBtnsActions();

        });

    });
}

function initBtnsActions() {
    const btnAssignSubject = document.querySelectorAll('a.assign');
    const btnDeleteProfesor = document.querySelectorAll('a.btnDeleteProfesor');
    btnAssignSubject.forEach(a => a.addEventListener('click', assignMateria));
    btnDeleteProfesor.forEach(a => a.addEventListener('click', deleteProfesor));
}

function assignMateria() {
    var key = this.dataset.id;
    const storeProfesor = appDBModel.stores.profesores.name;
    var storeAsignatura = appDBModel.stores.asignaturas.name;
    var materiaIn = prompt("Indique materia");
    if (materiaIn === '' || materiaIn === null) {
        return
    }
    idxDB.getById(storeProfesor, key, function (e) {
        var profesor = e.target.result;
        if (profesor !== null) {
            let asignatura = crearAsignatura();
            asignatura.clientId = idxDB.createUUID();
            asignatura.name = materiaIn;
            asignatura.profesor = profesor;
            idxDB.insert(storeAsignatura, asignatura, function (e) {
                if (e.type === 'success') {
                    alert(`Se creo la asignatura ${e.target.readyState}`)
                    profesor.materias.push(materiaIn);
                    idxDB.update(storeProfesor, profesor, key, function (p, e) {
                        if (e.target.readyState === 'done') {
                            alert(`Se agrego la materia ${materiaIn} al profesor ${p.firstNameProfesor}`)
                        }
                    })
                } else if (e.type === 'error') {
                }
            }, function (e) {
                console.log(e.error);
            })


        }
    });
}

function crearAsignatura() {
    return {
        clientId: "",
        name: "",
        profesor: {}
    }
}

function crearProfesor() {
    const
        firstNameProfesor = document.getElementById('firstNameProfesor'),
        lastNameProfesor = document.getElementById('lastNameProfesor'),
        emailProfesor = document.getElementById('emailProfesor'),
        phoneProfesor = document.getElementById('phoneProfesor'),
        stateProfesor = document.getElementById('stateProfesor'),
        inputs = document.querySelectorAll('div.control>input');
    let validate = validateForm(inputs);
    if (validate) {


        return {
            clientId: "",
            firstNameProfesor: firstNameProfesor.value,
            lastNameProfesor: lastNameProfesor.value,
            emailProfesor: emailProfesor.value,
            phoneProfesor: phoneProfesor.value,
            stateProfesor: true,
            materias: []
        };
    }
}
function clearFormProfesor() {
    hideValidate();
    document.getElementById('firstNameProfesor').value = "";
    document.getElementById('lastNameProfesor').value = "";
    document.getElementById('emailProfesor').value = "";
    document.getElementById('phoneProfesor').value = "";
}

function deleteProfesor(obj) {
    clearFormProfesor();

    const
        key = this.dataset.id,
        store = appDBModel.stores.profesores;

    idxDB.delete(store.name, key, function (e) {
        alert(`Borrado profesor plantel ${e.type}`)
        getAllProfesores();
    });

}




function saveProfesor() {
   
    const
        clientId = idxDB.createUUID();

    const
        newProfesor = crearProfesor();

    if (!newProfesor) {
        return
    }
    newProfesor.clientId = clientId
    idxDB.insert(appDBModel.stores.profesores.name, newProfesor, function (e) {

        alert('Registro exitoso ' + newProfesor.firstNameProfesor);
        getAllProfesores();
        clearFormProfesor();
    })
    // }


}




function init() {
    getAllProfesores();
}



btnSave.addEventListener('click', saveProfesor);
btnCleaner.addEventListener('click', clearFormProfesor);

form.addEventListener('submit', function (e) {
    e.preventDefault();
})
init();









