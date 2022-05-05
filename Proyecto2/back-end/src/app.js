import express from "express"
import cors from "cors"
import morgan from "morgan"

//settings
const app = express();
app.set("port", 9000);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//enpoints
app.get('/', async (req, res) => {
    res.json({msj: 'hola maes'});   
});

app.listen(app.get('port'), () => {
    console.log('Servidor en el puerto', app.get('port'));
});