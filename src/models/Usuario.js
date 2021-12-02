import { Schema, model } from 'mongoose';
const UsuarioSchema = Schema({

    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    cc: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: String, required: true },
    estado: { type: String, default: "Pendiente"}

})
export default model("Usuario", UsuarioSchema);