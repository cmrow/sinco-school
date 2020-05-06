var secForms = document.getElementById('secForms'),
    liMaterias = document.getElementById('liMaterias'),
    liProfesores = document.getElementById('liProfesores'),
    liAlumnos = document.getElementById('liAlumnos'),
    titleContent = document.getElementById('titleContent'),
    boxScripts = document.getElementById('scripts'),
    boxContent = document.getElementById('boxContent')
    ;

var flagMateria = false;


const formMateria = `<form action="" class="form-active">
    <input type="hidden"  />
    <h2>Registro Materia</h2>
    <fieldset>
        <div class="control">
            <label for="nameMateria">
                Nombre
            </label>
            <input type="text" name="nameMateria" required >
        </div>
    </fieldset>
    <div class="buttons">
    <button >Limpiar</button>
    <button id="btnEnviarMateria"></button>
    </div>
    </form>
    `;

const formHtmlProfesor = `<form action="" id="formHtmlProfesor" class="form-active" method="POST">
<h2>Registro Profesor</h2>
<fieldset>
    <div class="control">
        <label for="firstNameProfesor">
            Nombres
        </label>
        <input type="text" id="firstNameProfesor" 
    >
    </div>
    <div class="control">
        <label for="lastNameProfesor">
            Apellidos
        </label>
        <input type="text" id="lastNameProfesor" 
    >
    </div>
    <div class="control">
        <label for="emailProfesor">
            Correo
        </label>
        <input type="text" id="emailProfesor">
    </div>
    <div class="control">
        <label for="phoneProfesor">
            Teléfono
        </label>
        <input type="text" id="phoneProfesor">
    </div>
    <div class="no-active" id="boxValidate">Debe diligenciar todos los campos!</div>
    
</fieldset>
<div class="buttons">
    <button id="btnCleaner">Limpiar</button>
    <button id="btnSaveProfesor">Guardar</button>
</div>
</form>`;
const formHtmlAlumno = `<form action="" id="formHtmlAlumno" class="form-active" method="POST">
<h2>Registro Alumno</h2>
<input type="hidden" id="clientId">
<fieldset>
    <div class="control">
        <label for="firstNameAlumno">
            Nombres
        </label>
        <input type="text" id="firstNameAlumno" 
    >
    </div>
    <div class="control">
        <label for="lastNameAlumno">
            Apellidos
        </label>
        <input type="text" id="lastNameAlumno" 
    >
    </div>
    <div class="control">
        <label for="emailAlumno">
            Correo
        </label>
        <input type="text" id="emailAlumno">
    </div>
    <div class="control">
        <label for="phoneAlumno">
            Teléfono
        </label>
        <input type="text" id="phoneAlumno">
    </div>
    <div class="no-active" id="boxValidate">Debe diligenciar todos los campos!</div>
    
</fieldset>
<div class="buttons">
    <button id="btnCleaner">Limpiar</button>
    <button id="btnSaveAlumno">Guardar</button>
</div>
</form>`;

const tableMaterias = `<table id="tableMaterias" class="table table-bordered table-striped table-hover">
<thead>
    <tr>
        <th>Materia</th>
        <th>Profesor</th>
        <th>Correo</th>
        <th>Asignar</th>
    </tr>
</thead>
<tbody id="tbodyMaterias">
    
</tbody>
</table>`

const tableHtml = `<table id="tableHtml" class="table table-bordered table-striped table-hover">
<thead>
    <tr>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Correo</th>
        <th>Acciones</th>
    </tr>
</thead>
<tbody id="tbody">
    
</tbody>
</table>`;


function showAlumnosBoard() {
    const controllerUrl = "js/controllers/alumnoController.js";
    liProfesores.classList.remove('li-active');
    liMaterias.classList.remove('li-active');
    this.classList.add('li-active');
    titleContent.textContent = 'Alumnos';
    if (secForms.childElementCount > 0) {
        secForms.innerHTML = '';
        boxContent.innerHTML = '';
        boxScripts.innerHTML = '';
        secForms.innerHTML = formHtmlAlumno;
        boxContent.innerHTML = tableHtml;
        loadScript(controllerUrl);
    } else if (secForms.childElementCount == 0) {
        boxContent.innerHTML = tableHtml;
        secForms.innerHTML = formHtmlAlumno;
        loadScript(controllerUrl);
    }

}


function showMatreriaBoard() {
    const controllerUrl = "js/controllers/materiaController.js";
    titleContent.textContent = 'Materias';
    liProfesores.classList.remove('li-active');
    liAlumnos.classList.remove('li-active');
    this.classList.add('li-active');
    if (boxContent.childElementCount > 0) {
        secForms.innerHTML = '';
        // secForms.innerHTML = formMateria;
        boxScripts.innerHTML = '';
        boxContent.innerHTML = '';
        boxContent.innerHTML = tableMaterias;
        loadScript(controllerUrl);
    } else if (secForms.childElementCount == 0) {
        boxContent.innerHTML = tableMaterias;
            loadScript(controllerUrl);
    }
}

function showProfesoresBoard() {
    const controllerUrl = "js/controllers/profesoreController.js";
    liMaterias.classList.remove('li-active');
    liAlumnos.classList.remove('li-active')
    this.classList.add('li-active');
    titleContent.textContent = 'Profesores';
    if (secForms.childElementCount > 0) {
        secForms.innerHTML = '';
        boxContent.innerHTML = '';
        boxScripts.innerHTML = '';
        secForms.innerHTML = formHtmlProfesor;
        boxContent.innerHTML = tableHtml;
        loadScript(controllerUrl);
    } else if (secForms.childElementCount == 0) {
        boxContent.innerHTML = tableHtml;
        secForms.innerHTML = formHtmlProfesor;
        loadScript(controllerUrl);
    }

}


function loadScript(src) {
    let script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.defer = false;
    boxScripts.innerHTML = '';
    boxScripts.append(script);
}


function validateForm(inputs) {
    var flag = true;
    const boxError = document.getElementById('boxValidate');
    hideValidate();
    inputs.forEach(ipt => {
        if (ipt.value === '') {
            flag = false;
        }
        if (!flag) {
            boxError.classList.add('error');
            boxError.classList.remove('no-active')
        }
    })
    return flag;

}

function hideValidate() {
    const boxError = document.getElementById('boxValidate');
    boxError.classList.add('no-active');
    boxError.classList.remove('error')
}

init = function () {
    idxDB.setErrorPublisher(e => console.log(`Iniciando App : ${e.type}`));
    idxDB.open(appDBModel, e => console.log(`Iniciando App : ${e.type}`));
}



liMaterias.addEventListener('click', showMatreriaBoard);
liProfesores.addEventListener('click', showProfesoresBoard);
liAlumnos.addEventListener('click', showAlumnosBoard);

window.onload = init;



