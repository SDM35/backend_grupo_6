import mongoose from 'mongoose';

export const dbConnection = async () =>{
    try {
        await mongoose.connect('mongodb+srv://admi:admi1234@gestionproyectos.hw0ed.mongodb.net/graphql');
        console.log("DB conectada");
        
    } catch (error) {
        console.log(error);
        
    }
};