import express from 'express';
import { config } from 'dotenv';
config();

const expressApp = express();
const PORT = process.env.PORT;

expressApp.get('/api/:date', (req, res) => {

    const { date } = req.params;

    if(!Number(date)){ //El parametro viene en formato de cadena
        if(!Date.parse(date) ){ //Es un date de formato de cadena INVALIDO
            return res.json({
                error: 'Invalid Date'
            })
        }
        return res.json({ //Es un formato de cadena valido
            unix: Date.parse(date),
            utc: new Date(date).toUTCString()
        })
    }else {
        //El parametro viene en formato de entero
        return res.json({
            unix: new Date(Number(date)).getTime(),
            utc: new Date(Number(date)).toUTCString()
        })
    }


});

expressApp.listen(PORT, () => console.log('Server is running in the port ', PORT))