// Se deben de instalar todas estas librerias para su funcionamiento
import express from 'express';
import SerialPort from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import { insertData } from './database.js';



const app = express();
// Puerto a exponer
const port = 3000;

app.listen(port, ()=> console.log('Servidor escuchando en puerto ', port));

// Conexion con Arduino

const serialPort = 'COM5'; //Puerto COM de arduino
const baudage = 9600;


const mySerial = new SerialPort(serialPort, {
    baudRate: baudage
});

mySerial.open( () => {
    console.log('Puerto serial abierto');
});

const parser = mySerial.pipe(new ReadlineParser({ delimiter: '\r\n' }));


parser.on('data', async data => {
    if(data){
        try {
            const info = JSON.parse(data.toString());
            info['time'] = new Date().toLocaleString()
            console.log(info)
            await insertData(info);
            
        } catch( err ){
            console.log('ERROR')
            console.error( err.message )
        }
    }
});
