#include <dht.h>
dht DHT;
#define DHT11_PIN 7
#define LDR_PIN A0

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
}

void loop()
{
  Serial.println("---------------------------");
  DHT.read11(DHT11_PIN);
  
  //TEMPERATURA//
  Serial.print("Temperatura = ");
  Serial.print(DHT.temperature);
  Serial.println(" C");

  //HUMEDAD RELATIVA//
  Serial.print("Humedad = ");
  Serial.print(DHT.humidity);
  Serial.println(" %");

  // Luminocidad
  Serial.print("Luminocidad = ");
  double lux = calcular_int_lum(analogRead(LDR_PIN));
  Serial.println(lux);
  Serial.print(" lumenes/pie^2");
  delay(2000);
  
}
