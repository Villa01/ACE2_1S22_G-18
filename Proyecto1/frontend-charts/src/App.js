import './App.css';
import { ChartLine } from './components/chartLine';
import axios from "axios";
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  const GetLogs = async () => {
    await axios.get('http://localhost:5000/getData')
      .then((response) => {
          // console.log(response.data)
          setData(response.data);
          // if (JSON.stringify(data) !== JSON.stringify(response.data)){
          // }
      }); 
  }

  useEffect(()=>{
    //GetLogs();
  },[/*data*/])
  
  return (
    <div className="App">
      <h2>Grafico de cantidad de suciedad al salir de las viviendas </h2>
      <div className='padre'>
        <ChartLine className="hijo" data = {data} xAxis = "time" yAxis = "suciedad1" />
      </div>

      <br/>
      <h2>Grafico de humedad </h2>
      <div className='padre'>
        <ChartLine className="hijo" data = {data} xAxis = "time" yAxis = "humedad" />
      </div>

      <br/>
      <h2>Grafico de cantidad de agua despues del filtrado </h2>
      <div className='padre'>
        <ChartLine className="hijo" data = {data} xAxis = "time" yAxis="depth" />
      </div>

      <br/>
      <h2>Grafico de cantidad de suciedad despues del filtrado </h2>
      <div className='padre'>
        <ChartLine className="hijo" data = {data} xAxis = "time" yAxis="suciedad2"/>
      </div>

      <h2>Tiempo requerido para la cantidad de agua : {data.tiempoLlenado} </h2>
      
    </div>
  );
}

export default App;
