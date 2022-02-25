class Particula{
 PVector position;
 PVector velocidad;
 
 float temperature;
 float humedad;
 PVector acceleration;
 
 
 float tono;

 
 
 Particula(PVector origen, float temperaturaA, float velocidadAnimacion) {
   
   acceleration = new PVector(0, 0);
   velocidad = new PVector(random(-2, 0), random(-1, 1));
    

    position = origen.copy();
    tono = 255.0;
    
    temperature = temperaturaA;
  }

  void run() {
    actualizar();
    mostrar();
  }

  void actualizar() {
    velocidad.add(acceleration);
    position.add(velocidad);
    tono -= 1.0;
  }

  void mostrar() {
    if(temperature < 10) {
      stroke(verde1, tono);
      fill(verde1, tono);
    } else if((temperature >= 10) && (temperature < 15)) {
      stroke(verde2, tono);
      fill(verde2, tono);
    } else if((temperature >= 15) && (temperature < 20)){
      stroke(verde3, tono);
      fill(verde3, tono);
    }else if((temperature >= 20) && (temperature < 25)){
      stroke(amarillo1, tono);
      fill(amarillo1, tono);
    }else if((temperature >= 25) && (temperature < 30)){
      stroke(amarillo2, tono);
      fill(amarillo2, tono);
    }else if((temperature >= 30) && (temperature < 35)){
      stroke(amarillo3, tono);
      fill(amarillo3, tono);
    }else if((temperature >= 35) && (temperature < 40)){
      stroke(rojo1, tono);
      fill(rojo1, tono);
    }else if((temperature >= 40) && (temperature < 45)){
      stroke(rojo2, tono);
      fill(rojo2, tono);
    }else if((temperature >= 45) ){
      stroke(rojo3, tono);
      fill(rojo3, tono);
    }
    ellipse(position.x, position.y, 8, 8);
  }

  boolean finalizo() {
    if (tono < 155.0) {
      return true;
    } else if (tono < 0.0) {
      return true;
    } else {
      return false;
    }
  }
 
 
}
