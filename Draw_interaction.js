// ----=  HANDS  =----
let bgImage
let fireSize
let stars=[],hearts=[],fireworks=[],myColors=[]
let firstRun=true
const numStars=300
let midx=CaptureWidth/2
let midy=CaptureHeight/2
let gravity=0.25
let numHearts=300
let firstRunHearts=true

function prepareInteraction() {
  //bgImage = loadImage('/images/background.png');
}

function drawInteraction(faces, hands) {
  let c1=color(154,122,204,150)
  let c2=color(204,122,131,131)
  let c3=color(122,131,204,120)
  let c4=color(151,209,145,180)
  let c5=color(155,210,146,80)
  let c6=color(220,209,131,160)
  let c7=color(159,226,245,200)
  let c8=color(122,131,204,180)
  let c9=color(231,244,78,200)
  myColors=[c1,c2,c3,c4,c5,c6,c7,c8,c9];
  // hands part
  // USING THE GESTURE DETECTORS (check their values in the debug menu)
  // detectHandGesture(hand) returns "Pinch", "Peace", "Thumbs Up", "Pointing", "Open Palm", or "Fist"
let LH=hands.find(hand=>hand.handedness==="Left");
let RH=hands.find(hand=>hand.handedness==="Right");
let L_indexFingerTipX, L_indexFingerTipY, L_pinkyTipX, L_pinkyTipY,L_ringFingerTipX,L_ringFingerTipY,L_middleFingerTipX,L_middleFingerTipY,L_thumbTipX,L_thumbTipY;
let L_middleFingerMcpX,L_middleFingerMcpY,L_indexFingerMcpX,L_indexFingerMcpY,L_ringFingerMcpX,L_ringFingerMcpY;
let R_indexFingerTipX, R_indexFingerTipY, R_pinkyTipX, R_pinkyTipY,R_ringFingerTipX,R_ringFingerTipY,R_middleFingerTipX,R_middleFingerTipY,R_thumbTipX,R_thumbTipY;
let R_middleFingerMcpX,R_middleFingerMcpY,R_indexFingerMcpX,R_indexFingerMcpY,R_ringFingerMcpX,R_ringFingerMcpY;

  // for loop to capture if there is more than one hand on the screen. This applies the same process to all hands.
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    if (showKeypoints) {
      drawPoints(hand)
      drawConnections(hand)
    }
    // console.log(hand);
    // let indexFingerTipX = hand.index_finger_tip.x;
    // let indexFingerTipY = hand.index_finger_tip.y;
   
    let middleFingerMcpX = hand.middle_finger_mcp.x;
    let middleFingerMcpY = hand.middle_finger_mcp.y;
 
    /*
    Start drawing on the hands here
    */
   //set up left hand variables
if(LH){
  L_indexFingerTipX=LH.index_finger_tip.x
  L_indexFingerTipY=LH.index_finger_tip.y
  L_ringFingerTipX = LH.ring_finger_tip.x;
  L_ringFingerTipY = LH.ring_finger_tip.y;
  L_pinkyTipX=LH.pinky_finger_tip.x
  L_pinkyTipY=LH.pinky_finger_tip.y
  L_thumbTipX=LH.thumb_tip.x
  L_thumbTipY=LH.thumb_tip.y
  L_middleFingerTipX=LH.middle_finger_tip.x
  L_middleFingerTipY=LH.middle_finger_tip.y
  L_middleFingerMcpX = LH.middle_finger_mcp.x;
  L_middleFingerMcpY = LH.middle_finger_mcp.y;
  L_indexFingerMcpX = LH.index_finger_mcp.x;
  L_indexFingerMcpY = LH.index_finger_mcp.y;
  L_ringFingerMcpX = LH.ring_finger_mcp.x;
  L_ringFingerMcpY = LH.ring_finger_mcp.y;
}
//set up right hand variables
if(RH){
  R_indexFingerTipX=RH.index_finger_tip.x
  R_indexFingerTipY=RH.index_finger_tip.y
  R_ringFingerTipX = RH.ring_finger_tip.x;
  R_ringFingerTipY = RH.ring_finger_tip.y;
  R_pinkyTipX=RH.pinky_finger_tip.x
  R_pinkyTipY=RH.pinky_finger_tip.y
  R_thumbTipX=RH.thumb_tip.x
  R_thumbTipY=RH.thumb_tip.y
  R_middleFingerTipX=RH.middle_finger_tip.x
  R_middleFingerTipY=RH.middle_finger_tip.y
  R_middleFingerMcpX = RH.middle_finger_mcp.x;
  R_middleFingerMcpY = RH.middle_finger_mcp.y;
  R_indexFingerMcpX = RH.index_finger_mcp.x;
  R_indexFingerMcpY = RH.index_finger_mcp.y;
  R_ringFingerMcpX = RH.ring_finger_mcp.x;
  R_ringFingerMcpY = RH.ring_finger_mcp.y;
}
   let whatGesture = detectHandGesture(hand)
   fireSize=map(dist(L_middleFingerMcpX,L_middleFingerMcpY,R_middleFingerMcpX,R_middleFingerMcpY),0,1000,50,800)
   let handMidX=L_middleFingerMcpX+dist(L_middleFingerMcpX,L_middleFingerMcpY,R_middleFingerMcpX,R_middleFingerMcpY)/2
   let eyeOffset=0.4*fireSize
   let eyeSize=fireSize*map(fireSize,50,800,0.05,0.15)
   let fireEyePosX=handMidX-eyeOffset/2
   let fireEyePosY=middleFingerMcpY-fireSize*0.2
   let mouthSize=map(fireSize,50,800,10,100)
  if(LH && RH){
  let indexTouch=areTheseTouching(L_middleFingerTipX,L_middleFingerTipY,R_middleFingerTipX,R_middleFingerTipY,50)
  let thumbIndexTouchLeft=areTheseTouching(L_middleFingerTipX,L_middleFingerTipY,L_thumbTipX,L_thumbTipY)
  let thumbIndexTouchRight=areTheseTouching(R_middleFingerTipX,R_middleFingerTipY,R_thumbTipX,R_thumbTipY)
  if (indexTouch){
    drawLightning(L_indexFingerMcpX,R_indexFingerMcpX,L_indexFingerMcpY,220, random(0,80), 90)
    drawLightning(L_middleFingerMcpX,R_middleFingerMcpX,R_middleFingerMcpY,60, random(0,40), 100)
    drawLightning(L_ringFingerMcpX,R_ringFingerMcpX,R_ringFingerMcpY,280, random(0,50), 90)
  }
  else if(thumbIndexTouchLeft&&thumbIndexTouchRight){
    drawLightning(L_indexFingerTipX,R_indexFingerTipX,L_indexFingerTipY,200, random(0,80), 90)
    drawLightning(L_ringFingerTipX,R_ringFingerTipX,R_ringFingerTipY,190, random(0,40), 100)
    drawLightning(L_pinkyTipX,R_pinkyTipX,R_pinkyTipY,180, random(0,50), 90)
  }
  
  else if (whatGesture == "Fist"){

    drawFire(handMidX,R_middleFingerMcpY+100,fireSize,color(82, 180, 222,100),color(158, 209, 247,100))//blue
  //fireEmo
    drawFireEmo(4,fireEyePosX,fireEyePosY,eyeOffset,eyeSize,mouthSize)
  }
  else if (whatGesture=="Pinch"){
    drawFire(handMidX,R_middleFingerMcpY+100,fireSize,color(116, 237, 97,100),color(118, 245, 7,100))//green
    drawFireEmo(1,fireEyePosX,fireEyePosY,eyeOffset,eyeSize,mouthSize)
    drawRains(1000)
  }
  else if (whatGesture=="Thumbs Up"){
    drawFire(handMidX,R_middleFingerMcpY+100,fireSize,color(245, 86, 7,100),color(247, 243, 104,100))//red
    drawFireEmo(2,fireEyePosX,fireEyePosY,eyeOffset,eyeSize,mouthSize)
  }
  else if (whatGesture=="Open Palm"){
    drawFire(handMidX,R_middleFingerMcpY+100,fireSize,color(247, 104, 180,100),color(247, 114, 223,100))//red pink
    drawFireEmo(3,fireEyePosX,fireEyePosY,eyeOffset,eyeSize,mouthSize)
  } 
  else if (whatGesture=="Peace"){
    drawFireworks()
  } 
  else{
  push()
  colorMode(HSB)
  let h = map(fireSize, 50, 800, 50, 10);  
  let s = map(fireSize, 50, 800, 80, 100);  
  let b = map(fireSize, 50, 800, 100, 70);  
  let outsideColor = color(h-5, s, b,0.6);
  let insideColor = color(h+5, s - 20, b + 20);
  drawFire(handMidX,R_middleFingerMcpY+100,fireSize,outsideColor,insideColor)
  drawFireEmo(0,fireEyePosX,fireEyePosY,eyeOffset,eyeSize,mouthSize)
   
  pop()  
 }
 }}

    /*
    Stop drawing on the hands here
    */
  

  //------------------------------------------------------------
  //facePart
  // for loop to capture if there is more than one face on the screen. This applies the same process to all faces. 
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i]; // face holds all the keypoints of the face
     console.log(face);
     if (showKeypoints) {
      drawPoints(face)
    }
   
    /*
    Once this program has a face, it knows some things about it.
    This includes how to draw a box around the face, and an oval. 
    It also knows where the key points of the following parts are:
     face.leftEye
     face.leftEyebrow
     face.lips
     face.rightEye
     face.rightEyebrow
    */

    /*
    Start drawing on the face here
    */
    let leftEyeCenterX = face.leftEye.centerX;
    let leftEyeCenterY = face.leftEye.centerY;
    let rightEyeCenterX = face.rightEye.centerX;
    let rightEyeCenterY = face.rightEye.centerY;
    let rotateAmount
    let dy=leftEyeCenterY-rightEyeCenterY
    let dx=leftEyeCenterX-rightEyeCenterX
    let lipsHeight = face.lips.height;
    let rightEyeHeight = face.rightEye.height;
    let leftEyeHeight = face.leftEye.height; 
    let lipsWidth = face.lips.width;
    let faceCenterX = face.faceOval.centerX;
    let faceCenterY = face.faceOval.centerY;
    let faceWidth = face.faceOval.width;
  //console.log(lipsHeight)
    //face central
    drawFlowers(faceCenterX,faceCenterY,50,map(lipsWidth,145,190,5,10))
    push()
    angleMode(RADIANS)
    rotateAmount=Math.atan2(dy,dx)
    translate(faceCenterX,faceCenterY)
    rotate(rotateAmount)
    drawLines(0,0,faceWidth*0.8)
    drawLines(0,0,-faceWidth*0.8)
    pop()
    //left eye
    //drawFlowers(leftEyeCenterX,leftEyeCenterY,50,map(leftEyeHeight,5,19,4,12))
    //right eye
    //drawFlowers(rightEyeCenterX,rightEyeCenterY,50,map(rightEyeHeight,5,19,4,12))
    //background
    if (lipsHeight>50){
      drawBackStars(lipsHeight)
    }
    if(leftEyeHeight<20||rightEyeHeight<20){
          drawBackHearts(lipsWidth)

    }
   
    //console.log(face.leftEye)

    /*
    Stop drawing on the face here
    */

  }
  //------------------------------------------------------
  // You can make addtional elements here, but keep the face drawing inside the for loop. 


}
function pinchCircle(hand) { // adapted from https://editor.p5js.org/ml5/sketches/DNbSiIYKB
  // Find the index finger tip and thumb tip
  let finger = hand.index_finger_tip;
  //let finger = hand.pinky_finger_tip;
  let thumb = hand.thumb_tip;

  // Draw circles at finger positions
  let centerX = (finger.x + thumb.x) / 2;
  let centerY = (finger.y + thumb.y) / 2;
  // Calculate the pinch "distance" between finger and thumb
  let pinch = dist(finger.x, finger.y, thumb.x, thumb.y);

  // This circle's size is controlled by a "pinch" gesture
  fill(0, 255, 0, 200);
  stroke(0);
  strokeWeight(2);
  circle(centerX, centerY, pinch);

}
function drawFire(firePosx, firePosy, fireSize, outsideColor, insideColor) {
  push();
  translate(firePosx, firePosy);
  noStroke();
  colorMode(HSB);
  let t=millis()*0.003
  let flickerX = sin(t*random(1.2,2.2)) * map(fireSize, 50, 800, 8, 40);
  let flickerY = cos(t*random(1.5,2.8)) * map(fireSize, 50, 800, 5, 25);
  let factorS = 1+sin(t*3+random(-0.3,0.3)) * 0.15
  let flicker=random(-0.08,0.08)
  translate(flickerX, flickerY)
  scale(factorS+flicker)
  beginShape();
  fill(insideColor);
  vertex(0, 0);
  bezierVertex(
    -0.4 * fireSize, 0.1 * fireSize,
    -0.2 * fireSize, -0.2 * fireSize,
    0, -0.5 * fireSize
  );
  bezierVertex(
    0.4 * fireSize, 0.1 * fireSize,
    0.2 * fireSize, 0,
    0, 0
  );
  endShape();

  fill(outsideColor);
  beginShape();
  vertex(0, 0.1 * fireSize);
  quadraticVertex(-0.5 * fireSize, 0.1 * fireSize, -0.4 * fireSize, -0.35 * fireSize);
  quadraticVertex(-0.25 * fireSize, -0.2 * fireSize, 0, -0.8 * fireSize);
  quadraticVertex(0.25 * fireSize, -0.35 * fireSize, 0.3 * fireSize, -0.45 * fireSize);
  quadraticVertex(0.3 * fireSize, -0.1 * fireSize, 0.4 * fireSize, -0.25 * fireSize);
  quadraticVertex(0.4 * fireSize, 0.1 * fireSize, 0, 0.1 * fireSize);
  endShape();

  pop();

}
function drawFlowers(flowerPosx,flowerPosy,flowerSize,petalNum){
let flowerColor=[color(211, 148, 227,100),//pink
  color(197, 177, 252,60),//purple
  color(247, 123, 104,60),//red
  color(238, 250, 170,60)//yellow
]

let randomColor=random(flowerColor) 


push()

translate(flowerPosx,flowerPosy)
angleMode(DEGREES)
stroke(randomColor)
fill(randomColor)
for(i=0;i<petalNum;i++){
  ellipse(0,0,flowerSize,flowerSize/3)
  rotate(360/petalNum)
  ellipse(0,0,flowerSize/3,flowerSize/3)

}
pop()

}
function drawRains(rainCount){
  stroke(180, 220, 255, 100); 
  strokeWeight(2);
  for (let i = 0; i < rainCount; i++) {
        let x = random(midx*2);
        let y = random(midy*2);
        line(x, y, x + 5, y + 15);
            }
}
function drawLightning(LX,RX,yBase, hue, sat, bri){
  push();
  colorMode(HSB);
  noFill()
  stroke(hue, sat, bri);
  strokeWeight(random(0.8,8));

  beginShape();
  for (let x = LX; x <= RX; x += 10) {
    let y = yBase + sin(x * random(0.3,0.5) + frameCount * 0.02)*random(1,20);
    vertex(x, y);
  }
  endShape();
  pop();
}
function areTheseTouching(x1, y1, x2, y2, threshhold) {

  let d = dist(x1, y1, x2, y2)
  if (d < threshhold) {
    return true;

  } else {
    return false;
  }
}
function drawConnections(hand) {
  // Draw the skeletal connections
  push()
  for (let j = 0; j < connections.length; j++) {
    let pointAIndex = connections[j][0];
    let pointBIndex = connections[j][1];
    let pointA = hand.keypoints[pointAIndex];
    let pointB = hand.keypoints[pointBIndex];
    stroke(255, 0, 0);
    strokeWeight(2);
    line(pointA.x, pointA.y, pointB.x, pointB.y);
  }
  pop()
}
// This function draw's a dot on all the keypoints. It can be passed a whole face, or part of one. 
function drawPoints(feature) {

  push()
  for (let i = 0; i < feature.keypoints.length; i++) {
    let element = feature.keypoints[i];
    noStroke();
    fill(0, 255, 0);
    circle(element.x, element.y, 5);
  }
  pop()

}
function drawFireEmo(k,fireEyePosX,fireEyePosY,eyeOffset,eyeSize,mouthSize){
  //surprise
  if (k===0){
  push()
  noStroke()
  fill(0)  
  ellipse(fireEyePosX,fireEyePosY,eyeSize,eyeSize*1.2)
  ellipse(fireEyePosX+eyeOffset,fireEyePosY,eyeSize,eyeSize*1.2) 
  noFill()
  stroke(0)
  strokeWeight(4)
  ellipse(fireEyePosX+eyeOffset/2,fireEyePosY+0.5*eyeOffset,mouthSize,mouthSize/2)
  pop()
  }
  //scared(close eyes), raining 
  if(k===1){
  push()  
  noFill()
  stroke(0)
  strokeWeight(4)
  //left eye
  line(fireEyePosX-eyeOffset*0.1,fireEyePosY,fireEyePosX+eyeOffset*0.1,fireEyePosY+eyeOffset*0.2)
  line(fireEyePosX+eyeOffset*0.1,fireEyePosY+eyeOffset*0.2,fireEyePosX-eyeOffset*0.1,fireEyePosY+eyeOffset*0.3)
  //right eye
  line(fireEyePosX+0.9*eyeOffset,fireEyePosY,fireEyePosX+eyeOffset*1.1,fireEyePosY+eyeOffset*0.2)
  line(fireEyePosX+eyeOffset*1.1,fireEyePosY+eyeOffset*0.2,fireEyePosX+eyeOffset*0.9,fireEyePosY+eyeOffset*0.3)
  //mouth
  line(fireEyePosX+0.3*eyeOffset,fireEyePosY+eyeOffset*0.8,fireEyePosX+0.8*eyeOffset,fireEyePosY+eyeOffset*0.8)
  pop()
  }
  //shy
  if(k===2){
  push()
  noStroke()
  fill(0,160)  
  ellipse(fireEyePosX+0.2*eyeOffset,fireEyePosY,eyeSize,eyeSize)
  ellipse(fireEyePosX+eyeOffset,fireEyePosY,eyeSize,eyeSize)
  stroke(247, 126, 201,120)
  strokeWeight(4)
  noFill()
  beginShape()
  vertex(fireEyePosX-0.1*eyeOffset,fireEyePosY+0.4*eyeOffset)
  vertex(fireEyePosX,fireEyePosY+0.3*eyeOffset)
  vertex(fireEyePosX+0.1*eyeOffset,fireEyePosY+0.4*eyeOffset)
  vertex(fireEyePosX+0.2*eyeOffset,fireEyePosY+0.3*eyeOffset)
  vertex(fireEyePosX+0.3*eyeOffset,fireEyePosY+0.4*eyeOffset)
  vertex(fireEyePosX+0.4*eyeOffset,fireEyePosY+0.3*eyeOffset)
  vertex(fireEyePosX+0.5*eyeOffset,fireEyePosY+0.4*eyeOffset)
  endShape()
  beginShape()
  vertex(fireEyePosX+0.7*eyeOffset,fireEyePosY+0.4*eyeOffset)
  vertex(fireEyePosX+0.8*eyeOffset,fireEyePosY+0.3*eyeOffset)
  vertex(fireEyePosX+0.9*eyeOffset,fireEyePosY+0.4*eyeOffset)
  vertex(fireEyePosX+1*eyeOffset,fireEyePosY+0.3*eyeOffset)
  vertex(fireEyePosX+1.1*eyeOffset,fireEyePosY+0.4*eyeOffset)
  vertex(fireEyePosX+1.2*eyeOffset,fireEyePosY+0.3*eyeOffset)
  vertex(fireEyePosX+1.3*eyeOffset,fireEyePosY+0.4*eyeOffset)
  endShape()
  pop()
  }
  //love, background hearts coming out
  if(k===3){
    push()
    stroke(250, 130, 226)
    strokeWeight(6)
    noFill()
    push()
    translate(fireEyePosX+0.1*eyeOffset,fireEyePosY+0.2*eyeOffset)
    beginShape()
    vertex(0,-eyeSize*0.8);
    bezierVertex(eyeSize,-eyeSize*1.5,eyeSize*1.5,0,0,eyeSize*1.2)
    bezierVertex(-eyeSize * 1.5, 0,-eyeSize, -eyeSize * 1.5,0, -eyeSize * 0.8);
    endShape(CLOSE)
    pop()
    push()
    translate(fireEyePosX+eyeOffset,fireEyePosY+0.2*eyeOffset)
    beginShape()
    vertex(0,-eyeSize*0.8);
    bezierVertex(eyeSize,-eyeSize*1.5,eyeSize*1.5,0,0,eyeSize*1.2)
    bezierVertex(-eyeSize * 1.5, 0,-eyeSize, -eyeSize * 1.5,0, -eyeSize * 0.8);
    endShape(CLOSE);
    pop();
    pop()
  }
  // angry
  if (k===4){
  push()
  noFill()
  stroke(0)
  strokeWeight(6)
  // left eye
  line(fireEyePosX+eyeOffset*0.1,fireEyePosY-0.3*eyeOffset,fireEyePosX+0.5*eyeOffset,fireEyePosY-0.1*eyeOffset)
  beginShape();
  vertex(fireEyePosX, fireEyePosY-0.18*eyeOffset)
  vertex(fireEyePosX + eyeOffset/2, fireEyePosY*1.1) 
  vertex(fireEyePosX + eyeSize * 0.8, fireEyePosY*1.2) 
  endShape(CLOSE);
  
  // right eye
  line(fireEyePosX+eyeOffset*1.2,fireEyePosY-0.3*eyeOffset,fireEyePosX+0.8*eyeOffset,fireEyePosY-0.1*eyeOffset)

  beginShape()
  vertex(fireEyePosX + eyeOffset*1.3, fireEyePosY - 0.18*eyeOffset)
  vertex(fireEyePosX + eyeOffset*0.8, fireEyePosY*1.1)
  vertex(fireEyePosX + eyeOffset*1.1, fireEyePosY*1.2)
  endShape(CLOSE);
  //mouth
  beginShape()
  vertex(fireEyePosX+0.45*eyeOffset,fireEyePosY*1.5)
  vertex(fireEyePosX+0.55*eyeOffset,fireEyePosY*1.3)
  vertex(fireEyePosX+0.65*eyeOffset,fireEyePosY*1.4)
  vertex(fireEyePosX+0.75*eyeOffset,fireEyePosY*1.3)
  vertex(fireEyePosX+0.9*eyeOffset,fireEyePosY*1.5)
  endShape(CLOSE)
  pop()
}

}
function drawBackStars(lipsHeight){
  push()
  background(0,120)
  //first run
  if (firstRun){
    for(let i=0;i<numStars;i++){
      stars.push({
        x:random(-midx,midx),
        y:random(-midy,midy),
        z:random(2*midx)
      })
    }
    firstRun=false
  }
  translate(midx,midy)
  let lerpAmt=map(lipsHeight,40,80,0,1)
  for(let star of stars){
  star.z -= 10;
  if (star.z < 1) {
  // Reset star to far away
    star.x = random(-midx, midx);
    star.y = random(-midy, midy);
    star.z = midx*2;
}
  // Project 3D to 2D
  let sx = star.x * (midx*2 / star.z);
  let sy = star.y * (midx*2 / star.z);
  let r = map(star.z, 0, midx*2, 8, 0.5); // Size based on depth
  noStroke();
  fill(255);
  ellipse(sx, sy, r, r);
  pop()
}
}
function drawBackHearts(lipsWidth){

background(250, 202, 245,90)
  push()
    colorMode(HSB)
if(firstRunHearts){
  for(let i=0;i<numHearts;i++){
  
    hearts.push({
      x:random(-midx,midx),
      y:random(-midy,midy),
      z:random(2*midx),
      color:color(random(310,340),random(50,80),100),
      size:random(10,25),
    
    })
  }
  firstRunHearts=false
}
pop()
push()
translate(midx,midy)
let speed=map(lipsWidth,160,120,2,8)
for(let heart of hearts){
  heart.z-=speed
  if(heart.z<1){
    heart.x=random(-midx,midx)
    heart.y=random(-midy,midy)
    heart.z=random(2*midx)
  }
  let sx=heart.x*(midx*2/heart.z)
  let sy=heart.y*(midx*2/heart.z)
  let r=map(heart.z,0,midx*2,heart.size,heart.size*0.2)
  push()
  translate(sx,sy)
  scale(r/20)
  noStroke()
  fill(heart.color)
  beginShape()
  vertex(0,-8)
  bezierVertex(-10,-20,-20,0,0,10)
  bezierVertex(20,0,10,-20,0,-8)
  endShape(CLOSE)
  pop() 
}
pop()
}
function drawFireworks(){
  
  if (random(1)<0.05&&fireworks.length<6){
    fireworks.push({
      x:random(midx*0.4,midx*1.6),
      y:midy*2,
      vy:random(-12,-8),
      color:random(myColors),
      exploded:false,
      size:random(40,60),
      particles:[]

    })
  }
  for(let fw of fireworks){
    if(!fw.exploded){
      fw.y+=fw.vy
      fw.vy+=gravity*0.5
      drawFlyingFire(fw.x,fw.y,fw.color)
    if(fw.vy>=0||fw.y<midy){
      fw.exploded=true
      fw.particles=createExplosion(fw.x,fw.y,fw.color)
    }  
    }else{
      for(let p of fw.particles){
        p.x+=p.vx
        p.y+=p.vy
        p.vy+=gravity*0.05
        p.life-=4
        noStroke()
        fill(red(p.color),green(p.color),blue(p.color),p.life)
        ellipse(p.x,p.y,p.size)
      }
      fw.particles=fw.particles.filter(p=>p.life>0)
    }
  }
  fireworks=fireworks.filter(fw => !fw.exploded || fw.particles.length>0)
}
function drawFlyingFire(x,y,col){
  push();
  translate(x, y);
  noStroke();
  fill(col);
  ellipse(0, 0, 6, 20);
  fill(255, 180);
  ellipse(0, 10, 4, 10);
  pop();
}
function createExplosion(x,y,col){
  let particles = [];
  let count = 500;
  for (let i = 0; i < count; i++) {
    push()
    angleMode(DEGREES)
    let angle = (i/count)*360
    //let heartX = 16 * pow(sin(t), 3);
    //let heartY = -(13 * cos(t) - 5 * cos(2*t) - 2 * cos(3*t) - cos(4*t));
    //let scale = random(2, 5);
    let speed=random(2,8)
    let vx=cos(angle)*speed
    let vy=sin(angle)*speed
    particles.push({
      x: x,
      y: y,
      // vx: heartX * 0.3 * random(0.8, 1.2)*scale*0.1,
      vx:vx,
      //vy: heartY * 0.3 * random(0.8, 1.2)*scale*0.1,
      vy:vy,
      size: random(4, 8),
      color: col,
      life: 255,
      decay:random(2,4)
    })
    pop()
}
return particles
}
function drawLines(x,y,length){
  push()
  angleMode(DEGREES)
  translate(x,y)
  stroke(random(myColors))
  strokeWeight(6)
  noFill()
  line(0,0,length,0)
  rotate(-15)
  line(0,0,length,0)
  rotate(30)
  line(0,0,length,0)
  rotate(15)


  pop()
}  
  


