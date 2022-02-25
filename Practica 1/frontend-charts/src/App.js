import './App.css';
import { Barras } from './components/barras';
import { Temperaturas } from './components/temperaturas';
import axios from "axios";
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  const GetLogs = async () => {
    await axios.get('http://localhost:5000/getData')
      .then((response) => {
          //console.log(response.data)
          if (JSON.stringify(data) !== JSON.stringify(response.data)){
            setData(response.data);
          }
      }); 
  }

  useEffect(()=>{
    GetLogs();
  },[data])
  
  return (
    <div className="App">
      <h2>Grafica Temperaturas </h2>
      <div className='padre'>
        <Temperaturas className="hijo" data = {data} />
      </div>
      <div className='padre'>
        <Barras className="hijo" data = {data} name= "humedad" color = "#30cbf2"/>
        <Barras className="hijo" data= {data} name= "lumin" color = "#f2de30" />
      </div>
      <div className='padre'>
        <Barras className="hijo" data = {data} name= "co2" color = "#ffffff" />
      </div>
    </div>
  );
}

export default App;
