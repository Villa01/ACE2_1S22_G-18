// Se deben de instalar todas estas librerias para su funcionamiento
import express from "express";
import SerialPort from "serialport";
import Readline from "@serialport/parser-readline";
import { MongoClient } from "mongodb";

const app = express()
// Puerto a exponer
const port = 3000
// Lo siguiente fue realizado con Atlas MongoDB, una base de datos en la nube
const url = "mongodb+srv://DiiAns23:andres23@cluster0.pg03o.mongodb.net/practica1?retryWrites=true&w=majority"


app.listen(port, ()=> console.log("Escuchando en el puerto: ", port))

// Se crea la conexion a Mongo
const mongoClient = new MongoClient(url)

// Se solicitan los datos de Mongo enviando los parametros necesarios
app.get('/', async(req, res)=>{
    await mongoClient.connect();
    const db = mongoClient.db('practica1')
    const data = db.collection('data')
    const array = await data.find({}).toArray()
    res.json(array.at(-1))  // Devuelve el ultimo elemento ingresado en la tabla
})

// Conexion con Arduino

const com = "COM" //Puerto COM de arduino
const baud = 9600

const port_ardu = new SerialPort(com, {baudRate: baud})

const parse_ardu = port_ardu.pipe(new Readline({delimiter:"\n"}))

port_ardu.on("open", () => {
    console.log("Puerto serial de arduino creado exitosamente")
})

parse_ardu.on("data", (data) =>{
    if (data != undefined){
        try{
            const obj = JSON.parse(data);
            if (obj != undefined){
                insertData(data)
            }
        }
        catch (err){
            console.log("Error, no se puede realizar esta operacion")
        }
    }
})

const insertData = async (data) =>{
    await mongoClient.connect();
    const database = mongoClient.db('practica1')
    const object = JSON.parse(data)
    database.collection("data").insertOne(object, (err, res)=>{
        if (err) throw err;
        db.close()
    })
}