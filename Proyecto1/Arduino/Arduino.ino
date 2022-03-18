#include <ArduinoJson.h>

#define TIERA_HUMEDAD A3
#define echo A15
//const int echo = 50;
#define trig A14
//const int trig = 52;
const int s0 = 13;
const int s1 = 12;
const int s2 = 10;
const int s3 = 11;
const int out = 9;

const int s20 = 7;
const int s21 = 6;
const int s22 = 5;
const int s23 = 4;
const int out2 = 3;

const float sonido = 34000.0;
float distancia; 
const float alturaRecipiente = 17.5;

void setup(){
  
  Serial.begin(9600);
  pinMode(TIERA_HUMEDAD,INPUT);
  pinMode(echo, INPUT);
  pinMode(trig, OUTPUT);
  pinMode(s0,OUTPUT);
  pinMode(s1,OUTPUT);
  pinMode(s2,OUTPUT);
  pinMode(s3,OUTPUT);
  pinMode(out,INPUT);
  
  pinMode(s20,OUTPUT);
  pinMode(s21,OUTPUT);
  pinMode(s22,OUTPUT);
  pinMode(s23,OUTPUT);
  pinMode(out2,INPUT);

  digitalWrite(s0, HIGH);
  digitalWrite(s1, HIGH);
  digitalWrite(s20, HIGH);
  digitalWrite(s21, HIGH);
}

void loop()
{

  // Profundidad
  setupTrigger();
  unsigned long tiempo = pulseIn(echo, HIGH);
  distancia = tiempo * 0.000001 * sonido / 2.0;


  
  // Humedad en la tierra //
  float humedad = analogRead(TIERA_HUMEDAD);
  float porcentajeHum = map(humedad, 0, 1023, 100, 0);

  // Sensor Color 1
  int red = getRed(s2, s3);
  delay(200);
  int green = getGreen(s2, s3);
  delay(200);
  int blue = getBlue(s2, s3);
  delay(200);

   // Sensor Color 2
  int red2 = getRed(s22, s23);
  delay(200);
  int green2 = getGreen(s22, s23);
  delay(200);
  int blue2 = getBlue(s22, s23);
  delay(200);
  
  DynamicJsonDocument doc(1024);
  doc["humedad"] = porcentajeHum;
  doc["red1"] = red;
  doc["green1"] = green;
  doc["blue1"] = blue;
  doc["red2"] = red2;
  doc["green2"] = green2;
  doc["blue2"] = blue2;
  doc["depth"] = alturaRecipiente - distancia;
  serializeJson(doc, Serial);
  Serial.println();
  delay(3000);
}

int getRed(int s2, int s3){
  digitalWrite(s2, LOW);
  digitalWrite(s3, LOW);
  int red = pulseIn(out, LOW);
  return red;
}

int getBlue(int s2, int s3){
  digitalWrite(s2, LOW);
  digitalWrite(s3, HIGH);
  int blue = pulseIn(out, LOW);
  return blue;
}

int getGreen(int s2, int s3){
  digitalWrite(s2, HIGH);
  digitalWrite(s3, HIGH);
  int green = pulseIn(out, LOW);
  return green;
}

void setupTrigger()
{
  digitalWrite(trig, LOW);
  delayMicroseconds(2);
  
  digitalWrite(trig, HIGH);
  delayMicroseconds(10);
  
  digitalWrite(trig, LOW);
}
