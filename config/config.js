const moongose = require ('mongoose');
require("dotenv").config();
const {MONGO_URI, MONGO_URI_TEST, SELECT_DB} = process.env


const dbConnection = async()=>{
    try {
        if(SELECT_DB === 'TRUE') {
            await moongose.connect(MONGO_URI_TEST);
            console.log('Base de datos de test conectada con éxito')
        } else {
            await moongose.connect(MONGO_URI);
            console.log('Base de datos conectada con éxito')
        }
    } catch (error) {
        console.error(error);
        throw new Error("Error a la hora de iniciar la base de datos");
    }
};

module.exports = {
    dbConnection,   
};