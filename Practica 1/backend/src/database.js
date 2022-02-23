
import { MongoClient, ServerApiVersion  } from 'mongodb';

// Lo siguiente fue realizado con Atlas MongoDB, una base de datos en la nube
const uri = "mongodb+srv://DiiAns23:andres23@cluster0.pg03o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// Se crea la conexion a Mongo
let mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const insertData = async (data) =>{
    try {
        if(!mongoClient){
            console.log('El cliente de mongo no existe')
            return
        }
        mongoClient.connect((err, db) => {
            if(err) {
                console.log('Error al conectar')
                console.error(err);
            }

            if (!db) {
                console.log('No se encontro la base de datos')
                return;
            }
            let dbo = db.db('practica1');
            dbo.collection('data').insertOne( data, (err, res) => {
                if(err) {
                    console.error(err);
                } else {
                    console.log(`Objecto ${res.insertedId} insertado.`);
                }
            })
        })
    } catch (err){
        db.close();
        console.error(err)
        console.log('error en la bdd')
    }
}

const getLastItems = async () => {
    await mongoClient.connect();
    const db = mongoClient.db('practica1');
    const data = db.collection('data');
    const array = await data.find({}).toArray();
    return array.slice(-20);
}

export { insertData, getLastItems };