const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const cursoSchema = new Schema({
	nombre : {
		type : String,
		required : true,
		trim : true
	},
	idCurso :{
		type : Number,
		required : true
	},
	descripcion : {
		type: String,
		required: true,
		default: 0			
	},
	valor : {
		type: Number,
		required: true,
		default: 0			
	},
	modalidad : {
		type: String,
    },
    intensidad: {
        type: Number,
    },
    estado: {
        type: String,
        default: 'disponible'
    }
});

cursoSchema.plugin(uniqueValidator);

const Curso = mongoose.model('Curso', cursoSchema);

module.exports = Curso