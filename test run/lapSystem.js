AFRAME.registerComponent('lap-system', {
  init: function () {
    this.lapStart = performance.now();
    this.lastCross = 0;
    this.lapCount = 0;
    this.lapsToWin = 5;
    this.lastX = 0; // Track previous x position for direction
    document.getElementById('lap').textContent = `${this.lapCount}/${this.lapsToWin}`;
  },

  tick: function () {
    if (window.raceWon) return;

    const pos = this.el.object3D.position;
    const currentZ = pos.z;

    // Check if car is crossing the finish line from back to front (completing a lap)
    // Finish line is at z=200, detection zone is narrow and requires movement
    if (currentZ < 202 && currentZ > 198 && this.lastZ >= 202) {
      const now = performance.now();

      if (now - this.lastCross > 3000) {
        this.lapCount += 1;
        const lapTime = (now - this.lapStart) / 1000;
        document.getElementById('lap').textContent = `${this.lapCount}/${this.lapsToWin}`;

        this.lapStart = now;
        this.lastCross = now;

        if (this.lapCount >= this.lapsToWin) {
          window.raceWon = true;
          showEndScreen('YOU WIN', 'Five laps complete. Congratulations!', '#00ff99');

          // stop car
          const car = document.getElementById('car');
          if (car && car.components['car-controls']) {
            car.components['car-controls'].speed = 0;
          }
        }
      }
    }

    this.lastZ = currentZ;
  }
});