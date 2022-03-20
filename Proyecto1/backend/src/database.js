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
            let dbo = db.db('Proyecto1');
            dbo.collection('Data').insertOne( data, (err, res) => {
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
        console.log('Error en la base de datos')
    }
}

const getLastItems = async () => {
    await mongoClient.connect();
    const db = mongoClient.db('Proyecto1');
    const data = db.collection('Data');
    const array = await data.find({}).toArray();
    return array.slice(-20);
}

export { insertData, getLastItems };