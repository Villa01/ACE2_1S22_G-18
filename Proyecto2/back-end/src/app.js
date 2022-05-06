import express from "express"
import cors from "cors"
import morgan from "morgan"
import SerialPort from "serialport"
import { ReadlineParser } from '@serialport/parser-readline';

const serialPort = 'COM4'; //Puerto COM de arduino
const baudage = 9600;

const mySerial = new SerialPort(serialPort, {
    baudRate: baudage
});

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

//enpoints
app.get('/', async (req, res) => {
    res.json({msj: 'hola maes'});   
});
 

app.listen(app.get('port'), () => {
    console.log('Servidor en el puerto', app.get('port'));
});