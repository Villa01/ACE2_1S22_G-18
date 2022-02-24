//variables para el json
float nuevoTemp1;
float nuevoTemp2;
float nuevoLumin;
float nuevoHumedad;
float nuevoCo2;
String nuevoTime;
//objeto json a utilizar
JSONObject json;

void obtenerJSON(){
   String [] local = loadStrings("http://localhost:5000/getCurrentData"); //En el puerto 5000 mediante el endpoint getCurrentData obtenemos el ultimo valor guardado en la db
   json = parseJSONObject(local[0]); //Objeto json
   nuevoTemp1 = json.getFloat("temp1"); //Sensor de temperatura 1
   nuevoTemp2 = json.getFloat("temp2"); //Sensor de temperatura 2
   nuevoLumin = json.getFloat("lumin"); //Sensor de luz
   nuevoHumedad = json.getFloat("humedad"); //Sensor de humedad en la tierra
   nuevoCo2 = json.getFloat("co2"); //Sensor de co2
   nuevoTime = json.getString("time");
   println(nuevoTemp1, nuevoTemp2, nuevoLumin, nuevoHumedad, nuevoCo2, nuevoTime); //Ver que funciona todo
}

void setup(){
  size(600,600); //600*600 pixeles
  background(255);
  frameRate(60); //frames a 60
  obtenerJSON(); //Aca invocamos a obtenerJSON de modo que obtenemos el ultimo valor guardado en la db de mongo, si se quiere ver el cambio volver a correr la app
}

void draw(){
   background(255);
}
