// AFRAME.registerComponent('camera-follow', {
//   tick: function () {
//     const car = document.querySelector('#car');
//     if (!car) return;

//     const offset = new THREE.Vector3(0,4,-8);
//     offset.applyQuaternion(car.object3D.quaternion);

//     this.el.object3D.position
//       .copy(car.object3D.position)
//       .add(offset);

//     this.el.object3D.lookAt(car.object3D.position);
//   }
// });