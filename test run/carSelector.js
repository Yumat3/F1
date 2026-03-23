let carStats = {
  pirelli: { maxSpeed:0.025, acceleration:0.005, handling:0.8, braking:0.006, grip:0.970 },
  mclaren:{ maxSpeed:0.017,  acceleration:0.004, handling:0.9, braking:0.006, grip:0.980 },
  ferrari:{ maxSpeed:0.022, acceleration:0.003, handling:0.7, braking:0.006, grip:0.960 }
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