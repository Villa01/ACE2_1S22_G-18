class Module {
  int xOffset;
  int yOffset;
  float x, y;
  int unit;
  int xDirection = 1;
  int yDirection = 1;
  float speed; 
  
  // Contructor
  Module(int xOffsetTemp, int yOffsetTemp, int xTemp, int yTemp, float speedTemp, int tempUnit) {
    xOffset = xOffsetTemp;
    yOffset = yOffsetTemp;
    x = xTemp;
    y = yTemp;
    speed = speedTemp;
    unit = tempUnit;
  }
  
  // Custom method for updating the variables
  void update() {
    x = x + (speed * xDirection);
    if (x >= unit || x <= 0) {
      xDirection *= -1;
      x = x + (1 * xDirection);
      y = y + (1 * yDirection);
    }
    if (y >= unit || y <= 0) {
      yDirection *= -1;
      y = y + (1 * yDirection);
    }
  }
  
  void colors(float temperature){    
     if(temperature < 10) {
      stroke(verde1);
      fill(verde1);
    } else if((temperature >= 10) && (temperature < 15)) {
      stroke(verde2);
      fill(verde2);
    } else if((temperature >= 15) && (temperature < 20)){
      stroke(verde3);
      fill(verde3);
    }else if((temperature >= 20) && (temperature < 25)){
      stroke(amarillo1);
      fill(amarillo1);
    }else if((temperature >= 25) && (temperature < 30)){
      stroke(amarillo2);
      fill(amarillo2);
    }else if((temperature >= 30) && (temperature < 35)){
      stroke(amarillo3);
      fill(amarillo3);
    }else if((temperature >= 35) && (temperature < 40)){
      stroke(rojo1);
      fill(rojo1);
    }else if((temperature >= 40) && (temperature < 45)){
      stroke(rojo2);
      fill(rojo2);
    }else if((temperature >= 45) ){
      stroke(rojo3);
      fill(rojo3);
    }
  }
  
  // Custom method for drawing the object
  void display( float temp) {
    colors(temp);
    ellipse(xOffset + x, yOffset + y, 6, 6);
  }
}
