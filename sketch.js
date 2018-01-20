var yvel;
var obstacles = [];
var speed;
var onGround;
var y;
var mic;
var vol;
var scorenum;
var Hscore;
var game;
var collision;
var jump;

function setup() {
  collision = new Audio('Sound/collision.mp3');
  jump = new Audio('Sound/jump.mp3');
  var c = createCanvas(800, 220);
  c.position(370, 250);
  mic = new p5.AudioIn();
  mic.start();
  yvel = 0;
  speed = 5;
  onGround = true;
  y = 150;
  scorenum = 0;
  Hscore = 0;
  game = true;
}

function draw() {
    background(255, 229, 86);
    score();
    vol = mic.getLevel();
    if(frameCount % 180 == 0) speed *= 1.05;
    generateObs();
    stroke(0);
    line(0, 175, windowWidth, 175);
    fill(0);
    ellipse(150, y, 50);
    updateobs();
    control();
}

function score() {
  if (frameCount % 10 == 0) scorenum ++;
  var score = 'Score - ' + scorenum;
  textSize(15);
  fill(0);
  textAlign(CENTER);
  nameWidht = textWidth(score);
  text(score, 400, 20);
  var Highscore = 'Highscore - ' + Hscore;
  textSize(15);
  fill(0);
  textAlign(CENTER);
  nameWidht = textWidth(score);
  text(Highscore, 720, 20);
}

function generateObs() {
    if (frameCount % 40 == 0){
      if (random(0, 1) > 0.5)
        newObs();
    }
}

function updateobs() {
  for (var i = obstacles.length - 1; i >= 0; i --){

    obstacles[i].x -= speed;
    var x = obstacles[i].x;
    var size = obstacles[i].size;
      if (obstacles[i].x > -25){
          //can be seen
          rect(x, 175 - size, size, size);
          var xdis = x + size/2 ;
          var ydis = 175 - size/2 ;
          if (dist(xdis, ydis, 150, y) <= size/2 + 25){
            GameOver();
          }
      }
      else {
        //remove the obs
        obstacles.splice(i, 1);
      }
  }
}

function GameOver() {
  noLoop();
  collision.play();
  textSize(40);
  Hscore = max(Hscore, scorenum);
  text("Game Over :(", 400, 80);
  textSize(15);
  text("press enter for new game", 400, 105);
  game = false;
  scorenum = 0;
}

 function newObs() {
   var size = random(20, 70);
   var O = new Obs(size);
   obstacles.push(O);
 }

function keyPressed() {
  if (keyCode == ENTER && !game){
    obstacles = [];
    game  = true;
    speed = 5;
    loop();
  }
}

function control() {
  if(y + 25 < 175){
    yvel += 1;
    onGround = false;
  }
  else {
    yvel = 0;
    onGround = true;
  }
  if (vol > 0.1 || mouseIsPressed || keyIsDown(UP_ARROW) || keyIsDown(87) || keyIsDown(32)){
      if (onGround){
        yvel -= 15;
        onGround = false;
        jump.play();
        }
    }
  y += yvel;
}
