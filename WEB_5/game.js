const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const stat = document.querySelector("#status");
const st = stat.getContext("2d");
let ballRadius = 8;
const paddleWidth = 40;
const paddleHeight = 40;
let paddleX = (canvas.width - paddleWidth) / 2;

let Background = new Image();
Background.src = "./assets/backGroundBattle.jpg";

let x = canvas.width / 2;
let y = canvas.height - paddleHeight - 10;
let dx = 1;
let dy = -1;
let beforeMousePosition;
let mousePosition;

let enemySrc = [
  { x: 9, y: 994 },
  { x: 9, y: 1011 },
  { x: 9, y: 1028 },
];

let bombSrc = [
  { x: 64 * 0, y: 0 },
  { x: 64 * 1, y: 0 },
  { x: 64 * 2, y: 0 },
  { x: 64 * 3, y: 0 },
  { x: 64 * 4, y: 0 },
  { x: 64 * 5, y: 0 },
  { x: 64 * 6, y: 0 },
  { x: 64 * 7, y: 0 },

  { x: 64 * 0, y: 64 * 1 },
  { x: 64 * 1, y: 64 * 1 },
  { x: 64 * 2, y: 64 * 1 },
  { x: 64 * 3, y: 64 * 1 },
  { x: 64 * 4, y: 64 * 1 },
  { x: 64 * 5, y: 64 * 1 },
  { x: 64 * 6, y: 64 * 1 },
  { x: 64 * 7, y: 64 * 1 },

  { x: 64 * 0, y: 64 * 2 },
  { x: 64 * 1, y: 64 * 2 },
  { x: 64 * 2, y: 64 * 2 },
  { x: 64 * 3, y: 64 * 2 },
  { x: 64 * 4, y: 64 * 2 },
];

let bossSrc = { x: 9, y: 1045 };
let skillSrc = { x: 43, y: 1103 };

let stageLevel=1;
let enemies = [];
let skills = [];
let boss = [];
let row = 5;
let col = 10;
let enemyWidth = 20;
let enemyHeight = 20;
let skillBoxWidth = enemyWidth;
let skillBoxHeight = enemyHeight;
let enemyMargin = 15;
let bossWidth = 40;
let bossHeight = 40;
let enemyOffsetTop = 10;
let enemyOffsetLeft = 30;
let enemyLife = 1;
let bossLife = 5;
let enemyNumDefine = 5;
let enemyNum;
let skillNum=Math.floor(Math.random()*2); //2개의 상자 중 랜덤으로 스킬 1,2 중 하나 획득
// let chooseCh=[
//   {x: 9, y: 34 },
//   {x: 9, y: 136 },
//   {x: 9, y: 170 },
// ];
//console.log(skillNum);
let chooseChX = [9];
let chooseChY = [34, 136, 170];
let character = [0];

function ch(num) {
  if (num === 0) {
    document.querySelector(".jiwoo").classList.add("selected");
    document.querySelector(".leeseul").classList.remove("selected");
    document.querySelector(".woong").classList.remove("selected");
  } else if (num === 1) {
    document.querySelector(".leeseul").classList.add("selected");
    document.querySelector(".jiwoo").classList.remove("selected");
    document.querySelector(".woong").classList.remove("selected");
  } else {
    document.querySelector(".woong").classList.add("selected");
    document.querySelector(".jiwoo").classList.remove("selected");
    document.querySelector(".leeseul").classList.remove("selected");
  }
  character.push(num);
  for (let i = 0; i < 4; i++) {
    characterForward.pop();
    characterLeft.pop();
    characterRight.pop();
  }
  characterForward.push(
    { x: chooseChX[0] + 17, y: chooseChY[character[character.length - 1]] },
    { x: chooseChX[0], y: chooseChY[character[character.length - 1]] },
    { x: chooseChX[0] + 17, y: chooseChY[character[character.length - 1]] },
    { x: chooseChX[0] + 34, y: chooseChY[character[character.length - 1]] }
  );
  characterLeft.push(
    { x: chooseChX[0] + 102, y: chooseChY[character[character.length - 1]] },
    { x: chooseChX[0] + 119, y: chooseChY[character[character.length - 1]] },
    { x: chooseChX[0] + 102, y: chooseChY[character[character.length - 1]] },
    { x: chooseChX[0] + 119, y: chooseChY[character[character.length - 1]] }
  );
  characterRight.push(
    { x: chooseChX[0] + 136, y: chooseChY[character[character.length - 1]] },
    { x: chooseChX[0] + 153, y: chooseChY[character[character.length - 1]] },
    { x: chooseChX[0] + 136, y: chooseChY[character[character.length - 1]] },
    { x: chooseChX[0] + 153, y: chooseChY[character[character.length - 1]] }
  );
  effect();
}

let characterForward = [
  { x: chooseChX[0] + 17, y: chooseChY[character[character.length - 1]] },
  { x: chooseChX[0], y: chooseChY[character[character.length - 1]] },
  { x: chooseChX[0] + 17, y: chooseChY[character[character.length - 1]] },
  { x: chooseChX[0] + 34, y: chooseChY[character[character.length - 1]] },
];
let characterLeft = [
  { x: chooseChX[0] + 102, y: chooseChY[character[character.length - 1]] },
  { x: chooseChX[0] + 119, y: chooseChY[character[character.length - 1]] },
  { x: chooseChX[0] + 102, y: chooseChY[character[character.length - 1]] },
  { x: chooseChX[0] + 119, y: chooseChY[character[character.length - 1]] },
];
let characterRight = [
  { x: chooseChX[0] + 136, y: chooseChY[character[character.length - 1]] },
  { x: chooseChX[0] + 153, y: chooseChY[character[character.length - 1]] },
  { x: chooseChX[0] + 136, y: chooseChY[character[character.length - 1]] },
  { x: chooseChX[0] + 153, y: chooseChY[character[character.length - 1]] },
];

//수정 시작
//현재 상황이 스킬이 발동 중인지(true) 아닌지(false) 구분하기 위한 변수
let skill1 = false;
let skill2 = false;

//스킬2 구현하기 (폭탄)
let bombStartX = x;
let bombStartY = y;
let bombAreaX = 20;
let bombAreaY = 20;
let imageCount = 0;
let imageInterval1 = null;
let imageInterval2 = null;
let skillBar1 = 40;
let skillBar2 = 40;
const skillBarTotal1 = 40;
const skillBarTotal2 = 40;
let bossHP_Bar=100;
const bossHP_toalBar=100;
let bombImage=new Image();

canvas.addEventListener("mouseenter", () => {
  canvas.style.cursor = "none";
});

canvas.addEventListener("mouseleave", () => {
  canvas.style.cursor = "default";
});

let keydownEvent1 = false;
let keydownEvent2 = false;
let bossHit = false; // 일반 공으로 보스 히트
let skill2_bossHit = false; // 스킬2로 보스 히트
let skill2_boxHit = false;
let getSkill1=false;
let getSkill2=false;

window.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();

  if(key==='s'){ //마스터 키
    getSkill();
  }

  if(key==='a'){
    dx=0;
    dy=0;
  }

  if (keydownEvent1 && key === "q") {
    return;
  }
  if (keydownEvent2 && key === "w") {
    return;
  }
  if (key == "q" && !skill1 && getSkill1) {
    keydownEvent1 = true;
    skillBar1 = 0;
    getSkill1=false;
    // progressBarInterval1 = setInterval(updateProgressBar1, 10);
    skill1_on();
    effects(3);
    setTimeout(skill1_off, 5000);
  }

  if ((key == "w" || key == "ㅈ") && !skill2 && getSkill2) {
    console.log('스킬2');
    keydownEvent2 = true;
      skillBar2 = 0;
      imageCount = 0;
      bombAreaX = 30;
      bombAreaY = 30;
      bombImage.src = "./assets/explosion2.png";
      // progressBarInterval2 = setInterval(updateProgressBar2, 10);
      skill2_on();
      setTimeout(()=>{
        skill2_off();
        //console.log('skill2_off');
        skill2_bossHit=false;
        console.log('skill2_bossHit false');
      },3000)
  }
});

function skill1_on() {
  st.font = "bold 12px Arial, sans-serif";
  skill1 = true;
  if (ballRadius < 30) {
    setTimeout(() => {
      ballRadius += 1;
      skill1_on();
    }, 100);
  }
}

function skill1_off() {
  if (ballRadius > 8) {
    setTimeout(() => {
      ballRadius -= 1;
      skill1_off();
    }, 50);
  }else{
    skill1 = false;
    keydownEvent1=false;
  }
}

function skill2_on() {
  skill2 = true;
  bombStartX = x;
  bombStartY = y;
  document.querySelector("#bombSound").play();
  console.log('bomb2');
  clearInterval(imageInterval2);

  imageInterval2 = setInterval(bombEffect, 50);
}

let skill2Effect=false;

function bombEffect() {
  skill2Effect=true;
  //bombImage.src = bombImages[imageCount % 4];
  bombImage.src = "./assets/explosion2.png";
  if (imageCount >= bombSrc.length - 1) {
    clearInterval(imageInterval2);
    skill2_off();
  } else {
    imageCount = (imageCount + 1) % bombSrc.length;
    bombAreaX += 7;
    bombAreaY += 7;
  }

  skill2Effect=false;
}

function drawBombEffect() {
  ctx.drawImage(
    bombImage,
    bombSrc[imageCount].x,
    bombSrc[imageCount].y,
    64,
    64,
    bombStartX - bombAreaX / 2,
    bombStartY - bombAreaY / 2,
    bombAreaX,
    bombAreaY
  );
}

function skill2_off() {
  imageCount = 0;
  skill2_boxHit=false;
  skill2_bossHit = false;
  getSkill2=false;
  bombStartX=0;
  bombStartY=0;
  skill2=false;
  keydownEvent2=false;
}

function getSkill(){
  console.log("스킬1,2 획득");
  getSkill1=true;
  getSkill2=true;
}

function get_Skill1(){
  console.log("스킬1 획득");
  st.fillStyle="black";
  st.font = "italic bold 15px Arial, sans-serif";
  st.fillText("스킬1 (Q) 획득!", 20, 410);
  getSkill1=true;
  effects(2);
}

function get_Skill2(){
  console.log("스킬2 획득");
  st.fillStyle="black";
  st.font = "italic bold 15px Arial, sans-serif";
  st.fillText("스킬2 (W) 획득!", 20, 410);
  getSkill2=true;
  effects(2);
  console.log('bomb');
}


//스킬 아이콘 출력 위치
const icon1 = new Image();
const icon2 = new Image();
icon1.src = "./assets/redBall.png";
icon2.src = "./assets/폭탄.png"; 

// function updateProgressBar1() {
//   skillBar1 += skillBarTotal1 / 1000;
//   if (skillBar1 >= skillBarTotal1) {
//     clearInterval(progressBarInterval1);
//     skill1 = false;
//     keydownEvent1 = false;
//   }
// }

// function updateProgressBar2() {
//   skillBar2 += skillBarTotal2 / 1000;
//   if (skillBar2 >= skillBarTotal2) {
//     clearInterval(progressBarInterval2);
//     skill2 = false;
//     keydownEvent2 = false;
//   }
// }

let totalLife=1;

function drawHP(){
  let Boss=boss[0][5];
  if(bossHP_Bar/bossHP_toalBar > Boss.life/(5 * (stageLevel+1) )){
    bossHP_Bar -= 1;
  }
  ctx.fillStyle ="white";
  ctx.fillRect(180, 45-bossHeight/2, bossWidth, 10);
  if(Boss.life / (5 * (stageLevel + 1)) > 0.66){
    ctx.fillStyle="green";
    ctx.fillRect(180, 45-bossHeight/2, bossWidth*(bossHP_Bar/bossHP_toalBar), 10);
  }else if(Boss.life / (5 * (stageLevel + 1)) > 0.33){
    ctx.fillStyle="yellow";
    ctx.fillRect(180, 45-bossHeight/2, bossWidth*(bossHP_Bar/bossHP_toalBar), 10);
  }else if(Boss.life / (5 * (stageLevel + 1)) > 0){
    ctx.fillStyle="red";
    ctx.fillRect(180, 45-bossHeight/2, bossWidth*(bossHP_Bar/bossHP_toalBar), 10);
  }else{
    ctx.fillStyle=null;
    ctx.fillRect(180, 45-bossHeight/2, 0, 10)
  }
}


function hitEnemies() {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      
      let enemy = enemies[i][j];
      let box = skills[i][j];
      let Boss = boss[i][j];
      let dist1 = Math.sqrt(2) * (bossWidth/2) + ballRadius;
      let dist2 = Math.sqrt( (Boss.x + bossWidth/2 -x)**2 + (Boss.y + bossHeight/2 -y)**2);
      //console.log(dist2<dist1);

      const distX = Math.min(
        Math.abs(x + ballRadius + 2 - enemy.x),
        Math.abs(x - ballRadius - 2 - (enemy.x + enemyWidth))
      );
      const distY = Math.min(
        Math.abs(y + ballRadius + 2 - enemy.y),
        Math.abs(y - ballRadius - 2 - (enemy.y + enemyHeight))
      );
      const distXX = Math.min(
        Math.abs(x + ballRadius + 2 - box.x),
        Math.abs(x - ballRadius - 2 - (box.x + enemyWidth))
      );
      const distYY = Math.min(
        Math.abs(y + ballRadius + 2 - box.y),
        Math.abs(y -ballRadius - 2 - (box.y + enemyHeight))
      );
      const distXXX = Math.min(
        Math.abs(x + ballRadius - Boss.x),
        Math.abs(x - ballRadius - (Boss.x + bossWidth))
      );
      const distYYY = Math.min(
        Math.abs(y + ballRadius - Boss.y),
        Math.abs(y - ballRadius - (Boss.y + bossHeight))
      );
      //스킬 1중 공에 닿으면 적이 죽음 - 오류
      //오류생김  
      // const dist1 = Math.sqrt((x - enemy.x) ** 2 + (y - enemy.y) ** 2);
      // if (dist1 <= ballRadius) {
      //   enemy.life -= 1;
      //   console.log(enemy.life);
      // }
   

      if (skill2) {
        if (
          enemy.x + enemyWidth/2 >= bombStartX - bombAreaX / 2 + 5 &&
          enemy.x + enemyWidth/2 <= bombStartX + bombAreaX / 2 - 5 &&
          enemy.y + enemyHeight/2 >= bombStartY - bombAreaY / 2 + 5 &&
          enemy.y + enemyHeight/2 <= bombStartY + bombAreaY / 2 - 5
        ) {
          enemy.life -= 1;
        }
        if (
          box.x + skillBoxWidth/2 >= bombStartX - bombAreaX / 2 + 5 &&
          box.x + skillBoxWidth/2 <= bombStartX + bombAreaX / 2 - 5 &&
          box.y + skillBoxHeight/2 >= bombStartY - bombAreaY / 2 + 5 &&
          box.y + skillBoxHeight/2 <= bombStartY + bombAreaY / 2 - 5 &&
          !skill2_boxHit
        ) {
          skill2_boxHit=true;
          box.life -= 1;
        }
        if (
          Boss.x + bossWidth/2 >= bombStartX - bombAreaX / 2 + 5 &&
          Boss.x + bossWidth/2 <= bombStartX + bombAreaX / 2 - 5 &&
          Boss.y +bossHeight/2 >= bombStartY - bombAreaY / 2 + 5 &&
          Boss.y +bossHeight/2 <= bombStartY + bombAreaY / 2 - 5 &&
          !skill2_bossHit && skill2
        ) {
          skill2_bossHit = true;
          skill2=false;
          Boss.life -= 1;
          console.log(Boss.x);
          console.log("스킬 2 타격, Boss Life : " + Boss.life);
        }
      }

      if (
        enemy.life > 0 &&
        x+ballRadius+2 > enemy.x &&
        x-ballRadius-2 < enemy.x + enemyWidth &&
        y+ballRadius+2 > enemy.y &&
        y-ballRadius-2 < enemy.y + enemyHeight
      ) {
        enemy.life -= 1;
        score += 10; //직접 공으로 쳤을 때만 점수오름
        effects(1);
        if (!skill1) {
          //skill1이 발동 안됐을 때만 경로 변경
          if (distX >= distY) {
            dy = -dy;
          } else {
            dx = -dx;
          }
        }
      } else if (
        box.life > 0 &&
        x+ballRadius+2 > box.x &&
        x-ballRadius-2 < box.x + enemyWidth &&
        y+ballRadius+2 > box.y &&
        y-ballRadius-2 < box.y + enemyHeight 
      ) {
        box.life -= 1;
        effects(1);
        if (!skill1) {
          //skill1이 발동 안됐을 때만 경로 변경
          if (distXX >= distYY) {
            dy = -dy;
          } else {
            dx = -dx;
          }
        }
      } else if (
        Boss.life > 0 &&
        dist2 <= dist1 && 
        !bossHit
      ) {
        Boss.life -= 1;
        effects(0);
        bossHit=true;
        console.log("일반 타격, Boss Life : " + Boss.life + " "+ Boss.x +","+Boss.y);
        //console.log(Boss.life);
        // if(!skill1){//skill1이 발동 안됐을 때만 경로 변경
        if (distXXX >= distYYY) {
          dy = -dy;
        } else {
          dx = -dx;
        }
      }
    }
  }
}
// }

//// 적 배열 생성

const check = []; //중복확인

function pickEnemies(num) {
  const arr = [];
  for (let i = 0; i < num; i++) {
    while (true) {
      let rand = Math.floor(Math.random() * row * col);
      if (
        check.indexOf(rand) == -1 &&
        rand != 4 &&
        rand != 5 &&
        rand != 6 &&
        rand != 14 &&
        rand != 15 &&
        rand != 16 
      ) {
        arr.push(rand);
        check.push(rand);
        break;
      }
    }
  }
  return arr;
}
function pickSkill(num) {
  const sarr = [];
  for (let i = 0; i < num; i++) {
    while (true) {
      let rand = Math.floor(Math.random() * row * col);
      if (
        check.indexOf(rand) == -1 &&
        rand != 4 &&
        rand != 5 &&
        rand != 6 &&
        rand != 14 &&
        rand != 15 &&
        rand != 16 
      ) {
        sarr.push(rand);
        check.push(rand);
        break;
      }
    }
  }

  return sarr;
}

function pickBoss() {
  const barr = [];
  while (true) {
    let rand = Math.floor(Math.random() * row * col);
    if (check.indexOf(rand) == -1 && rand == 5) {
      barr.push(rand);
      check.push(rand);
      break;
    }
  }
  return barr;
}

const skillFlag = pickSkill(2);
let enemyFlag;
const bossFlag = pickBoss();
const getRand = Math.floor(Math.random() * 3);
let getEnemySrc = enemySrc[stageLevel];
const getSkillSrc = skillSrc;
let getBossSrc = enemySrc[stageLevel];
function setGameInfo() {
  enemyNum = enemyNumDefine;
  bossDead = false;
  enemyFlag = pickEnemies(enemyNum);
  for (let i = 0; i < row; i++) {
    enemies[i] = [];
    skills[i] = [];
    boss[i] = [];

    for (let j = 0; j < col; j++) {
      enemies[i][j] = {
        x: 3000,
        y: 3000,
        life: enemyLife,
        frame: Math.floor(Math.random() * 4),
        visible: enemyFlag.indexOf(j + i * col) != -1 ? 1 : 0,
      };
      skills[i][j] = {
        x: 2000,
        y: 2000,
        life: enemyLife,
        frame: 1,
        visible: skillFlag.indexOf(j + i * col) != -1 ? 1 : 0,
        down: 0, //(추가) 스킬박스 하강 구현
      };
      boss[i][j] = {
        x: 1000,
        y: 1000,
        life: bossLife * (stageLevel + 1) ,
        frame: Math.floor(Math.random() * 4),
        visible: bossFlag.indexOf(j + i * col) != -1 ? 1 : 0,
      };
    }
  }
}

enemyFrame = 0;
skillFrame = 0;
bossFrame = 0;
function drawEnemies() {
  const enemyMove = [
    { x: getEnemySrc.x + 17, y: getEnemySrc.y },
    { x: getEnemySrc.x, y: getEnemySrc.y },
    { x: getEnemySrc.x + 17, y: getEnemySrc.y },
    { x: getEnemySrc.x + 34, y: getEnemySrc.y },
  ];
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if ((j == 5 || j == 4) && (i == 0 || i == 1)) continue;
      if (enemies[i][j].life == 0 && enemies[i][j].visible == 1) {
        enemyNum -= 1;
        //console.log(enemyNum);
        enemies[i][j].life -= 1;
        continue;
      }
      if (enemies[i][j].life < 0 || enemies[i][j].visible == 0) continue;
      let y = (i + 1) * (enemyHeight + enemyMargin) + enemyOffsetTop;
      let x = j * (enemyWidth + enemyMargin) + enemyOffsetLeft;
      enemies[i][j].x = x;
      enemies[i][j].y = y;
      // ctx.beginPath();
      // ctx.rect(x, y, enemyWidth, enemyHeight);
      // enemies[i][j].life >= 3
      //   ? (ctx.fillStyle = "green")
      //   : enemies[i][j].life == 2
      //   ? (ctx.fillStyle = "yellow")
      //   : (ctx.fillStyle = "red");
      // ctx.fill();
      // ctx.closePath();

      const img = new Image();
      img.src = "./assets/characters.png";
      ctx.drawImage(
        img,
        enemyMove[(enemies[i][j].frame + frame) % 4].x,
        enemyMove[(enemies[i][j].frame + frame) % 4].y,
        16,
        16,
        x,
        y,
        enemyWidth,
        enemyHeight
      );
    }
  }
}

let skillBoxCount=0;


function drawSkillBox() {
  const BoxMove = [
    { x: getSkillSrc.x, y: getSkillSrc.y },
    { x: getSkillSrc.x, y: getSkillSrc.y },
    { x: getSkillSrc.x, y: getSkillSrc.y },
    { x: getSkillSrc.x, y: getSkillSrc.y },
  ];
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (skills[i][j].visible == 0) continue;
      if(skills[i][j].life > 0){
        let y = (i + 1) * (enemyHeight + enemyMargin) + enemyOffsetTop;
        let x = j * (enemyWidth + enemyMargin) + enemyOffsetLeft;
        skills[i][j].x = x;
        skills[i][j].y = y;
        const img = new Image();
        img.src = "./assets/characters.png";
        skillBoxWidth = enemyWidth;
        skillBoxHeight = enemyHeight;

        x = x - (-1) ** Math.floor(skillBoxCount / 100) % 2;
        y = y - (-1) ** Math.floor(skillBoxCount / 100) % 2;
        
        skillBoxWidth = skillBoxWidth + 2 * ((-1) ** Math.floor(skillBoxCount / 100) % 2);
        skillBoxHeight = skillBoxHeight + 2 * ((-1) ** Math.floor(skillBoxCount / 100) % 2);

        ctx.drawImage(
          img,
          BoxMove[(skills[i][j].frame + frame) % 4].x,
          BoxMove[(skills[i][j].frame + frame) % 4].y,
          16 ,
          16 ,
          x,
          y,
          skillBoxWidth,
          skillBoxHeight
        );
      }else if (skills[i][j].life > -3){
        
        if(skills[i][j].y<canvas.height - paddleHeight + 10){

          skills[i][j].down++;
          let y = (i + 1) * (enemyHeight + enemyMargin) + enemyOffsetTop + skills[i][j].down;
          let x = j * (enemyWidth + enemyMargin) + enemyOffsetLeft;
          skills[i][j].x = x;
          skills[i][j].y = y;

          if(
            paddleX >= x - enemyWidth  &&
            paddleX <= x + enemyWidth  &&
            canvas.height - paddleHeight >= y - enemyWidth  &&
            canvas.height - paddleHeight <= y + enemyWidth 
            ){
            if(skillNum % 2 == 0){
              get_Skill1();
              skillNum++;
            }else{
              get_Skill2();
              skillNum--;
            }
            skills[i][j].life=-5;
          }

          const img = new Image();
          img.src = "./assets/characters.png";
          ctx.drawImage(
            img,
            BoxMove[(skills[i][j].frame + frame) % 4].x-16,
            BoxMove[(skills[i][j].frame + frame) % 4].y,
            16,
            16,
            x,
            y,
            enemyWidth,
            enemyHeight
          );
        }
      }else{
        continue;
      }
    }
  }

  skillBoxCount+=1;
  
}


let bossCount=0;

let bossDead;

function drawBoss() {
  const bossMove = [
    { x: getBossSrc.x + 17, y: getBossSrc.y },
    { x: getBossSrc.x, y: getBossSrc.y },
    { x: getBossSrc.x + 17, y: getBossSrc.y },
    { x: getBossSrc.x + 34, y: getBossSrc.y },
  ];
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (boss[i][j].life == 0 && boss[i][j].visible == 1) {
        enemyNum -= 1;
        //console.log(enemyNum);
        boss[i][j].life -= 1;
        continue;
      }
      if (boss[i][j].life < 0 || boss[i][j].visible == 0) {
        bossDead = true;
        continue;
      }

      let y = (i + 1) * (enemyHeight + enemyMargin) + enemyOffsetTop;
      let x = (canvas.width - bossWidth) / 2;
      boss[i][j].x = x;
      boss[i][j].y = y;
      const img = new Image();
      let Boss=boss[i][j];
      if( (skill2_bossHit || bossHit) && bossCount<=100 ){
        img.src = "./assets/characters_negative.png";
      }else{
         bossHit=false;
         bossCount=0;
         img.src = "./assets/characters.png";
      }
      ctx.drawImage(
        img,
        bossMove[(boss[i][j].frame + frame) % 4].x,
        bossMove[(boss[i][j].frame + frame) % 4].y,
        16,
        16,
        x,
        y,
        bossWidth,
        bossHeight
      );
    }
  }
  bossCount+=1;
}

const ballList = [
  "./assets/redBall.png",
  "./assets/greenBall.png",
  "./assets/goldBall.png",
];

let ballSrc = ballList[0];
function selectBall(num) {
  ballSrc = ballList[num];
  if (num == 0) {
    document.querySelector(".redBall").classList.remove("nonBall");
    document.querySelector(".greenBall").classList.add("nonBall");
    document.querySelector(".goldBall").classList.add("nonBall");
  } else if (num == 1) {
    document.querySelector(".greenBall").classList.remove("nonBall");
    document.querySelector(".redBall").classList.add("nonBall");
    document.querySelector(".goldBall").classList.add("nonBall");
  } else if (num == 2) {
    document.querySelector(".goldBall").classList.remove("nonBall");
    document.querySelector(".redBall").classList.add("nonBall");
    document.querySelector(".greenBall").classList.add("nonBall");
  }
  effect();
}

let angle =0;

function drawBall(num) {
  // ctx.beginPath();
  // ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
  // ctx.fillStyle = "grey";
  // ctx.fill();

  ctx.save();

  ctx.translate(x,y);
  ctx.rotate(- angle * Math.PI/90);
  const img = new Image();
  img.src = ballSrc; //설정창에서 수정예정
  ctx.drawImage(
    img,
    -ballRadius,
    -ballRadius,
    ballRadius * 2,
    ballRadius * 2
  );

  ctx.restore();
  angle++
}
let frame = 0;
let characterArr = characterForward;
function drawPaddle() {
  const img = new Image();
  img.src = "./assets/characters.png";
  ctx.drawImage(
    img,
    characterArr[frame].x,
    characterArr[frame].y,
    16,
    16,
    paddleX,
    canvas.height - paddleHeight,
    paddleWidth,
    paddleHeight
  );
}

function onMouseMove(e) {
  beforeMousePosition = mousePosition;
  mousePosition = e.clientX - canvas.offsetLeft;
  if (mousePosition > 0 && mousePosition < canvas.width) {
    paddleX = mousePosition - paddleWidth / 2;
  }
  if (beforeMousePosition < mousePosition) {
    characterArr = characterRight;
  } else if (beforeMousePosition > mousePosition) {
    characterArr = characterLeft;
  }
}

function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let Boss = boss[0][5];
  if (Boss.life == 0) {
    if(stageLevel == 0){
      enemyNum = enemyNumDefine;
      document.querySelector(".canvas_container").classList.add("hide");
      document.querySelector(".win_container").classList.remove("hide");
      document.querySelector("#winSound").play();
      clearInterval(gameInterval);
      clearInterval(statusInterval);
    }else if(stageLevel == 1){
      enemyNum = enemyNumDefine;
      document.querySelector(".canvas_container").classList.add("hide");
      document.querySelector(".win_container").classList.remove("hide");
      document.querySelector("#winSound").play();
      clearInterval(gameInterval);
      clearInterval(statusInterval);
    }else{
      enemyNum = enemyNumDefine;
      document.querySelector(".canvas_container").classList.add("hide");
      document.querySelector(".win_container").classList.remove("hide");
      document.querySelector("#winSound").play();
      clearInterval(gameInterval);
      clearInterval(statusInterval);
    }
  }
  if (y + dy > canvas.height - ballRadius - 2) {
    document.querySelector(".canvas_container").classList.add("hide");
    document.querySelector(".lose_container").classList.remove("hide");
    document.querySelector("#loseSound").play();
    clearInterval(gameInterval);
    clearInterval(statusInterval);
  }
  if (
    y + dy < ballRadius - 2 ||
    y + dy > canvas.height - ballRadius - 2 ||
    (y + dy > canvas.height - ballRadius - paddleHeight &&
      x + dx + ballRadius  >= paddleX &&
      x + dx - ballRadius  <= paddleX + paddleWidth)
  ) {
    dy = -dy;
  }
  if (x + dx > canvas.width - ballRadius  || x + dx < ballRadius) {
    dx = -dx;
  }
  x += dx;
  y += dy;
  drawBack();
  drawEnemies();
  drawSkillBox();
  drawBoss();
  drawBall(0);
  drawPaddle();
  hitEnemies();
  drawHP();
  if (skill2 && imageCount < bombSrc.length - 1 && imageCount != 0) {
    drawBombEffect();
  }
}

function drawBack() {
  ctx.drawImage(Background, 0, 0, 400, 500, 0, 0, canvas.width, canvas.height);
  // ctx.drawImage(
  //   Background,
  //   0,
  //   enemyHeight,
  //   canvas.width,
  //   canvas.height - enemyHeight
  // );
}

setInterval(() => {
  frame = (frame + 1) % 4;
}, 100);

function start() {
  document.querySelector(".container").classList.add("hide");
  level();
}
let gameInterval;
let statusInterval;
function game() {
  gameInterval = setInterval(drawCanvas, 10);
  statusInterval = setInterval(drawStatus, 10);
}
const Aud = [
  "./sound/Pokemon - Black and White Music - Rival Battle .mp3",
  "./sound/Pokemon - Heart Gold and Soul Silver - Route 27.mp3",
  "./sound/Pokemon Battle Revolution - Title Screen.mp3",
];

const effectSound = [
  "./sound/attackBoss.mp3",
  "./sound/attackEnemy.mp3",
  "./sound/skillGet.wav",
  "./sound/skill1.mp3"
];

function effects(num){
  var audio = new Audio(effectSound[num]);
  audio.play();
  //console.log(1);
}

function playAudio(num) {
  stopAudio((num + 1) % 3);
  stopAudio((num + 2) % 3);
  document.getElementById("sound" + num).play();
}
function stopAudio(num) {
  document.getElementById("sound" + num).pause();
  document.getElementById("sound" + num).currentTime = 0;
}
function setting() {
  document.querySelector(".container").classList.add("hide");
  document.querySelector(".settingContainer").classList.remove("hide");
  document.getElementById("goSound").play();
}
function go() {
  document.querySelector(".settingContainer").classList.add("hide");
  document.querySelector(".container").classList.remove("hide");
  document.getElementById("goSound").play();
}
function go2(){
  document.getElementById("goSound").play();
}
function effect() {
  document.getElementById("selectSound").pause();
  document.getElementById("selectSound").currentTime = 0;
  document.getElementById("selectSound").play();
}
document.addEventListener("mousemove", onMouseMove, false);

let now_intro_dialog;
let now_dlgaud;
function intro() {
  document.querySelector(".container").classList.add("hide");
  document.querySelector(".intro_container").classList.remove("hide");
  now_intro_dialog = document.querySelector(".intro_dialog");
  now_intro_dialog.classList.remove("hide");
  now_dlgaud = document.querySelector("#dlg1");
  now_dlgaud.play();
}
function intro_skip() {
  document.querySelector(".intro_container").classList.add("hide");
  document.querySelector(".container").classList.remove("hide");
}
function intro_next() {
  now_intro_dialog.classList.add("hide");
  now_intro_dialog = now_intro_dialog.nextElementSibling;
  now_dlgaud = now_dlgaud.nextElementSibling;
  if (now_intro_dialog.classList.contains("intro_dialog")) {
    now_intro_dialog.classList.remove("hide");
    now_dlgaud.play();
  } else {
    now_intro_dialog = document.querySelector(".intro_dialog");
    now_dlgaud = document.querySelector("#dlg1");
    document.querySelector(".intro_container").classList.add("hide");
    document.querySelector(".container").classList.remove("hide");
  }
}
function level() {
  //레벨 선택창 생성
  document.querySelector(".level_container").classList.remove("hide");
}
function select(num) {
  //레벨 선택 후 게임 시작
  document.querySelector(".level_container").classList.add("hide");
  document.querySelector(".canvas_container").classList.remove("hide");
  document.getElementById("goSound").play();

  if (num == 0) {
    dx = 1;
    dy = -1;
    stageLevel = 0;
    getEnemySrc = enemySrc[stageLevel];
    getBossSrc = enemySrc[stageLevel];
    // Boss.life = 5 * (stageLevel + 1);
    enemyNumDefine = 5;
  } else if (num == 1) {
    dx = 2;
    dy = -2;
    stageLevel = 1;
    getEnemySrc = enemySrc[stageLevel];
    getBossSrc = enemySrc[stageLevel];
    // Boss.life = 5 * (stageLevel + 1);
    enemyNumDefine = 10;
  } else if (num == 2) {
    dx = 3;
    dy = -3;
    stageLevel = 2;
    getEnemySrc = enemySrc[stageLevel];
    getBossSrc = enemySrc[stageLevel];
    // Boss.life = 5 * (stageLevel + 1);
    enemyNumDefine = 15;
  }
  setGameInfo();
  game();
}

function reload() {
  document.location.reload();
}

function drawStatus() {
  st.clearRect(0, 0, stat.width, stat.height);
  // drawJiuBattle();
  drawField();
  drawBossBattle();
  drawBossHP();
  drawSkillIcon();
  //drawProgressBar();
  drawScore();
}

function drawField() {
  const img = new Image();
  img.src = "./assets/field.jpg";
  st.drawImage(img, 0, 0, stat.width, stat.height);
}
function drawBossHP() {
  // st.strokeStyle = "black";
  // st.strokeRect(10,30,100,80);
  // st.strokeStyle = "black";
  // st.strokeRect(7,27,106,86);
  st.fillStyle = "black";
  st.font = "italic bold 15px Arial, sans-serif";
  st.strokeText("BOSS:", 15, 50);
  st.font = "italic 10px Arial, sans-serif";
  st.strokeText("L", 70, 50);
  st.font = "italic 15px Arial, sans-serif";
  st.strokeText("100", 75, 50);
  const img = new Image();
  img.src = "./assets/BossHP.jpg";
  st.drawImage(img, 15, 65, 20, 20);
  let Boss = boss[0][5];
  if (Boss.life / (5 * (stageLevel + 1)) == 1) {
    st.fillStyle = "green";
    st.fillRect(36, 65, 70 * (bossHP_Bar/bossHP_toalBar), 20);
    st.strokeText(Boss.life+" / "+(5 * (stageLevel + 1)), 65, 105);
    st.fillStyle = "black";
    st.font = "italic bold 20px Arial, sans-serif";
    st.fillText("보스(이)가", 20, 410);
    st.fillText("승부를 걸어왔다!", 20, 440);
  } else if (Boss.life / (5 * (stageLevel + 1)) > 0.66) {
    st.fillStyle = "green";
    st.fillRect(36, 65, 70 * (bossHP_Bar/bossHP_toalBar), 20);
    st.strokeText(Boss.life+" / "+(5 * (stageLevel + 1)), 65, 105);
    st.fillStyle = "black";
    st.font = "italic bold 20px Arial, sans-serif";
    st.fillText("효과가 미미했다...", 20, 410);
    st.fillText("보스 HP : " + Boss.life, 20, 440);
  } else if (Boss.life / (5 * (stageLevel + 1)) > 0.33) {
    st.fillStyle = "yellow";
    st.fillRect(36, 65, 70 * (bossHP_Bar/bossHP_toalBar), 20);
    st.font = "italic bold 20px Arial, sans-serif";
    st.strokeText(Boss.life+" / "+(5 * (stageLevel + 1)), 65, 105);
    st.fillStyle = "black";
    st.fillText("효과가 굉장했다!", 20, 410);
    st.fillText("보스 HP : " + Boss.life, 20, 440);
  } else if (Boss.life / (5 * (stageLevel + 1)) > 0.10) {
    st.fillStyle = "red";
    st.fillRect(36, 65, 70 * (bossHP_Bar/bossHP_toalBar), 20);
    st.font = "italic bold 20px Arial, sans-serif";
    st.strokeText(Boss.life+" / "+(5 * (stageLevel + 1)), 65, 105);
    st.fillStyle = "black";
    st.fillText("오..끝이 보인다..!", 20, 410);
    st.fillText("보스 HP : " + Boss.life, 20, 440);
  } else if (Boss.life / (5 * (stageLevel + 1)) > 0) {
    st.fillStyle = "red";
    st.fillRect(36, 65, 70 * (bossHP_Bar/bossHP_toalBar), 20);
    st.font = "italic bold 20px Arial, sans-serif";
    st.strokeText(Boss.life+" / "+(5 * (stageLevel + 1)), 65, 105);
    st.fillStyle = "black";
    st.fillText("보스가 비틀거린다!", 20, 410);
    st.fillText("보스 HP : " + Boss.life, 20, 440);
  } else if(Boss.life < 0){
    st.font = "italic bold 20px Arial, sans-serif";
    st.fillText("보스를 물리쳤다!", 20, 410);
    st.fillText("부하들도 처리하자!", 20, 440);
  }
}

const icon1X = 23;
const icon1Y = stat.height - 195;
const icon2X = 55;
const icon2Y = stat.height - 200;
let score = 0;
function drawSkillIcon() {
  if (!getSkill1) {
    icon1.src = "./assets/icon1_off.png";
  } else {
    icon1.src = "./assets/redBall.png";
  }
  if (!getSkill2) {
    icon2.src = "./assets/폭탄2.png";
    st.drawImage(icon2, icon2X, icon2Y, 38, 38);
  } else {
    icon2.src = "./assets/폭탄.png";
    st.drawImage(icon2, icon2X, icon2Y, 38, 38);
  }
  st.drawImage(icon1, icon1X, icon1Y, 30, 30);
}

function drawProgressBar() {
  st.fillStyle = "yellow";
  st.fillRect(icon1X - 5, icon1Y + 33, skillBarTotal1 - 5, 5);

  st.fillStyle = "green";
  st.fillRect(icon1X - 5, icon1Y + 33, skillBar1 - 5, 5);

  st.fillStyle = "yellow";
  st.fillRect(icon2X + 2, icon2Y + 38, skillBarTotal2 - 5, 5);

  st.fillStyle = "green";
  st.fillRect(icon2X + 2, icon2Y + 38, skillBar2 - 5, 5);
}

function drawBossBattle() {
  let Boss=boss[0][5];
  const bossMove = [
    { x: getBossSrc.x, y: getBossSrc.y },
    { x: getBossSrc.x + 17, y: getBossSrc.y },
    { x: getBossSrc.x, y: getBossSrc.y },
    { x: getBossSrc.x + 34, y: getBossSrc.y },
  ];
  const img = new Image();
  if(Boss.life <= 0) {
    img.src="";
  }else if(skill2_bossHit || bossHit){
    img.src = "./assets/characters_negative.png";
  }else{
    img.src = "./assets/characters.png";
  }
  st.drawImage(
    img,
    bossMove[(boss[0][5].frame + frame) % 4].x,
    bossMove[(boss[0][5].frame + frame) % 4].y,
    16,
    16,
    stat.width - 82,
    146,
    60,
    60
  );
}

function drawScore(){
  st.font = "italic bold 20px Impact, Charocal, sans-serif";
  st.fillStyle = "black";
  st.fillText("SCORE : "+score, 10, 30);
} 


let now_enddlg;
let now_enddlg_aud;
function ending() {
  document.querySelector(".win_container").classList.add("hide");
  if(stageLevel == 0 ){
    document.querySelector(".end_container2").classList.remove("hide");
    now_enddlg = document.querySelector(".ending_dialog2");
    now_enddlg_aud = document.querySelector(".enddlg_aud2");
    now_enddlg.classList.remove("hide");
    now_enddlg_aud.play();
  }else if(stageLevel == 1){
    document.querySelector(".end_container3").classList.remove("hide");
    now_enddlg = document.querySelector(".ending_dialog3");
    now_enddlg_aud = document.querySelector(".enddlg_aud3");
    now_enddlg.classList.remove("hide");
    now_enddlg_aud.play();
  }else{
    document.querySelector(".end_container").classList.remove("hide");
    now_enddlg = document.querySelector(".ending_dialog");
    now_enddlg_aud = document.querySelector(".enddlg_aud");
    now_enddlg.classList.remove("hide");
    now_enddlg_aud.play();
  }
}
function ending_next() {
  now_enddlg.classList.add("hide");
  now_enddlg = now_enddlg.nextElementSibling;
  now_enddlg_aud = now_enddlg_aud.nextElementSibling;
  if(stageLevel == 1){
    if (now_enddlg.classList.contains("ending_dialog3")) {
      now_enddlg.classList.remove("hide");
      now_enddlg_aud.play();
    } else {
      document.querySelector(".end_container3").classList.add("hide");
      ending_skip();
    } 
  }else if(stageLevel == 0){
    if (now_enddlg.classList.contains("ending_dialog2")) {
      now_enddlg.classList.remove("hide");
      now_enddlg_aud.play();
    } else {
      document.querySelector(".end_container2").classList.add("hide");
      ending_skip();
    } 
  }else{
    if (now_enddlg.classList.contains("ending_dialog")) {
      now_enddlg.classList.remove("hide");
      now_enddlg_aud.play();
    } else {
      document.querySelector(".end_button_container").classList.add("hide");
      let img = document.querySelector(".end_img");
      img.classList.add("hide");
      img = document.querySelector(".village_img");
      unfade(img);
    } 
  }
}
function ending_skip() {
  if(stageLevel == 2){
    document.location.reload();
  }else if(stageLevel == 0){
    document.querySelector(".level_container").classList.add("hide");
    document.querySelector(".canvas_container").classList.remove("hide");
    document.getElementById("goSound").play();
    score = 0;
    bossHP_Bar = 100;
    x = canvas.width / 2;
    y = canvas.height - paddleHeight - 10;
    ballRadius = 8;
    dx = 2;
    dy = -2;
    stageLevel = 1;
    getEnemySrc = enemySrc[stageLevel];
    getBossSrc = enemySrc[stageLevel];
    // Boss.life = 5 * (stageLevel + 1);
    enemyNumDefine = 10;
    drawCanvas();
    setGameInfo();
    game();

  }else if (stageLevel ==1){
    document.querySelector(".level_container").classList.add("hide");
    document.querySelector(".canvas_container").classList.remove("hide");
    document.getElementById("goSound").play();
    score = 0;
    bossHP_Bar = 100;
    x = canvas.width / 2;
    y = canvas.height - paddleHeight - 10;
    ballRadius = 8;
    dx = 3;
    dy = -3;
    stageLevel = 2;
    getEnemySrc = enemySrc[stageLevel];
    getBossSrc = enemySrc[stageLevel];
    // Boss.life = 5 * (stageLevel + 1);
    enemyNumDefine = 10;
    drawCanvas();
    setGameInfo();
    game();
  }
}
function guide() {
  document.querySelector(".container").classList.add("hide");
  document.querySelector(".guide_container").classList.remove("hide");
}
function guide_hide() {
  document.querySelector(".guide_container").classList.add("hide");
  document.querySelector(".container").classList.remove("hide");
}
function fade(element) {
  var op = 1;  // initial opacity
  var timer = setInterval(function () {
      if (op <= 0.1){
          clearInterval(timer);
          element.style.display = 'none';
      }
      element.style.opacity = op;
      element.style.filter = 'alpha(opacity=' + op * 100 + ")";
      op -= op * 0.1;
  }, 50);
}
function unfade(element) {
  var op = 0.1;  // initial opacity
  element.style.display = 'block';
  var timer = setInterval(function () {
      if (op >= 1){
          clearInterval(timer);
      }
      element.style.opacity = op;
      element.style.filter = 'alpha(opacity=' + op * 100 + ")";
      op += op * 0.1;
  }, 10);

}