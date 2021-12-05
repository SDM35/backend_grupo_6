import Usuario from "../models/Usuario";
import bcrypt from 'bcrypt';
import { generarJwt } from "../helpers/jwt";
import Proyecto from "../models/Proyecto";
import Inscripcion from "../models/Inscripcion";


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
       
       async Usuarios(_,{rol}){
            if(rol === "Administrador"){
                return await  Usuario.find()
            }
            else{
                return null
            }
            
        },

        Estudiantes(){
            return Usuario.find({rol : "Estudiante"})
            
        },
        
        async Incripciones(_,{usuario_id}){
            if(usuario_id === "Lider"){
                return await  Inscripcion.find()
            }
            else{
                return null
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
            const proyecto = new Proyecto(input);
            return await proyecto.save();
        },

       async actualizarUsuario(parent,args){

           const salt = bcrypt.genSaltSync();
           let user = await Usuario.findById(args.id)
           return await Usuario.findByIdAndUpdate(args.id,{
               nombre : args.nombre,
               email: args.email,
               cc: args.cc,
               rol: args.rol,
               password: args.password = bcrypt.hashSync(args.password, salt)
           }, {new:true})
       },

       async actualizarEstadoUser(parent,args){
           const user = await Usuario.findById(args.id)
           if(args.rol === "Admistrador"){
               return await Usuario.findByIdAndUpdate(args.id,{
                   estado: args.estado
               },{new:true})
           }else{
               return null
           }
       },
       async actualizarEstadoEstudiante(parent,args){
           const estudiante = await Usuario.findById(args.id)
           if(args.rol=="Lider"){
               if(estudiante.rol === "Estudiante"){
                return await Usuario.findByIdAndUpdate(args.id,{
                    estado: args.estado

               },{new:true})
               
               }
           }
           else{
               return null
           }
       },
       
       async agregarInscripcion(_, { input }) {

        const inscripcion = new Inscripcion(input);

        return await inscripcion.save();
    },

    async actualizarEstadoInscripcion(parent,args){
        const inscripcion = await Inscripcion.findById(args.id)
        if(args.usuario_id=="Lider"){
            if(inscripcion.usuario_id === "Lider"){
             return await Inscripcion.findByIdAndUpdate(args.id,{
                 estado: args.estado

            },{new:true})
            
            }
        }
        else{
            return null
        }
    },


        
        
       
        
    }
};