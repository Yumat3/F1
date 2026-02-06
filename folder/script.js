let rnd = (l,u) => Math.random() * (u-l) + l
let scene, balls = [], car, dog, camera;
window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene");
  car = document.querySelector("#car");
  dog = document.querySelector("#dog");
  camera = document.querySelector("a-camera");
  car.onclick = function(){
    car.components.sound.playSound();
  }
  for(let i = 0; i < 20; i++){
    let x = rnd(-10,10);
    let z = rnd(-10,10);
    balls.push(new Ball(x,z));
  }
  setTimeout(loop,1000);
})

function loop(){
  if(distance(camera,dog) < 1){
    dog.components.sound.playSound();
  }
  for(let ball of balls){
    ball.bounce();
  }

  window.requestAnimationFrame( loop )
  
}

function distance(obj1,obj2){
  let x1 = obj1.object3D.position.x;
  let y1 = obj1.object3D.position.y;
  let z1 = obj1.object3D.position.z;
  let x2 = obj2.object3D.position.x;
  let y2 = obj2.object3D.position.y;
  let z2 = obj2.object3D.position.z;

  let d = Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2) + Math.pow(z1-z2,2));
  return d;
}