// ----=  HANDS  =----
let bgImage

function prepareInteraction() {
  //bgImage = loadImage('/images/background.png');
}

function drawInteraction(faces, hands) {

  // hands part
  // USING THE GESTURE DETECTORS (check their values in the debug menu)
  // detectHandGesture(hand) returns "Pinch", "Peace", "Thumbs Up", "Pointing", "Open Palm", or "Fist"
let LH=hands.find(hand=>hand.handedness==="Left");
let RH=hands.find(hand=>hand.handedness==="Right");
let L_indexFingerTipX, L_indexFingerTipY, L_indexPinkyTipX, L_indexPinkyTipY;
let L_middleFingerMcpX,L_middleFingerMcpY,L_indexFingerMcpX,L_indexFingerMcpY,L_ringFingerMcpX,L_ringFingerMcpY;
let R_indexFingerTipX, R_indexFingerTipY, R_indexPinkyTipX, R_indexPinkyTipY;
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
    let midx=CaptureWidth/2
    let midy=CaptureHeight/2
    let middleFingerMcpX = hand.middle_finger_mcp.x;
    let middleFingerMcpY = hand.middle_finger_mcp.y;
 
    /*
    Start drawing on the hands here
    */
   //set up left hand variables
if(LH){
  L_indexFingerTipX=LH.index_finger_tip.x
  L_indexFingerTipY=LH.index_finger_tip.y
  L_indexPinkyTipX=LH.pinky_finger_tip.x
  L_indexPinkyTipY=LH.pinky_finger_tip.y
  L_indexMiddleTipX=LH.middle_finger_tip.x
  L_indexMiddleTipY=LH.middle_finger_tip.y
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
  R_indexPinkyTipX=RH.pinky_finger_tip.x
  R_indexPinkyTipY=RH.pinky_finger_tip.y
  R_indexMiddleTipX=RH.middle_finger_tip.x
  R_indexMiddleTipY=RH.middle_finger_tip.y
  R_middleFingerMcpX = RH.middle_finger_mcp.x;
  R_middleFingerMcpY = RH.middle_finger_mcp.y;
  R_indexFingerMcpX = RH.index_finger_mcp.x;
  R_indexFingerMcpY = RH.index_finger_mcp.y;
  R_ringFingerMcpX = RH.ring_finger_mcp.x;
  R_ringFingerMcpY = RH.ring_finger_mcp.y;
}
   let whatGesture = detectHandGesture(hand)
   let fireSize=map(dist(L_middleFingerMcpX,L_middleFingerMcpY,R_middleFingerMcpX,R_middleFingerMcpY),0,1000,50,800)
   let handMidX=L_middleFingerMcpX+dist(L_middleFingerMcpX,L_middleFingerMcpY,R_middleFingerMcpX,R_middleFingerMcpY)/2
  if(LH && RH){
  let indexTouch=areTheseTouching(L_indexMiddleTipX,L_indexMiddleTipY,R_indexMiddleTipX,R_indexMiddleTipY,50)
  if (indexTouch){
    drawLightning(L_indexFingerMcpX,R_indexFingerMcpX,L_indexFingerMcpY,220, random(0,80), 90)
    drawLightning(L_middleFingerMcpX,R_middleFingerMcpX,R_middleFingerMcpY,60, random(0,40), 100)
    drawLightning(L_ringFingerMcpX,R_ringFingerMcpX,R_ringFingerMcpY,280, random(0,50), 90)
  }
  
 else if (whatGesture == "Fist"){

  drawFire(handMidX,R_middleFingerMcpY+100,fireSize,color(140, 171, 245,100),color(85, 134, 250,100))
  }
  else{
  push()
  colorMode(HSB)
  let h = map(fireSize, 50, 800, 50, 10);  
  let s = map(fireSize, 50, 800, 80, 100);  
  let b = map(fireSize, 50, 800, 100, 70);  
  let outsideColor = color(h-5, s, b, 0.6);
  let insideColor = color(h+5, s - 20, b + 20, 0.8);
  drawFire(handMidX,R_middleFingerMcpY+100,fireSize,outsideColor,insideColor)   
  pop()  
}
}}
 


    //pinchCircle(hand)
    // fill(225, 225, 0);
    // ellipse(indexFingerTipX, indexFingerTipY, 30, 30);
    // let testDist = dist(middleFingerMcpX, middleFingerMcpY, );
    
    
   
    /*
    Stop drawing on the hands here
    */
  }



  //------------------------------------------------------------
  //facePart
  // for loop to capture if there is more than one face on the screen. This applies the same process to all faces. 
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i]; // face holds all the keypoints of the face
    if (showKeypoints) {
      drawPoints(face)
    }
    console.log(face);
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
    let rightEyeHeight = face.rightEye.height;
    let leftEyeHeight = face.leftEye.height; 
    // fill(225, 225, 0);
    // ellipse(leftEyeCenterX, leftEyeCenterY, leftEyeWidth, leftEyeHeight);
  
    //left eye
   drawFlowers(leftEyeCenterX,leftEyeCenterY,50,map(leftEyeHeight,5,19,4,12))
    //right eye
    drawFlowers(rightEyeCenterX,rightEyeCenterY,50,map(rightEyeHeight,5,19,4,12))
    
    //drawPoints(face.leftEye);
    // drawPoints(face.leftEyebrow);
    // drawPoints(face.lips);
    //drawPoints(face.rightEye);
   // drawPoints(face.rightEyebrow);
  
    //console.log(face.leftEye)

    /*
    Stop drawing on the face here
    */

  }
  //------------------------------------------------------
  // You can make addtional elements here, but keep the face drawing inside the for loop. 




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
function drawFire(firePosx, firePosy, fireSize, outsideColor, insideColor) {
  push();
  translate(firePosx, firePosy);
  noStroke();
  colorMode(HSB);

  let flickerX = sin(frameCount * 0.15 + random(0.5)) * map(fireSize, 50, 800, 2, 15);
  let flickerY = noise(frameCount * 0.05) * map(fireSize, 50, 800, 1, 10);

  
  let wave = sin(frameCount * 0.3 + random(5)) * 0.1;

  translate(flickerX, flickerY);
  beginShape();
  fill(insideColor);
  vertex(0, 0);
  bezierVertex(
    -0.4 * fireSize * (1 + wave), 0.1 * fireSize,
    -0.2 * fireSize, -0.2 * fireSize * (1 + wave),
    0, -0.5 * fireSize * (1 + wave)
  );
  bezierVertex(
    0.4 * fireSize * (1 + wave), 0.1 * fireSize,
    0.2 * fireSize, 0,
    0, 0
  );
  endShape();

  fill(outsideColor);
  beginShape();
  vertex(0, 0.1 * fireSize);
  quadraticVertex(-0.5 * fireSize, 0.1 * fireSize, -0.4 * fireSize, -0.35 * fireSize * (1 + wave));
  quadraticVertex(-0.25 * fireSize, -0.2 * fireSize, 0, -0.8 * fireSize * (1 + wave));
  quadraticVertex(0.25 * fireSize, -0.35 * fireSize, 0.3 * fireSize, -0.45 * fireSize * (1 + wave));
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
function drawRains(){
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
