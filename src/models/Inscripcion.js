import { Schema, model } from 'mongoose';

const InscripcionSchema = Schema({


    proyecto_id: {
        type: Schema.Types.ObjectId,
        ref: 'Proyecto',
        required: true
    },
    
    usuario_id: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    estado: { type: String, default: "Pendiente"},
    fechaIngreso: { type: String },
    fechaEgreso: { type: String , default: "false"}


})
export default model("Inscripcion", InscripcionSchema);