import processing.serial.*;

Serial mySerial;
String mensaje = null;
int nl = 10;
float myVal;
int temp1;
int temp2;
int lumin;
int humedad;
int co2;
String time;
JSONObject json;

void obtenerJSON(){
   String[] local = loadStrings("http://localhost:3000/getCurrentData"); //En el puerto 3000 mediante el endpoint getCurrentData mandamos los datos recogidos en el arduino en formato json
   json = parseJSONObject(local[0]);
   temp1 = json.getInt("temp1"); //Primer sensor de temperatura
   temp2 = json.getInt("temp2"); //Segundo sensor de temperatura
   lumin = json.getInt("lumin"); //Sensor de luz
   humedad = json.getInt("humedad"); //Sensor de humedad en la tierra
   co2 = json.getInt("co2"); //Sensor de co2
   println(temp1, temp2, lumin, humedad, co2);
}

void setup(){
  size(300,400);
}

void draw(){
   obtenerJSON();
}
