import './App.css';
import { ChartLine } from './components/chartLine';
import axios from "axios";
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  const GetLogs = async () => {
    await axios.get('http://localhost:5000/getData')
      .then((response) => {
          console.log(response.data)
          setData(response.data);
          // if (JSON.stringify(data) !== JSON.stringify(response.data)){
          // }
      }); 
  }

  useEffect(()=>{
    GetLogs();
  },[data])
  
  return (
    <div className="App">
      <br/>
      <br/>
      <br/>
      <br/>
      
      <h2>Grafico de Temperatura </h2>
      <div className='padre'>
        <ChartLine className="hijo" data = {data} xAxis = "time" yAxis = "temp" />
      </div>

      <br/>
      <h2>Grafico de Metano </h2>
      <div className='padre'>
        <ChartLine className="hijo" data = {data} xAxis = "time" yAxis = "CH4" />
      </div>
      
    </div>
  );
}

export default App;
