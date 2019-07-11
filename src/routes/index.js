const express = require('express')
const app = express ()
const path = require('path')
const hbs = require ('hbs')
const Estudiante = require('./../models/estudiante')
const Curso = require('./../models/cursos')
const IngresoCurso = require('./../models/ingresocursos')
const dirViews = path.join(__dirname, '../../template/views')
const dirPartials = path.join(__dirname, '../../template/partials')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('./../helpers/helpers')

//hbs
app.set('view engine', 'hbs')
app.set('views', dirViews)
hbs.registerPartials(dirPartials)

////////////////// Ingreso de usuarios///////////////////////
app.get('/', (req, res ) => {
	res.render('index', {
		titulo: 'Inicio',
	})	
});

app.post('/', (req, res ) => {

	let estudiante = new Estudiante ({
		nombre : req.body.nombre,
		documento : req.body.documento,
		correo : req.body.correo,
		telefono : 	req.body.telefono,
		rol : req.body.rol,
		password : bcrypt.hashSync(req.body.password, 10)
		
	})
	
	Estudiante.findOne({documento: req.body.documento},(err,respuesta)=>{
		if(err){
			return console.log(err)
		}

		if(!respuesta){
		estudiante.save((err, resultado) => {
		if (err){
			return res.render ('indexpost', {
				mostrar : err
			})			
		}		
		res.render ('indexpost', {			
				mostrar : resultado.nombre
			})		
	})
	}else{
		res.render ('indexpost', {			
			mostrar : 'Usuario existente'
		})		
	}

	})
});

///////////////////Ingreso de Cursos//////////////////////////////////////////
app.get('/cursos', (req, res ) => {
	res.render('cursos', {
		titulo: 'Inicio',
	})	
});

app.post('/cursos', (req, res ) => {

	let curso = new Curso ({
		nombre : req.body.nombre,
		idCurso : req.body.idcurso,
		descripcion : req.body.descripcion,
		valor : req.body.valor,
		modalidad : req.body.modalidad,
		intensidad : req.body.intensidad,
		modalidad : req.body.modalidad
	})
	
	Curso.findOne({idCurso: req.body.idcurso},(err,respuesta)=>{
		if(err){
			return console.log(err)
		}

		if(!respuesta){
			curso.save((err, resultado) => {
		if (err){
			return res.render ('indexpost', {
				mostrar : err
			})			
		}		
		res.render ('indexpost', {			
				mostrar : 'Curso Ingresado exitosamente'
			})		
	})
	}else{
		res.render ('indexpost', {			
			mostrar : 'Curso Existente'
		})		
	}

	})
});

///////////////////Inscripción personas a Cursos//////////////////////////////////////////
app.get('/ingresocurso', (req, res ) => {
	Curso.find({},(err,respuesta)=>{
		if (err){
			return console.log(err)
		}

		res.render ('ingresocurso',{
			listado : respuesta
		})
	})
});

app.post('/ingresocurso', (req, res ) => {

	let ingrescurso = new IngresoCurso ({
		nombre : req.body.nombre,
		curso : req.body.curso,
		documento : req.body.documento,
		correo : req.body.correo,
		telefono : req.body.telefono
	})
	
	IngresoCurso.findOne({curso: req.body.curso, documento: req.body.documento},(err,respuesta)=>{
		if(err){
			return console.log(err)
		}

		if(!respuesta){
			ingrescurso.save((err, resultado) => {
		if (err){
			return res.render ('indexpost', {
				mostrar : err
			})			
		}		
		res.render ('indexpost', {			
				mostrar : 'Curso ingresado exitosamente'
			})		
	})
	}else{
		res.render ('indexpost', {			
			mostrar : 'Ya se encuentra inscrito en el curso'
		})		
	}

	})
});

app.get('/vercursos', (req,res) => {

	Curso.find({},(err,respuesta)=>{
		if (err){
			return console.log(err)
		}

		res.render ('vercursos',{
			listado : respuesta
		})
	})
})

app.post('/vercursos', (req, res) => {
	
	Curso.findOneAndUpdate({idcurso : req.body.idCurso}, req.body, {new : true, runValidators: true, context: 'query' }, (err, resultados) => {
		if (err){
			return console.log(err)
		}
		Curso.find({},(err,respuesta)=>{
			if (err){
				return console.log(err)
			}

			res.render ('vercursos', {
				estado : 'cerrado',
				listado: respuesta
			})
		})
	})	
})

////////////////////////////INSCRITOS A CURSOSO /////////////////
app.get('/inscritos', (req, res ) => {
	IngresoCurso.find({},(err,respuesta)=>{
		if (err){
			return console.log(err)
		}

		res.render ('inscritos',{
			listado : respuesta
		})
	})	
});


app.get('/actualizar', (req, res) => {	

		Estudiante.findById(req.session.usuario, (err, usuario) =>{
			//Usar con WebToken
			//Estudiante.findById(req.usuario, (err, usuario) =>{
			if (err){
				return console.log(err)
			}

			if (!usuario){
			return res.redirect('/')
		}
			res.render ('actualizar',{
				nombre : usuario.nombre,
				documento : req.body.documento,
				correo : req.body.correo,
				telefono : 	req.body.telefono,
				rol : req.body.rol
			})
		});
	})	

app.post('/actualizar', (req, res) => {
	
	Estudiante.findOneAndUpdate({nombre : req.body.nombre}, req.body, {new : true, runValidators: true, context: 'query' }, (err, resultados) => {
		if (err){
			return console.log(err)
		}

		res.render ('actualizar', {
			nombre : resultados.nombre,
			documento : req.body.documento,
			correo : req.body.correo,
			telefono : 	req.body.telefono,
			rol : req.body.rol
		})
	})	
})

app.post('/eliminar', (req, res) => {
	
	Curso.findOneAndDelete({idCurso : req.body.idcurso}, req.body, (err, resultados) => {
		if (err){
			return console.log(err)
		}

		if(!resultados){
			res.render ('eliminar', {
			nombre : "no encontrado"			
		})

		}

		res.render ('eliminar', {
			nombre : resultados.nombre			
		})
	})	
})


app.post('/ingresar', (req, res) => {	
	Estudiante.findOne({nombre : req.body.usuario}, (err, resultados) => {
		if (err){
			return console.log(err)
		}
		if(!resultados){
			return res.render ('ingresar', {
			mensaje : "Usuario no encontrado"			
			})
		}
		if(!bcrypt.compareSync(req.body.password, resultados.password)){
			return res.render ('ingresar', {
			mensaje : "Contraseña no es correcta"			
			})
		}	
			//Para crear las variables de sesión
			req.session.usuario = resultados._id	
			req.session.nombre = resultados.nombre
			req.session.rol = resultados.rol
			rol = resultados.rol
		if(req.session.rol == 'aspirante'){
			return res.render('ingresar', {
				mensaje : "Bienvenido " + resultados.nombre,
				nombre : resultados.nombre,
				sesionaspirante : true,						
				 })
		}else{
			// let token = jwt.sign({
   //          	usuario: resultados
   //      	}, 'virtual-tdea', { expiresIn: '12h' });
			// console.log(token)

			// localStorage.setItem('token', token);
			
			res.render('ingresar', {
				mensaje : "Bienvenido " + resultados.nombre,
				nombre : resultados.nombre,
				sesioncoordinador : true						
				 })
		}

			
	})	
})

app.get('/salir', (req, res) => {
	req.session.destroy((err) => {
  		if (err) return console.log(err) 	
	})	
	// localStorage.setItem('token', '');
	res.redirect('/')	
})

app.get('*',(req,res)=> {
	res.render('error', {
		titulo: "Error 404",		
	})
});

module.exports = app