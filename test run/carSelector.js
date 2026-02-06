const carStats = {
  redbull: { maxSpeed:0.11, acceleration:0.005, handling:0.9, braking:0.004, grip:0.993 },
  mercedes:{ maxSpeed:0.085, acceleration:0.004, handling:2.5, braking:0.006, grip:0.995 },
  williams:{ maxSpeed:0.07, acceleration:0.003, handling:1.8, braking:0.006, grip:0.980 }
};

function selectCar(team) {
  const car = document.querySelector('#car');
  const s = carStats[team];

  car.setAttribute('gltf-model', '#f1model');
  car.setAttribute('scale', '0.8 0.8 0.8');
  car.setAttribute('position', '-840 0 0');
  car.setAttribute('rotation', '0 90 0');

  car.setAttribute('car-controls', `
    maxSpeed:${s.maxSpeed};
    acceleration:${s.acceleration};
    handling:${s.handling};
    braking:${s.braking};
    grip:${s.grip};
  `);

  car.setAttribute('lap-system', '');

  document.getElementById('menu').style.display = 'none';
}