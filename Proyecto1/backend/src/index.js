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
const arduinoReqTime = 3;//Tiempo en la que arduino enviara datos a la api
const alturaRecipienteArduino = 17.5;// altura del recimiente en donde ira el agua limpia

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
                sendData = {
                    ...currentData
                }

                sendData.pureza1 =((currentData.red1+currentData.green1+currentData.blue1)/(3*255))*100
                sendData.pureza2 = ((currentData.red2+currentData.green2+currentData.blue2)/(3*255))*100
                sendData.suciedad1 = 100-sendData.pureza1
                sendData.suciedad2 = 100-sendData.pureza2
                if (historial === 0.0){
                    sendData.velocidad = 0                    
                    sendData.tiempoLlenado = 0
                }else{
                    sendData.velocidad = (currentData.depth - historial)/arduinoReqTime
                    sendData.tiempoLlenado = alturaRecipienteArduino / sendData.velocidad
                }
                historial = currentData.depth
                
                
                await insertData(sendData);
                

            } catch (err) {
                console.log('ERROR')
                console.error(err.message)
            }
        }
    });

});

let historial = 0.0


let currentData = {
    humedad: 0.0,
    red1: 0.0,
    green1: 0.0,
    blue1: 0.0,
    red2: 0.0,
    green2: 0.0,
    blue2: 0.0,
    depth: 0.0,
    time: '00/00/0000, 0:00:00 AM'
}

let sendData = {
    suciedad1: 0.0,
    pureza1: 0.0,
    suciedad2: 0.0,
    pureza2: 0.0,
    humedad: 0.0,
    depth: 0.0,
    velocidad: 0.0,
    tiempoLlenado: 0.0,    
    time: '00/00/0000, 0:00:00 AM'
}

// Routes
app.get('/getCurrentData', (req, res) => {
    res.json(sendData);
});

app.get('/getData', async (req, res) => {
    const data = await getLastItems();
    res.json(data);
});

// Obtener todos los registros
