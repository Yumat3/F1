AFRAME.registerComponent('lap-system', {
  init: function () {
    this.lapStart = performance.now();
    this.lastCross = 0;
  },

  tick: function () {
    const pos = this.el.object3D.position;

    if (pos.x < -848 && pos.x > -852) {
      const now = performance.now();

      if (now - this.lastCross > 3000) {
        const lapTime = (now - this.lapStart) / 1000;
        document.getElementById('lap').textContent = lapTime.toFixed(2);

        this.lapStart = now;
        this.lastCross = now;
      }
    }
  }
});