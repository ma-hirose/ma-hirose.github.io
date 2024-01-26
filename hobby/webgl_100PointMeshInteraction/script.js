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
const positions_i = new Float32Array(points);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 背景を白に設定
renderer.setClearColor(0xffffff);

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// 水色のマテリアル このpointsObjectをAnimationでは更新する
const material = new THREE.PointsMaterial({ color: 0x00bfff, opacity: 0.1, transparent: true , size: 1.});
const pointsObject = new THREE.Points(geometry, material);
scene.add(pointsObject);








// マウス座標を保存する変数
const mouse = new THREE.Vector2();
const mouseCenter = new THREE.Vector2(0, 0); // 画面中央

// マウスイベントリスナーを追加
document.addEventListener('mousemove', (event) => {
  // ウィンドウ内のマウス座標を取得
  const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

  // マウス座標を更新
  mouse.x = mouseX;
  mouse.y = mouseY;
});

camera.position.z = 5;

const dotOffset = 0.3; // ドットの移動量

const animate = function () {
  requestAnimationFrame(animate);
  updateDotsPosition();
  renderer.render(scene, camera);
};

const updateDotsPosition = () => {
  const positions = pointsObject.geometry.attributes.position.array;
  const numPoints = positions.length / 3;

  for (let i = 0; i < numPoints; i++) {

    let d = Math.floor(i / 10); // 商を計算
    let m = i % 10; // 余りを計算

    const value = 6.363961030678928 - Math.sqrt(Math.pow(d - 4.5, 2) + Math.pow(m - 4.5, 2));

    // マウスの方向に全てのドットを移動
    positions[i * 3] = positions_i[i * 3] + (mouse.x - mouseCenter.x) * dotOffset * value;
    positions[i * 3 + 1] =  positions_i[i * 3 + 1] + (mouse.y - mouseCenter.y) * dotOffset * value;

  }

  pointsObject.geometry.attributes.position.needsUpdate = true;
};

animate();