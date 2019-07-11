const hbs = require('hbs');

////////////// Cursos Coordinador //////////////////
hbs.registerHelper('listarcoordinador', (listado) => {
let texto = `	<form action="/vercursos" method="post">
		<table class='table table-striped table-hover'> 
				<thead class='thead-dark'>
				<th>Nombre</th>
				<th>Id Curso</th>
				<th>Descripción</th>
				<th>Valor</th>
				<th>Modalidad</th>
				<th>Intensidad Horaria</th>
				<th>Estado</th>
				<th></th>
				</thead>
				<tbody>`;
	listado.forEach(curso =>{
		texto = texto + 
				`<tr>
				<td> ${curso.nombre} </td>
				<td> ${curso.idCurso} </td>
				<td> ${curso.descripcion}</td>
				<td> ${curso.valor} </td>
				<td> ${curso.modalidad} </td>
				<td> ${curso.intensidad} </td>
				<td> ${curso.estado} </td>
				<td><button class="btn btn-danger" name="idcurso" value="${curso.idCurso}">Actualizar</button></td>
				
				</tr> `;
	})
	texto = texto + '</tbody> </table></form>';	
	return texto;
});

////Cursos coodinador detalle ////////////////////
hbs.registerHelper('listarcoordinadortedet', (listado) =>{
    let texto = "<div class='accordion' id='accordionExample'>";
    i = 1;
    listado.forEach(cursos => {
        texto = texto +
                `<div class="card">
                    <div class="card-header" id="heading${i}>
                        <h2 class="mb-0">
                            <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                                ${cursos.nombre}
                            </button><br>
                            valor: ${cursos.valor}
                        </h2>
                    </div>
                    
                        <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
                            <div class="card-body">
                                Nombre del Curso: ${cursos.nombre} <br>
                                Descrición del Curso: ${cursos.descripcion} <br>
                                Valor del Curso: ${cursos.valor} <br>
                                Modalidad del Curso: ${cursos.modalidad} <br>
                                Intensidad Horaria: ${cursos.intensidad} <br>
                                Estado del Curso: ${cursos.estado} <br>
                            </div>
                        </div>
                </div>`
				i = i + 1;
    })
    texto = texto + '</div>';
    return texto;
});

/////// cursos aspirante ///////////////////////
hbs.registerHelper('listaraspirante', (listado) => {
	let texto = `<table class='table table-striped table-hover'> 
					<thead class='thead-dark'>
					<th>Nombre</th>
					<th>Id Curso</th>
					<th>Descripción</th>
					<th>Valor</th>
					<th>Modalidad</th>
					<th>Intensidad Horaria</th>
					<th>Estado</th>
					<th></th>
					</thead>
					<tbody>`;
		listado.forEach(curso =>{
			if(curso.estado == 'disponible')
			{
			texto = texto + 
					`<tr>
					<td> ${curso.nombre} </td>
					<td> ${curso.idCurso} </td>
					<td> ${curso.descripcion}</td>
					<td> ${curso.valor} </td>
					<td> ${curso.modalidad} </td>
					<td> ${curso.intensidad} </td>
					<td> ${curso.estado} </td>
					</tr> `;
			}else{}
		})
		texto = texto + '</tbody> </table></form>';	
		return texto;
	
	});

////// cursos aspirante detalle //////////////
hbs.registerHelper('listaraspirantedet', (listado) =>{
    let texto = "<div class='accordion' id='accordionExample'>";
    i = 1;
    listado.forEach(cursos => {
		if( cursos.estado == 'disponible')
		{
        texto = texto +
                `<div class="card">
                    <div class="card-header" id="heading${i}>
                        <h2 class="mb-0">
                            <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                                ${cursos.nombre}
                            </button><br>
                            valor: ${cursos.valor}
                        </h2>
                    </div>
                    
                        <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
                            <div class="card-body">
                                Nombre del Curso: ${cursos.nombre} <br>
                                Descrición del Curso: ${cursos.descripcion} <br>
                                Valor del Curso: ${cursos.valor} <br>
                                Modalidad del Curso: ${cursos.modalidad} <br>
                                Intensidad Horaria: ${cursos.intensidad} <br>
                                Estado del Curso: ${cursos.estado} <br>
                            </div>
                        </div>
                </div>`
				i = i + 1;
			}else{
				i = i + 1;
			}
    })
    texto = texto + '</div>';
    return texto;
});

//// Combo para llenar los Cursos //////////////////
hbs.registerHelper('ddlcursos',(listado) =>{
    let texto = "<div class='col'> \
                <label>Seleccione Curso</label> \
                <select name='curso' class='form-control'>";
		listado.forEach(cursos => {
		if(cursos.estado == 'disponible'){
			texto = texto + 
        `<option value="${cursos.nombre}">${cursos.nombre}</option>'`; 
		} 
    })
    texto = texto + '</select></div>';
    return texto;
});

//////////// Cursos inscritos //////////////////////
hbs.registerHelper('listarcoordinadortedetinsc', (listado) =>{
    let texto = "<div class='accordion' id='accordionExample'>";
    i = 1;
    listado.forEach(cursos => {
        texto = texto +
                `<div class="card">
                    <div class="card-header" id="heading${i}>
                        <h2 class="mb-0">
                            <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                                ${cursos.curso}
                            </button><br>
                        </h2>
                    </div>
                    
                        <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
                            <div class="card-body">
                                Nombre: ${cursos.nombre} <br>
                                Documento: ${cursos.documento} <br>
                                Correo: ${cursos.correo} <br>
                                Teléfono: ${cursos.telefono} <br>
                            </div>
                        </div>
                </div>`
				i = i + 1;
    })
    texto = texto + '</div>';
    return texto;
});