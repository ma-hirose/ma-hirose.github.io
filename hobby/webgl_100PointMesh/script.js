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
const material = new THREE.PointsMaterial({ color: 0x00bfff, opacity: 0.4, transparent: true , size: 0.05});

const pointsObject = new THREE.Points(geometry, material);
scene.add(pointsObject);

camera.position.z = 5;

const xOffset = 0.1; // x方向のオフセット
const yOffset = 0.1; // y方向のオフセット

const animate = function () {
  requestAnimationFrame(animate);

  // 時間に対して波を生成
  const time = performance.now() * 0.001; // ミリ秒から秒へ変換
  const speed = 1.3; // 波の速度
  const amplitude = 0.005; // 波の振幅

  // 各点の位置を時間に応じて変更
  for (let i = 0; i < numPointsX; i++) {
    for (let j = 0; j < numPointsY; j++) {
      const index = (i * numPointsY + j) * 3;
      pointsObject.geometry.attributes.position.array[index] = positions[index] + Math.sin(time * speed) * amplitude;
      pointsObject.geometry.attributes.position.array[index + 1] = positions[index + 1] + Math.sin(time * speed) * amplitude;
    }
  }

  pointsObject.geometry.attributes.position.needsUpdate = true; // 位置を更新

  renderer.render(scene, camera);
};

animate();
