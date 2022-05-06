#include <ArduinoJson.h>
#include <SoftwareSerial.h>
#include <MQUnifiedsensor.h>
#include <dht.h>
dht DHT;

//SoftwareSerial BT(18, 19);


#define MQ4_PIN A1
#define DHTPIN 4
#define VALVPIN 13
#define CHISPAPIN 12
/************************Hardware Related Macros************************************/
#define Board ("Arduino MEGA")
#define Pin (MQ4_PIN) // Analog input 4 of your arduino
/***********************Software Related Macros************************************/
#define Type ("MQ-4") // MQ4
#define Voltage_Resolution (5)
#define ADC_Bit_Resolution (10) // For arduino UNO/MEGA/NANO
#define RatioMQ4CleanAir (4.4)  // RS / R0 = 60 ppm
/*****************************Globals***********************************************/
// Declare Sensor
MQUnifiedsensor MQ4(Board, Voltage_Resolution, ADC_Bit_Resolution, Pin, Type);

bool abiertovalv ;
bool abiertochispa;

void setup()
{

  //  pinMode(DHT11_PIN,INPUT);
  pinMode(MQ4_PIN, INPUT);
  pinMode(DHTPIN, INPUT);
  pinMode(VALVPIN, OUTPUT);

  Serial.begin(9600);

  MQ4.setRegressionMethod(1); //_PPM =  a*ratio^b
  MQ4.init();

//  Serial.print("Calibrating please wait.");
  float calcR0 = 0;
  for (int i = 1; i <= 10; i++)
  {
    MQ4.update(); // Update data, the arduino will read the voltage from the analog pin
    calcR0 += MQ4.calibrate(RatioMQ4CleanAir);
//    Serial.print(".");
  }
  MQ4.setR0(calcR0 / 10);
//  Serial.println("  done!.");

  if (isinf(calcR0))
  {
//    Serial.println("Warning: Conection issue, R0 is infinite (Open circuit detected) please check your wiring and supply");
    while (1)
      ;
  }
  if (calcR0 == 0)
  {
//    Serial.println("Warning: Conection issue found, R0 is zero (Analog pin shorts to ground) please check your wiring and supply");
    while (1)
      ;
  }
  /*****************************  MQ CAlibration ********************************************/

  // Bluetooth
  Serial2.begin(9600);

    if(!Serial2){
    Serial2.println("No esta listo");
  } else {
    Serial2.println("Si esta conectado");
  }

  abiertovalv = false;
  abiertochispa = false;
}





String texto = "";
void loop()
{

  texto = "";
  int index = 0;
  while(Serial2.available() > 0){
    byte b = Serial2.read();
//    Serial.println(b);
    texto = b;
    if (texto == "239"){//chispa 7
    abiertochispa = !abiertochispa;
  }
  if (texto == "3"){//valvula gas 119
//    Serial.println("Abrir valvula");
    abiertovalv = !abiertovalv;
  }
  }

//    Serial.println(texto);
  if(abiertovalv){
    abrirValv();
  } else {
    cerrarValv();
  }

  if(abiertochispa){
    ChispaOn();
  } else {
    ChispaOff();
  }
  

  
  //TEMPERATURA//
  DHT.read11(DHTPIN);
  // CH4
  MQ4.update();
//  MQ4.setA(3811.9);
//  MQ4.setB(-3.113);             // Configure the equation to to calculate CH4 concentration
//  float LPG = MQ4.readSensor(); // Sensor will read PPM concentration using the model, a and b values set previously or from the setup

  MQ4.setA(1012.7);
  MQ4.setB(-2.786);             // Configure the equation to to calculate CH4 concentration
  float CH4 = MQ4.readSensor(); // Sensor will read PPM concentration using the model, a and b values set previously or from the setup

//  MQ4.setA(200000000000000);
//  MQ4.setB(-19.05);            // Configure the equation to to calculate CH4 concentration
//  float CO = MQ4.readSensor(); // Sensor will read PPM concentration using the model, a and b values set previously or from the setup
//
//  MQ4.setA(60000000000);
//  MQ4.setB(-14.01);                 // Configure the equation to to calculate CH4 concentration
//  float Alcohol = MQ4.readSensor(); // Sensor will read PPM concentration using the model, a and b values set previously or from the setup
//
//  MQ4.setA(30000000);
//  MQ4.setB(-8.308);               // Configure the equation to to calculate CH4 concentration
//  float Smoke = MQ4.readSensor(); // Sensor will read PPM concentration using the model, a and b values set previously or from the setup
//  
//  Serial2.print("{ \"CH4\":");
//  Serial2.print(String(CH4).c_str());
//  Serial2.print(", \"temp\":");
//  Serial2.print(String(DHT.temperature).c_str());
//  Serial2.print("}\n");

//  Serial2.print("Hola Mundo");
  //  Liberar Gas
  
  DynamicJsonDocument doc(1024);
  doc["CH4"] = CH4;
  doc["temp"] = DHT.temperature;
  serializeJson(doc, Serial);
  Serial.println();
  delay(1000);
}


void abrirValv(){
//  Serial.println("Abrir valvula");
  digitalWrite(VALVPIN, HIGH);
}

void ChispaOn(){
//  Serial.println("Abrir valvula");
  digitalWrite(CHISPAPIN, HIGH);
}


void cerrarValv(){
//  Serial.println("Cerrar valvula");
  digitalWrite(VALVPIN, LOW);
}

void ChispaOff(){
//  Serial.println("Abrir valvula");
  digitalWrite(CHISPAPIN, LOW);
}
