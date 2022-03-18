#include <ArduinoJson.h>

#define TIERA_HUMEDAD A3
#define s0 13
#define s1 12
#define s2 10
#define s3 11
#define out 9

void setup(){
  
  Serial.begin(9600);
  pinMode(TIERA_HUMEDAD,INPUT);
  pinMode(s0,OUTPUT);
  pinMode(s1,OUTPUT);
  pinMode(s2,OUTPUT);
  pinMode(s3,OUTPUT);
  pinMode(out,INPUT);

  digitalWrite(s0, HIGH);
  digitalWrite(s1, HIGH);
}

void loop()
{
  // Humedad en la tierra //
  float humedad = analogRead(TIERA_HUMEDAD);
  float porcentajeHum = map(humedad, 0, 1023, 100, 0);

  int red = getRed();
  delay(200);
  int green = getGreen();
  delay(200);
  int blue = getBlue();
  delay(200);
  
  DynamicJsonDocument doc(1024);
  doc["humedad"] = porcentajeHum;
  doc["red"] = red;
  doc["green"] = green;
  doc["blue"] = blue;
  serializeJson(doc, Serial);
  Serial.println();
  delay(3000);
}

int getRed(){
  digitalWrite(s2, LOW);
  digitalWrite(s3, LOW);
  int red = pulseIn(out, LOW);
  return red;
}

int getBlue(){
  digitalWrite(s2, LOW);
  digitalWrite(s3, HIGH);
  int blue = pulseIn(out, LOW);
  return blue;
}

int getGreen(){
  digitalWrite(s2, HIGH);
  digitalWrite(s3, HIGH);
  int green = pulseIn(out, LOW);
  return green;
}
