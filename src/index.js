const express = require("express");
const {graphqlHTTP} = require("express-graphql");
import schema from "./graphql/schemas";
import {dbConnection} from "./database/config.js";
import { validarJwt } from "./middleware/validar-jwt";
import { assertValidExecutionArguments } from "graphql/execution/execute";
const app = express();

dbConnection();

app.get("/" , (req,res)=>{
    res.json({
        ok : true,
        msg : "Funcionando"

    })

});

app.use(validarJwt);

app.use("/graphql", graphqlHTTP((req)=> ({
    graphiql : true,
    schema : schema,
    context : {
        user : req.user
    }

})));

app.listen(process.env.PORT || 4000, () =>{
    console.log(`servidor arriba en puerto ${process.env.PORT || 4000}` );
})

