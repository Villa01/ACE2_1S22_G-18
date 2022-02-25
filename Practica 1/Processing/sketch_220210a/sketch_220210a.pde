import processing.serial.*;

SistemaParticulas sistemaParticulas;

float nuevoTemp1;
float nuevoTemp2;
float nuevoLumin;
float nuevoHumedad;
float nuevoCo2;
String nuevoTime;
//objeto json a utilizar
JSONObject json;


int lastSeconds = 0;
int tiempoConsulta = 0;

int Y_AXIS = 1;
int X_AXIS = 2;

//float temperatura = 0;
//float velocidad = 0;
//float humedad = 0;

color verde12 = color(16, 243, 50);


int unit ;
int count;
Module[] mods;


 color rojo3 = color(255,26,26);
 color rojo2 = color(255,105,26);
 color rojo1 = color(255,197,26);
 color amarillo3 = color(255, 231 ,26);
 color amarillo2 = color(200,231,26);
 color amarillo1 = color(165,231,26);
 color verde3 = color(100,231,26);
 color verde2 = color(60,231,26);
 color verde1 = color(26,231,26);
 color azul1 = color(26,26,255);
 color azul2 = color(26,100,255);

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
  size(1280,720); //600*600 pixeles
  
  
  sistemaParticulas = new SistemaParticulas(new PVector(width/4, height/4));
  
  
  frameRate(60); //frames a 60
  obtenerJSON(); //Aca invocamos a obtenerJSON de modo que obtenemos el ultimo valor guardado en la db de mongo, si se quiere ver el cambio volver a correr la app
  
  luminosity1();
  
}

void draw(){
  background(0);
   
  int currentSeconds = second();
  boolean consultar = false;
  
  if(currentSeconds != lastSeconds) {
    tiempoConsulta = tiempoConsulta + 1;
    if(tiempoConsulta == 5) {
      println("5segundos");
      tiempoConsulta = 0;
      consultar = true;
    }
  }
  
  lastSeconds = currentSeconds;

  
  if(consultar) {
   obtenerJSON();
  }
  
  
  
  fill(255, 255);
  Co2();
  luminosity();
  humedad();

}

void Co2(){
  text("Co2: " + nuevoCo2 + " ", 10, 20);
  text("Temperatura afuera: " + nuevoTemp1 + " °C", 10, 50);
  
  
  
  float velocidadAnimacion =  nuevoCo2;
  
  if(nuevoCo2 >= 100){
    velocidadAnimacion = 0.5;
  } else if(nuevoCo2 >= 50) {
    velocidadAnimacion = 0.4;
  } else if (nuevoCo2 >= 40) {
    velocidadAnimacion = 0.3;
  } else if (nuevoCo2 >= 30) {
    velocidadAnimacion = 0.1;
  } else if (nuevoCo2 >= 20) {
    velocidadAnimacion = 0.05;
  } else if (nuevoCo2 >= 10) {
    velocidadAnimacion = 0.03;
  } else if (nuevoCo2 >= 1) {
    velocidadAnimacion = 0.01;
  } else if (nuevoCo2 >= 0) {
    velocidadAnimacion = 0;
  }
  
  
  //fill(verde12, 255);
  sistemaParticulas.agregarParticula(nuevoTemp1, velocidadAnimacion,(int)(nuevoCo2/10));
  
  sistemaParticulas.run(); 
}

void luminosity1(){
  //noStroke();
  unit = (int)(100-nuevoLumin);
  int wideCount = ((width*1/2)) / unit;
  int highCount = ((height*2/5)) / unit;
  count = wideCount * highCount;
  mods = new Module[count];

  int index = 0;
  for (int y = 0; y < highCount; y++) {
    for (int x = 0; x < wideCount; x++) {
      mods[index++] = new Module(x*unit+600, y*unit+60, unit/2, unit/2, random(0.05, 0.8), unit);
    }
  }
  
}


void luminosity(){
  fill(255, 255);
  text("Luminosidad: " + nuevoLumin + " %", 600, 20);
  text("Temperatura adentro: " + nuevoTemp2 + " °C", 600, 50);
  
  for (Module mod : mods) {
    mod.update();    
    mod.display(nuevoTemp2);
  }
  
}


void humedad(){
  fill(255, 255);
  text("Humedad: " + nuevoHumedad + " %", 20, 400);
  
  //setGradient(50, 90, 540, 80, verde1, verde2, Y_AXIS);
  
  setGradient(60, 500, nuevoHumedad*10, 100, azul1, azul2, X_AXIS);
  
  
  
  
}

void setGradient(int x, int y, float w, float h, color c1, color c2, int axis ) {

  noFill();

  if (axis == Y_AXIS) {  // Top to bottom gradient
    for (int i = y; i <= y+h; i++) {
      float inter = map(i, y, y+h, 0, 1);
      color c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }  
  else if (axis == X_AXIS) {  // Left to right gradient
    for (int i = x; i <= x+w; i++) {
      float inter = map(i, x, x+w, 0, 1);
      color c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y+h);
    }
  }

}
