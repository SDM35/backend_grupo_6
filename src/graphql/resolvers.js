import Usuario from "../models/Usuario";
import bcrypt from "bcrypt";
import { generarJwt } from "../helpers/jwt";
import Proyecto from "../models/Proyecto";
import Avance from "../models/Avance";

export const resolvers = {
  Query: {
    async login(_, { email, password }) {
      const usuario = await Usuario.findOne({
        email,
      });

      if (!usuario) {
        return "Usuario o contraseña incorrecta";
      }

      const validarPassword = bcrypt.compareSync(password, usuario.password);

      if (validarPassword) {
        const token = await generarJwt(usuario.id, usuario.nombre);
        return token;
      } else {
        return "Usuario o contraseña incorrecta";
      }
    },

    proyectos(_, args, context) {
      console.log(context);

      // En este if se pregunta si es true o false la autenticación del usuario, y obliga a usar
      // un JWT activo
      if (context.user.auth) {
        return Proyecto.find();
      } else {
        return null;
      }
    },
    //Historia de usuario 17
    async informacionProyectosLider(_, { idProyecto }, context) {
      // console.log(context);
      if (context.user.auth) {
        if (context.user.rol === "Lider") {
          let lProyectos = await Proyecto.findById(idProyecto).populate(
            "avances"
          );
          return lProyectos;
        } else {
          return "El usuario no tiene los permisos para ver esta información";
        }
      } else {
        return "El usuario no tiene los permisos para ver esta información";
      }
    },

    async informacionProyectoLider(_, { id }, context) {
      console.log(context);
      if (context.user.auth) {
        if (context.user.rol === "Lider") {
      return await Proyecto.findById(id).populate("avances");
        } else {
          return null;
        }
      } else {
        return null;
      }
    },

    //Historia usuario 23
    async listaAvances(_, { idProyecto }, context) {
      if (context.user.auth) {
        if (context.user.rol === "Estudiante") {
        return await Avance.find({proyecto_id:idProyecto})
        } else {
          return null;
        }
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
    //Historia de usuario 18
    async agregarObservacion(_, { idAvance, observacion }, context) {
      if (context.user.auth) {
        if (context.user.rol === "Profesor") {
          let { observaciones } = await Avance.findById(idAvance);

          let nObservacion = [...observaciones, observacion];
          return await Avance.findByIdAndUpdate(
            idAvance,
            { observaciones: nObservacion },
            { new: true }
          );
        }
      }
    },
    //Historia de usuario 22
    async agregarAvance(_, { idProyecto, avance }, context) {
      if (context.user.auth) {
        if (context.user.rol === "Estudiante") {
          let inAvance = {
            proyecto_id: idProyecto,
            usuario_id: context.user.id,
            fechaAvance: Date.now(),
            avanceEstudiante: avance,
          };
          let nuevoAvance = new Avance(inAvance);
          let { _id } = await nuevoAvance.save();
          console.log(_id);
          if (_id) {
            let { avances } = await Proyecto.findById(idProyecto);
            let nAvances = [...avances, _id];
            return await Proyecto.findByIdAndUpdate(
              idProyecto,
              { avances: nAvances },
              { new: true }
            ).populate("avances");
          }
        } else {
          return "No está autorizado para agregar avances";
        }
      } else {
        return "No está autorizado para agregar avances";
      }
    },
    //Historia usuario 23
    async actualizarAvance(_, { idAvance, avance }, context) {
      if (context.user.auth) {
        if (context.user.rol === "Estudiante") {
      let inAvance = {
        usuario_id: context.user.id,
        fechaAvance: Date.now(),
        avanceEstudiante: avance,
      };
      return await Avance.findByIdAndUpdate(idAvance, inAvance, { new: true });

        } else {
          return "No está autorizado para agregar avances";
        }
      } else {
        return "No está autorizado para agregar avances";
      }
    },
  },
};
