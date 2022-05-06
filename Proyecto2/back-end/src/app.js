import express from "express"
import cors from "cors"
import morgan from "morgan"
import SerialPort from "serialport"
import {parsers}from "serialport"

const serialPort = 'COM4'; //Puerto COM de arduino
const baudage = 9600;

const mySerial = new SerialPort(serialPort, {
    baudRate: baudage
});

const Readline = parsers.Readline;
const parsrs = new Readline();
mySerial.pipe(parsrs);

//settings
const app = express();
app.set("port", 9000);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Manejo de error en la conexion
mySerial.on('error', function (err) {
    console.log(err);
});

mySerial.on('open', ()=>{
    console.log('Puerto abierto')
})

// Conexion con Arduino
mySerial.on('data', async data => {
    const info = JSON.parse(data.toString());
    info['time'] = new Date().toLocaleString()
    console.log(info)
});

//enpoints
app.get('/', async (req, res) => {
    res.json({msj: 'hola maes'});   
});
 

app.listen(app.get('port'), () => {
    console.log('Servidor en el puerto', app.get('port'));
});