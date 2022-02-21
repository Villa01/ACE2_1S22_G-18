
// Se solicitan los datos de Mongo enviando los parametros necesarios
app.get('/', async(req, res)=>{
    await mongoClient.connect();
    const db = mongoClient.db('practica1')
    const data = db.collection('data')
    const array = await data.find({}).toArray()
    res.json(array.at(-1))  // Devuelve el ultimo elemento ingresado en la tabla
})
