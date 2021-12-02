import Usuario from "../models/Usuario";
import bcrypt from 'bcrypt';
import { generarJwt } from "../helpers/jwt";
import Proyecto from "../models/Proyecto";

export const resolvers = {

    Query: {
        async login (_, { email, password }) {

            const usuario = await Usuario.findOne({
                email
            });

            if (!usuario) {
                return "Usuario o contraseña incorrecta";
            }

            const validarPassword = bcrypt.compareSync(password, usuario.password);

            if (validarPassword) {
                const token = await generarJwt(usuario.id, usuario.nombre)
                return token;
            } else {
                return "Usuario o contraseña incorrecta";
            }
        },

        proyectos(_, args, context) {
            console.log(context);

            // En este if se pregunta si es true o false la autenticación del usuario, y obliga a usar 
            // un JWT activo
            if(context.user.auth){

                return Proyecto.find();

            } else {
                return null;
            }

        },

    },
    Mutation: {

        async agregarUsuario(_, { input }) {

            // No es necesario desestructurar ya que el objeto "input" ya viene armado con los 
            // atributos requeridos

            const salt = bcrypt.genSaltSync();

            // Se debe usar let en lugar const, debido a que el const no se puede reasignar
            let usuario = new Usuario(input);
            usuario.password = bcrypt.hashSync(usuario.password, salt);

            return await usuario.save();
        },

        async agregarProyecto(_, { input }) {

            // Cuando es un unico lenguaje:

            // const curso = new Curso({
            //     nombre: input.nombre,
            //     lenguaje: input.lenguaje,
            //     fecha: input.fecha,

            //     // profesorId : args.profesorId
            //   });

            // Cuando es un arreglo de lenguajes:

            const proyecto = new Proyecto(input);

            return await proyecto.save();

            // return input;
        },
    }
};