class SistemaParticulas {
  ArrayList<Particula> particulas;
  PVector origen;

  SistemaParticulas(PVector position) {
    origen = position.copy();
    particulas = new ArrayList<Particula>();
  }

  void agregarParticula( float temperatura, float velocidadAnimacion, int cantidad) {
    for (int i =0; i<cantidad;i++){
      particulas.add(new Particula(origen,  temperatura, velocidadAnimacion));
    }
    
  }

  void run() {
    for (int i = (particulas.size()-1); i >= 0; i--) {
      Particula p = particulas.get(i);
      p.run();
      if (p.finalizo()) {
        particulas.remove(i);
      }
    }
  }
}
