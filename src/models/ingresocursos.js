const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const ingrescursoSchema = new Schema({
	nombre : {
		type : String,
		required : true,
		trim : true
	},
	curso :{
		type : String,
		required : true
	},
	documento : {
		type: Number,
		required: true,
		default: 0			
	},
	correo : {
		type: String,
		required: true,
		default: 0			
	},
	telefono : {
        type: Number,
        required: true,
        default: 0
    }
});

ingrescursoSchema.plugin(uniqueValidator);

const IngresoCurso = mongoose.model('IngresoCursos', ingrescursoSchema);

module.exports = IngresoCurso