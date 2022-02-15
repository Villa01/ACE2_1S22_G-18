import processing.serial.*;

Serial mySerial;
String mensaje = null;
int nl = 10;
float myVal;

void setup(){
  size(300,400);
  String myPort = Serial.list()[2]; // Obtener el puerto al que se conecta arduino
  
  mySerial = new Serial(this, myPort, 9600);
  
}

void draw(){
   while( mySerial.available() > 0){
     mensaje = mySerial.readStringUntil(nl);
     if (mensaje != null){
       println(mensaje);
     }
   }
}
