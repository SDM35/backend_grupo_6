import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./resolvers";

const typeDefs = `
    type Query {
        Usuarios : [Usuario]
        Loguin(email:String!, password: String!) : String
    }

    type Mutation {
        AgregarUsuario(usuario: UsuarioInput) : Usuario
    }
   
    type Usuario {
        id: ID,
        nombre: String,
        apellido: String,
        fecha_nacimiento: String,
        edad: Int,
        email: String,
        password: String,
        rol: String,


    }

    input UsuarioInput {
        id: ID,
        nombre: String,
        apellido: String,
        fecha_nacimiento: String,
        edad: Int,
        email: String,
        password: String,
        rol: String,


    }
`;
export default makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers:resolvers
})