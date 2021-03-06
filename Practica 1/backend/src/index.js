// Se deben de instalar todas estas librerias para su funcionamiento
import express from 'express';
import SerialPort from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import { insertData, getLastItems } from './database.js';
import cors from 'cors'



const app = express();
app.use(cors());
// Puerto a exponer
const port = 5000;

app.listen(port, () => console.log('Servidor escuchando en puerto ', port));

// Conexion con Arduino

const serialPort = 'COM5'; //Puerto COM de arduino
const baudage = 9600;


const mySerial = new SerialPort(serialPort, {
    baudRate: baudage
});

// Manejo de error en la conexion
mySerial.on('error', function (err) {
    console.log(err);
});

mySerial.open((err) => {
    const parser = mySerial.pipe(new ReadlineParser({ delimiter: '\r\n' }));
    parser.on('data', async data => {
        if (data) {
            try {
                const info = JSON.parse(data.toString());
                info['time'] = new Date().toLocaleString()
                console.log(info)
                currentData = info
                await insertData(info);

            } catch (err) {
                console.log('ERROR')
                console.error(err.message)
            }
        }
    });

});


let currentData = {
    temp1: 0.0,
    temp2: 0.0,
    lumin: 0.0,
    humedad: 0.0,
    co2: 0.0,
    time: '00/00/0000, 0:00:00 AM'
}

// Routes
app.get('/getCurrentData', (req, res) => {
    res.json(currentData);
});

app.get('/getData', async (req, res) => {
    const data = await getLastItems();
    res.json(data);
});

// Obtener todos los registros