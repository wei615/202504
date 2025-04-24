let frogs = [];
let hearts = [];
let fireworks = []; // 煙火陣列

function setup() {
  createCanvas(windowWidth, windowHeight); // 全視窗畫布
  background('#ffd166'); // 背景顏色

  // 生成 30 個青蛙
  for (let i = 0; i < 20; i++) {
    frogs.push({
      x: random(width),
      y: random(height),
      size: random(40, 60),
      color: random(['#8ac926', '#38b000']), // 修改青蛙顏色
      speedX: random(-2, 2), // 水平移動速度
      speedY: random(-2, 2)  // 垂直移動速度
    });
  }

  // 生成 20~30 個愛心
  let heartCount = int(random(20, 31));
  for (let i = 0; i < heartCount; i++) {
    hearts.push({
      x: random(width),
      y: random(height),
      size: random(20, 30), // 愛心大小為 10 到 20
      color: random(['#fb6f92', '#ff8fab', '#ffb3c6']), // 隨機顏色
      speedX: random(-1, 1), // 水平移動速度
      speedY: random(-1, 1)  // 垂直移動速度
    });
  }
}

function draw() {
  background('#ffd166'); // 重繪背景

  // 根據滑鼠位置調整大小
  let sizeFactor = map(mouseX, 0, width, 0.5, 2);

  // 繪製並移動青蛙
  for (let frog of frogs) {
    drawFrog(frog.x, frog.y, frog.size * sizeFactor, frog.color);

    // 更新青蛙位置
    frog.x += frog.speedX;
    frog.y += frog.speedY;

    // 確保青蛙不會跑出畫布
    if (frog.x < 0 || frog.x > width) frog.speedX *= -1;
    if (frog.y < 0 || frog.y > height) frog.speedY *= -1;
  }

  // 繪製並移動愛心
  for (let heart of hearts) {
    drawHeart(heart.x, heart.y, heart.size * sizeFactor, heart.color); // 愛心大小隨滑鼠移動改變

    // 更新愛心位置
    heart.x += heart.speedX;
    heart.y += heart.speedY;

    // 確保愛心不會跑出畫布
    if (heart.x < 0 || heart.x > width) heart.speedX *= -1;
    if (heart.y < 0 || heart.y > height) heart.speedY *= -1;
  }

  // 繪製並更新煙火
  for (let i = fireworks.length - 1; i >= 0; i--) {
    let firework = fireworks[i];
    firework.size += 2; // 煙火逐漸變大
    firework.alpha -= 5; // 煙火逐漸消失

    fill(firework.color[0], firework.color[1], firework.color[2], firework.alpha);
    noStroke();
    ellipse(firework.x, firework.y, firework.size);

    // 如果煙火完全透明，移除它
    if (firework.alpha <= 0) {
      fireworks.splice(i, 1);
    }
  }
}

// 繪製青蛙大頭
function drawFrog(x, y, size, color) {
  fill(color);
  noStroke();

  // 頭部 (大圓)
  ellipse(x, y, size);

  // 左眼 (小圓)
  fill(color);
  ellipse(x - size * 0.30, y - size * 0.40, size * 0.4);

  // 右眼 (小圓)
  ellipse(x + size * 0.30, y - size * 0.40, size * 0.4);

  // 左眼白
  fill(255);
  ellipse(x - size * 0.30, y - size * 0.40, size * 0.2);

  // 右眼白
  ellipse(x + size * 0.30, y - size * 0.40, size * 0.2);

  // 左眼珠
  fill(0);
  ellipse(x - size * 0.30, y - size * 0.40, size * 0.1);

  // 右眼珠
  ellipse(x + size * 0.30, y - size * 0.40, size * 0.1);

  // 嘴巴 (微笑變小)
  noFill();
  stroke(0);
  strokeWeight(size * 0.03); // 嘴巴線條變細
  arc(x, y + size * 0.1, size * 0.3, size * 0.2, 0, PI); // 嘴巴變小
}

// 繪製愛心
function drawHeart(x, y, size, color) {
  fill(color);
  noStroke();

  // 愛心由兩個圓和一個三角形組成
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}

// 當滑鼠點擊時，新增煙火
function mousePressed() {
  fireworks.push({
    x: mouseX,
    y: mouseY,
    size: 10,
    color: [random(255), random(255), random(255)], // 隨機顏色
    alpha: 255 // 初始透明度
  });
}

// 當視窗大小改變時，調整畫布大小
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
