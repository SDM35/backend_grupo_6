import mongoose from 'mongoose';

export const dbConnection = async () =>{
    try {
        await mongoose.connect('');
        console.log("DB conectada");
        
    } catch (error) {
        console.log(error);
        
    }
};