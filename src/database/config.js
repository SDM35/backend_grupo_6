import mongoose from 'mongoose';

export const dbConnection = async () =>{
    try {
        await mongoose.connect(process.env.DB_CONNECTION);
        console.log("DB conectada");
        
    } catch (error) {
        console.log(error);
        
    }
};