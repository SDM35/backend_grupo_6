import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./resolvers";

const typeDefs = `

    type Query {
        login(email: String!, password: String!): String,
        proyectos: [Proyecto],
        informacionProyectosLider(idProyecto:ID!):[Proyecto]
        informacionProyectoLider(id: ID!): Proyecto,
        listaAvances(idProyecto:ID!):[Avance],
        
    }
    
    type Mutation {
        agregarUsuario(input: UsuarioInput): Usuario
        agregarProyecto(input: ProyectoInput): Proyecto
        agregarObservacion(idAvance: ID! , observacion: ObservacionInput!) : Avance
        agregarAvance(idProyecto:ID!, avance:String!): Proyecto,
        actualizarAvance(idAvance:ID!,avance:String!): Avance,
    }


    type Usuario {
        id: ID,
        nombre: String,
        email: String,
        cc: Int,
        password: String,
        rol: String,
        estado: String
    }
    type Observacion{
        observacion:String,
        fechaObservacion: String
     }
     
    type Avance {
         id: ID,
         proyecto_id: ID,
         usuario_id: ID,
         fechaAvance: String,
         avanceEstudiante: String,
         observaciones: [Observacion]   
    }

   
    type Proyecto {
        id: ID,
        nombre: String,
        objetivosG: [String],
        objetivosE: [String],
        presupuesto: Int,
        fechaInicio: String,
        fechaFin: String,
        lider: ID,
        estado: String,
        fase: String,
        avances: [Avance]

    }

    type AvanceEstudiante{
        avanceEstudiante: ID!
    }
 

    

    input UsuarioInput {
        nombre: String,
        email: String,
        cc: Int,
        password: String,
        rol: String
    }

    input ProyectoInput {
        nombre: String,
        objetivosG: [String],
        objetivosE: [String],
        presupuesto: Int,
        lider: ID
    }

   

    input ObservacionInput{
        observacion: String!,
        fechaObservacion: String

    }
   

 



`;

// Query en GraphQL SIN arreglo de lenguaje:

// {
// 	hola(Nombre: "Santiago"),
//   cursos{
//     nombre
//     id
//   }
// }

// Mutation en GraphQL
// mutation {
//     AgregarCurso(input:{
//       id: "5",
//       nombre: "Cruso de GraphQL",
//       lenguaje: "JavaScript",
//       fecha: "2021"
//     })
//     {
//       id
//       nombre
//     }
//   }

// Query en GraphQL CON arreglo de lenguajes:

// mutation {
//     agregarCurso(input:{
//       nombre: "Cruso de programación II",
//       lenguajes: [
//         {
//         lenguaje: "Java"
//       },
//         {
//           lenguaje: "Python"
//         },
//         {
//           lenguaje: "Go"
//         }
//       ]
//       fecha: "2021"
//     })
//     {
//       id
//       nombre
//       lenguajes{
//         lenguaje
//       }
//     }
//   }

// Query en GraphQL agregar usuario:

// mutation {
//     agregarUsuario(input:{
//       nombre: "Santiago D",
//       email: "santiago@email.com",
//       password: "123456"
//     })
//     {
//       id
//       nombre
//       email
//       password
//       }
//     }

export default makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
});
