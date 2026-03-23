AFRAME.registerComponent('car-controls', {
  schema: {
    maxSpeed: { type: 'number', default: 0.008 },
    acceleration: { type: 'number', default: 0.0003 },
    braking: { type: 'number', default: 0.0005 },
    handling: { type: 'number', default: 1.2 },
    grip: { type: 'number', default: 0.985 },
    health: { type: 'number', default: 100 }
  },

  init: function () {
    this.speed = 0;
    this.rotationY = 90;
    this.keys = {};
    this.carBox = new THREE.Box3();
    this.lastPosition = new THREE.Vector3();
    this.health = this.data.health;
    this.lastCollisionTime = 0;
    this.dead = false;

    document.addEventListener('keydown', e => this.keys[e.key.toLowerCase()] = true);
    document.addEventListener('keyup', e => this.keys[e.key.toLowerCase()] = false);
  },

  tick: function () {
    if (this.dead || window.raceWon || !window.raceStarted) {
      if (this.el && this.el.object3D) {
        this.speed = 0;
      }
      return;
    }

    let el = this.el;
    let d = this.data;

    if (this.keys['w']) this.speed += d.acceleration;
    if (this.keys['s']) this.speed -= d.braking;

    this.speed = Math.max(-d.maxSpeed/2, Math.min(this.speed, d.maxSpeed));
    this.speed *= d.grip;

    let steer = d.handling / (Math.abs(this.speed)*20 + 1);
    if (this.keys['a']) this.rotationY += steer * 5;
    if (this.keys['d']) this.rotationY -= steer * 5;

    el.object3D.rotation.y = THREE.MathUtils.degToRad(this.rotationY);

    // Store last position for collision response
    this.lastPosition.copy(el.object3D.position);

    let dir = new THREE.Vector3(0,0,1);
    dir.applyQuaternion(el.object3D.quaternion);
    el.object3D.position.add(dir.multiplyScalar(this.speed * 60));

    // Check collision with all walls
    this.carBox.setFromObject(el.object3D);
    let collided = false;
    let collisionNormal = new THREE.Vector3();

    if (window.walls) {
      for (let wall of window.walls) {
        let wallBox = new THREE.Box3().setFromObject(wall.obj.object3D);
        if (this.carBox.intersectsBox(wallBox)) {
          collided = true;
          // Calculate collision normal (direction from wall center to car)
          let wallCenter = wallBox.getCenter(new THREE.Vector3());
          let carCenter = this.carBox.getCenter(new THREE.Vector3());
          collisionNormal = carCenter.sub(wallCenter).normalize();
          break; // Stop after first collision
        }
      }
    }

    if (collided && !this.dead) {
      const now = performance.now();
      if (now - this.lastCollisionTime > 500) {
        this.health = Math.max(0, this.health - 10);
        this.lastCollisionTime = now;
        document.getElementById('health').textContent = this.health;

        if (this.health <= 0) {
          this.dead = true;
          this.speed = 0;
          showEndScreen('GAME OVER', 'You crashed out! Try again.', '#ff4466');
        }
      }

      // Push car back to last position
      el.object3D.position.copy(this.lastPosition);
      // Reflect velocity based on collision normal
      this.speed *= -0.5; // Bounce with energy loss
    }

    document.getElementById('speed').textContent =
      (Math.abs(this.speed)*600).toFixed(0);

    if (document.getElementById('health')) {
      document.getElementById('health').textContent = this.health;
    }
  }
});