
import { MongoClient } from "mongodb";

// Lo siguiente fue realizado con Atlas MongoDB, una base de datos en la nube
const url = "mongodb://DiiAns23:andres23@cluster0.pg03o.mongodb.net/practica1?retryWrites=true&w=majority";

// Se crea la conexion a Mongo
let mongoClient = new MongoClient(url);


const insertData = async (data) =>{
    try {
        if(!mongoClient){
            return
        }
        mongoClient.connect((err, db) => {
            if(err) console.error(err);
            if (!db) {
                return;
            }
            let dbo = db.db('practica1');
            dbo.collection('data').insertOne( data, (err, res) => {
                if(err) {
                    console.error(err);
                } else {
                    console.log(`Objecto ${res.insertedId} insertado.`);
                    db.close();
                }
            })
        })
    } catch (err){
        console.error(err)
        console.log('error en la bdd')
    }
}

const getLastDoc = async () => {
    await mongoClient.connect();
    const db = mongoClient.db('practica1')
    const data = db.collection('data')
    const array = await data.find({}).toArray()
    return array.at(-1);
}

export { insertData, getLastDoc };