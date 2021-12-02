import {Schema, model} from "mongoose";
const UsuarioSchema = Schema({
    nombre : {type :  String, required : true},
    apellido : {type :  String, required : true},
    fecha_nacimiento : {type :  String, required : true},
    edad : {type : Number, required : true},
    email : {type :  String, required : true},
    password : {type : String, required : true},
    rol : {type: String, required : true}, //ObjectID
})

export default model("Usuario", UsuarioSchema);