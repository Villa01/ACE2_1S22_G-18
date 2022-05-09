import './App.css';
import { ChartLine } from './components/chartLine';
import axios from "axios";
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [fecha, setFecha] = useState({
    date: "2022-05-30"
  });

  const GetLogs = async () => {
    await axios.get('http://localhost:5000/getData')
      .then((response) => {
          //console.log(response.data)
          setData(response.data);
      }); 
  }

  const onChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setFecha((v) => ({
        ...v,
        [name]: value
    }));
  }

  const onSubmit = async (event) =>{
    event.preventDefault();
    //console.log(fecha);
    await axios.post('http://localhost:5000/sendDate', fecha)
      .then((response)=>{
        //console.log("ok");
        setData(response.data);
    });
  }

  useEffect(()=>{
    GetLogs();
  },[data])
  
  return (
    <div className="App">
      <br/>
      <br/>

      <form action="index.html" onSubmit={onSubmit} >
        <p>
          Selecciona una fecha:  
          <input type="date" name="date" min="2000-01-1" max="2022-05-30"  value={fecha.date} onChange={onChange}/>
          <input type="submit" value="filtrar fecha "/>
        </p>
      </form>

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
