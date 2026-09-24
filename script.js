import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

const canvas = document.querySelector('#webgl');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x050608, 0.055);

const camera = new THREE.PerspectiveCamera(55, innerWidth/innerHeight, .1, 100);
camera.position.set(0, 0.2, 7);

const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);

const group = new THREE.Group();
scene.add(group);

const ambient = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambient);

const point = new THREE.PointLight(0x9ba7ff, 18, 18);
point.position.set(3, 2, 4);
scene.add(point);

const point2 = new THREE.PointLight(0xffffff, 8, 14);
point2.position.set(-4, -2, 2);
scene.add(point2);

// Floating wireframe geometry
for(let i=0;i<14;i++){
  const g = i%2 ? new THREE.IcosahedronGeometry(.12 + Math.random()*.22, 1)
                : new THREE.TorusGeometry(.14 + Math.random()*.18, .025, 8, 24);
  const m = new THREE.MeshBasicMaterial({color:0x9ba7ff, wireframe:true, transparent:true, opacity:.45});
  const mesh = new THREE.Mesh(g,m);
  mesh.position.set((Math.random()-.5)*11,(Math.random()-.5)*7,(Math.random()-.5)*4-1);
  mesh.userData.speed = .15 + Math.random()*.45;
  group.add(mesh);
}

// Particle field
const count = 1000;
const positions = new Float32Array(count*3);
for(let i=0;i<count;i++){
  positions[i*3] = (Math.random()-.5)*18;
  positions[i*3+1] = (Math.random()-.5)*11;
  positions[i*3+2] = (Math.random()-.5)*12-2;
}
const particlesGeo = new THREE.BufferGeometry();
particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions,3));
const particlesMat = new THREE.PointsMaterial({color:0xffffff,size:.018,transparent:true,opacity:.7});
const particles = new THREE.Points(particlesGeo,particlesMat);
scene.add(particles);

const mouse = {x:0,y:0};
addEventListener('pointermove', e=>{
  mouse.x = (e.clientX/innerWidth-.5);
  mouse.y = (e.clientY/innerHeight-.5);
});

addEventListener('resize',()=>{
  camera.aspect=innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth,innerHeight);
});

const clock = new THREE.Clock();
function animate(){
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  group.rotation.y += .0008;
  group.children.forEach((m,i)=>{
    m.rotation.x += .002*m.userData.speed;
    m.rotation.y += .003*m.userData.speed;
    m.position.y += Math.sin(t*m.userData.speed+i)*.0008;
  });

  particles.rotation.y = t*.008;
  camera.position.x += ((mouse.x*.45)-camera.position.x)*.025;
  camera.position.y += ((-mouse.y*.3+.2)-camera.position.y)*.025;
  camera.lookAt(0,0,0);

  renderer.render(scene,camera);
}
animate();
