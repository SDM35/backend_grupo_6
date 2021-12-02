import {Usuarios} from "../data/usuarios";
import Usuario from "../models/Usuarios";
import bcryp from "bcrypt";
import { generarJwt } from "../helpers/jwt";

export const resolvers = {
    Query : {
        
        Usuarios (_, args,context){
            //console.log("Hola",Usuarios);
            console.log(context);
            if(context.user.auth){

                return Usuario.find(); 
            }
            else{
                return null;
            }
        },

       async Loguin(_, {email, password}){
            //return "Probando el Loguin";
            const usuario = await Usuario.findOne({
                email
            })
            //  console.log(usuario);
            //  console.log("arsg",email, password);
            if(!usuario){
                return "Email y/o contraseña incorrecto";
            }
            const validarPassword = bcryp.compareSync(password, usuario.password)

            if(validarPassword){
                const token = await generarJwt(usuario.id, usuario.nombre)
                return token;
            }
            else {
                return "Email y/o contraseña incorrecto";
            }
        }
    },

    Mutation:{
       async AgregarUsuario(_, {usuario}){
                // const nUsuario = new Usuario(
                //    {
                //   nombre : usuario.nombre,
                //   apellido : usuario.apellido,
                //   fecha_nacimiento : usuario.fecha_nacimiento,
                //   edad: usuario.edad,
                //   email: usuario.email,
                //   password: usuario.password,
                //   rol: usuario.rol
                // }
                // );
                const salt = bcryp.genSaltSync();
                let nUsuario = new Usuario(usuario);
                nUsuario.password=bcryp.hashSync(usuario.password,salt);
                return await nUsuario.save();
              }
        }
    };

