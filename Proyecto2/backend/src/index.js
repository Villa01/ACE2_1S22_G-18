import express from 'express';
import SerialPort from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import { insertData, getLastItems } from './database.js';
import cors from 'cors'

const app = express();
app.use(cors());
// Puerto a exponer
const port = 5000;

/*/ Conexion con Arduino
const serialPort = 'COM5'; //Puerto COM de arduino
const baudage = 9600;

const mySerial = new SerialPort(serialPort, {
    baudRate: baudage,
    parity:'none',
    stopBits: 1,
    dataBits:8
});

// Manejo de error en la conexion
mySerial.on('error', function (err) {
    console.log(err);
});

mySerial.on('open', () => {
    console.log(`Puerto ${serialPort} abierto`)
})

const parser = mySerial.pipe(new ReadlineParser({ delimiter: '\n' }));
parser.on('data', data => {
    if (data) {
        const info = JSON.parse(data.toString());
        let insertedData = { ...info, time: new Date().toLocaleString() }
        insertData(insertedData);
    }
});*/


// mySerial.on('data',(data) => {
//     console.log(data.toString())
//     // console.log('data ', data)
// });


let sendData = {
    CH4: 0.0,
    temp: 0.0,
    time: '00/00/0000, 0:00:00 AM'
}

// Routes
app.get('/getCurrentData', (req, res) => {
    res.json(sendData);
});

// Obtener todos los registros
app.get('/getData', async (req, res) => {
    const data = await getLastItems();
    res.json(data);
});

app.listen(port, () => console.log('Servidor escuchando en puerto ', port));




