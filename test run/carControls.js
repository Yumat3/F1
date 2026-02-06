AFRAME.registerComponent('car-controls', {
  schema: {
    maxSpeed: { type: 'number', default: 0.008 },
    acceleration: { type: 'number', default: 0.0003 },
    braking: { type: 'number', default: 0.0005 },
    handling: { type: 'number', default: 1.2 },
    grip: { type: 'number', default: 0.985 }
  },

  init: function () {
    this.speed = 0;
    this.rotationY = 90;
    this.keys = {};

    document.addEventListener('keydown', e => this.keys[e.key.toLowerCase()] = true);
    document.addEventListener('keyup', e => this.keys[e.key.toLowerCase()] = false);
  },

  tick: function () {
    const el = this.el;
    const d = this.data;

    if (this.keys['w']) this.speed += d.acceleration;
    if (this.keys['s']) this.speed -= d.braking;

    this.speed = Math.max(-d.maxSpeed/2, Math.min(this.speed, d.maxSpeed));
    this.speed *= d.grip;

    const steer = d.handling / (Math.abs(this.speed)*20 + 1);
    if (this.keys['a']) this.rotationY += steer * 5;
    if (this.keys['d']) this.rotationY -= steer * 5;

    el.object3D.rotation.y = THREE.MathUtils.degToRad(this.rotationY);

    const dir = new THREE.Vector3(0,0,1);
    dir.applyQuaternion(el.object3D.quaternion);
    el.object3D.position.add(dir.multiplyScalar(this.speed * 60));

    // Straight wall collision
    const pos = el.object3D.position;
    if (pos.z > 9 || pos.z < -9) this.speed *= -0.3;

    document.getElementById('speed').textContent =
      (Math.abs(this.speed)*600).toFixed(0);
  }
});