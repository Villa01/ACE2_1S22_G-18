#include <ArduinoJson.h>
#include <MQ135.h>
#include <dht.h>

dht DHT;
#define LDR_PIN A0
#define MQ135_PIN A1
#define DHT11_PIN2 A2
#define TIERA_HUMEDAD A3
#define DHT11_PIN A4

const double k = 5.0/1024; // relacion voltaje valor digital
const double R2 = 10000; //resistencia usada
const double B = 1.3*pow(10.0,7);
const double m = -1.4;

double calcular_int_lum (int datos) {  
    double V2 = k*datos;
    double R1 = (5.0/V2 - 1)*R2;
    double lux = B*pow(R1,m);
    return lux;
} 

void setup(){
  
  Serial.begin(9600);
  pinMode(LDR_PIN,INPUT);
  pinMode(MQ135_PIN,INPUT);
  pinMode(DHT11_PIN2,INPUT);
  pinMode(TIERA_HUMEDAD,INPUT);
  pinMode(DHT11_PIN,INPUT);
}

void loop()
{
  //TEMPERATURA//
  DHT.read11(DHT11_PIN);
  float temp1 = DHT.temperature;
  //TEMPERATURA 2//
  DHT.read11(DHT11_PIN2);
  float temp2 = DHT.temperature;
  //CO2 //
  MQ135 gasSensor = MQ135(A0);
  float ppm = gasSensor.getPPM();
  // Humedad en la tierra //
  float humedad = analogRead(TIERA_HUMEDAD);
  float porcentajeHum = map(humedad, 0, 1023, 100, 0);
  // Luminocidad //
  double lux = calcular_int_lum(analogRead(LDR_PIN));
  
  DynamicJsonDocument doc(1024);
  doc["temp1"] = temp1;
  doc["temp2"] = temp2;
  doc["lumin"] = lux;
  doc["humedad"] = porcentajeHum;
  doc["co2"] = ppm;
  serializeJson(doc, Serial);
  Serial.println();
  delay(2000);
}
