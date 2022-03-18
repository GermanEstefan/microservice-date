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
const jsonBody = (res, unixDate, utcDate) => {
    return res.json({
        unix: unixDate,
        utc: utcDate
    });
};
expressApp.get('/api/', (req, res) => {
    return jsonBody(res, new Date().getTime(), new Date().toUTCString());
});
expressApp.get('/api/:date', (req, res) => {
    const { date } = req.params;
    if (!Number(date)) { //El parametro viene en formato de cadena
        if (!Date.parse(date)) { //Verificamos si el formato de cadena es VALIDO
            return res.json({
                error: 'Invalid Date'
            });
        }
        return jsonBody(res, Date.parse(date), new Date(date).toUTCString());
    }
    //El parametro viene en formato de entero
    return jsonBody(res, new Date(Number(date)).getTime(), new Date(Number(date)).toUTCString());
});
expressApp.listen(PORT, () => console.log('Server is running in the port ', PORT));
