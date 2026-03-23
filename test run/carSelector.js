let carStats = {
  pirelli: { maxSpeed:0.08, acceleration:0.005, handling:1.2, braking:0.006, grip:0.993 },
  mclaren:{ maxSpeed:0.067, acceleration:0.004, handling:2.5, braking:0.006, grip:0.995 },
  ferrari:{ maxSpeed:0.07, acceleration:0.003, handling:1.8, braking:0.006, grip:0.980 }
};

function selectCar(team) {
  let car = document.querySelector('#car');
  let s = carStats[team];
  let carc = document.createElement('a-camera');
  car.append(carc);
  carc.setAttribute('position','0 2 -1')
  carc.setAttribute('rotation','90 180 90')
  carc.setAttribute('wasd-controls-enabled','false')
  car.setAttribute('gltf-model', `#${team}`);
  car.setAttribute('scale', '0.1 0.1 0.1');
  car.setAttribute('position', '50 5 220');
  car.setAttribute('rotation', '0 45 0');

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