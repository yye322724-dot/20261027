let runSprite; // 儲存角色的橫向精靈圖。
let playerX = 0; // 儲存角色目前的水平位置。
let facingDirection = 1; // 設定角色初始面向右方。
const FRAME_COUNT = 8; // 設定精靈圖中的影格數量。
const FRAME_WIDTH = 779 / FRAME_COUNT; // 根據整張圖片寬度計算單格寬度。
const FRAME_HEIGHT = 79; // 設定精靈圖的單格高度。
const SPRITE_SCALE = 2; // 將角色以兩倍尺寸顯示。
const MOVE_SPEED = 4; // 設定角色每次繪製時的移動距離。

function preload() { // 在畫布啟動前載入角色精靈圖。
  runSprite = loadImage("run.png", () => {}, () => console.error("無法載入 run.png，請確認圖片位於 index.html 同一資料夾。")); // 載入精靈圖並在失敗時提示圖片路徑。
} // 結束精靈圖預載入函式。

function setup() { // 設定畫布與角色初始狀態。
  createCanvas(windowWidth, windowHeight); // 建立符合視窗尺寸的畫布。
  imageMode(CENTER); // 讓精靈影格以指定座標為中心繪製。
  playerX = width / 2; // 將角色初始水平位置放在畫面中央。
} // 結束畫布設定函式。

function draw() { // 每一畫格更新角色並繪製場景。
  background("#fdf0d5"); // 使用指定的淡米色作為畫布背景。
  if (keyIsDown(LEFT_ARROW)) { // 檢查是否按住鍵盤左方向鍵。
    playerX -= MOVE_SPEED; // 按住左方向鍵時讓角色向左移動。
    facingDirection = -1; // 按住左方向鍵時讓角色面向左方。
  } // 結束左方向鍵控制。
  if (keyIsDown(RIGHT_ARROW)) { // 檢查是否按住鍵盤右方向鍵。
    playerX += MOVE_SPEED; // 按住右方向鍵時讓角色向右移動。
    facingDirection = 1; // 按住右方向鍵時讓角色面向右方。
  } // 結束右方向鍵控制。
  const displayWidth = FRAME_WIDTH * SPRITE_SCALE; // 計算角色顯示時的寬度。
  const halfDisplayWidth = displayWidth / 2; // 計算角色顯示寬度的一半。
  playerX = constrain(playerX, min(halfDisplayWidth, width / 2), max(width - halfDisplayWidth, width / 2)); // 限制角色留在畫布水平範圍內。
  const currentFrame = floor(frameCount / 6) % FRAME_COUNT; // 每六個畫格切換一次精靈動畫影格。
  push(); // 暫存目前的繪圖狀態。
  translate(playerX, height / 2); // 將繪圖原點移至角色所在位置。
  scale(facingDirection, 1); // 依移動方向水平翻轉角色。
  image(runSprite, 0, 0, displayWidth, FRAME_HEIGHT * SPRITE_SCALE, currentFrame * FRAME_WIDTH, 0, FRAME_WIDTH, FRAME_HEIGHT); // 擷取目前影格並繪製角色動畫。
  pop(); // 還原繪圖狀態以免影響後續畫格。
} // 結束每畫格繪製函式。

function windowResized() { // 在瀏覽器視窗尺寸改變時調整畫布。
  resizeCanvas(windowWidth, windowHeight); // 讓畫布重新填滿目前的視窗。
} // 結束視窗尺寸調整函式。
