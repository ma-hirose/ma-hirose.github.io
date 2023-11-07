const numPointsX = 10;
const numPointsY = 10;
const points = [];

for (let i = 0; i < numPointsX; i++) {
  for (let j = 0; j < numPointsY; j++) {
    const x = (i / (numPointsX - 1)) * 2 - 1;
    const y = (j / (numPointsY - 1)) * 2 - 1;
    const z = 0;
    points.push(x, y, z);
  }
}

const positions = new Float32Array(points);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 背景を白に設定
renderer.setClearColor(0xffffff);

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// 水色のマテリアル
const material = new THREE.PointsMaterial({ color: 0x00bfff, opacity: 0.4, transparent: true });

const pointsObject = new THREE.Points(geometry, material);
scene.add(pointsObject);

camera.position.z = 5;

const animate = function () {
  requestAnimationFrame(animate);
  
  // 時間に対して正弦関数を使用して非線形な緩急を加える
  const time = performance.now() * 0.001; // ミリ秒から秒へ変換
  const speed = 0.13; // 回転速度の増加量
  pointsObject.rotation.x = Math.sin(time * speed) * Math.cos(time*speed*5) * 3 * Math.PI;
  pointsObject.rotation.y = Math.cos(time * speed*2) * Math.sin(time*speed*3) * 3 * Math.PI;
  // pointsObject.rotation.x = Math.sin(time * speed) * 3 * Math.PI;
  // pointsObject.rotation.y = Math.cos(time * speed) * 3 * Math.PI;
  renderer.render(scene, camera);
};

animate();
