"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const expressApp = (0, express_1.default)();
const PORT = process.env.PORT;
expressApp.get('/api/:date', (req, res) => {
    const { date } = req.params;
    if (!Number(date)) { //El parametro viene en formato de cadena
        if (!Date.parse(date)) { //Es un date de formato de cadena INVALIDO
            return res.json({
                error: 'Invalid Date'
            });
        }
        return res.json({
            unix: Date.parse(date),
            utc: new Date(date).toUTCString()
        });
    }
    else {
        //El parametro viene en formato de entero
        return res.json({
            unix: new Date(Number(date)).getTime(),
            utc: new Date(Number(date)).toUTCString()
        });
    }
});
expressApp.listen(PORT, () => console.log('Server is running in the port ', PORT));
