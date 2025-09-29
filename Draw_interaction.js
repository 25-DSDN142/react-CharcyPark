// ----=  HANDS  =----
let bgImage
function prepareInteraction() {
  //bgImage = loadImage('/images/background.png');
}

function drawInteraction(faces, hands) {

  // hands part
  // USING THE GESTURE DETECTORS (check their values in the debug menu)
  // detectHandGesture(hand) returns "Pinch", "Peace", "Thumbs Up", "Pointing", "Open Palm", or "Fist"

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

    // pinchCircle(hand)
    // fill(225, 225, 0);
    // ellipse(indexFingerTipX, indexFingerTipY, 30, 30);
    // let testDist = dist(middleFingerMcpX, middleFingerMcpY, );
    drawFire(midx,midy,map(dist(middleFingerMcpX,middleFingerMcpY,midx,midy),0,1000,50,300))

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
    // console.log(face);
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

    // fill(225, 225, 0);
    // ellipse(leftEyeCenterX, leftEyeCenterY, leftEyeWidth, leftEyeHeight);

    //drawPoints(face.leftEye);
    // drawPoints(face.leftEyebrow);
    // drawPoints(face.lips);
    //drawPoints(face.rightEye);
   // drawPoints(face.rightEyebrow);
    let leftEyeCenterX = face.leftEye.centerX;
    let leftEyeCenterY = face.leftEye.centerY;
    let rightEyeCenterX = face.rightEye.centerX;
    let rightEyeCenterY = face.rightEye.centerY;
    let rightEyeHeight = face.rightEye.height;
    let leftEyeHeight = face.leftEye.height; 
    //left eye
   drawFlowers(leftEyeCenterX,leftEyeCenterY,50,map(dist(leftEyeHeight,5,19,4,12)))
    //right eye
    drawFlowers(rightEyeCenterX,rightEyeCenterY,50,map(dist(rightEyeHeight,5,19,4,12)))
    
    //console.log(face.leftEye)

    /*
    Stop drawing on the face here
    */

  }
  //------------------------------------------------------
  // You can make addtional elements here, but keep the face drawing inside the for loop. 


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
function drawFire(firePosx,firePosy,fireSize){

  push()
  translate(firePosx,firePosy)
  noStroke()
  fill(245, 237, 93)

  beginShape()
    vertex(0,0)
    bezierVertex(-0.4*fireSize,0.1*fireSize,-0.2*fireSize,-0.2*fireSize,0,-0.5*fireSize)
    bezierVertex(0.4*fireSize,0.1*fireSize,0.2*fireSize,0,0,0)
  endShape()
  fill(242, 150, 80,105)

  beginShape()
  vertex(0,0.1*fireSize)
    quadraticVertex(-0.5*fireSize,0.1*fireSize,-0.4*fireSize,-0.35*fireSize)
    quadraticVertex(-0.25*fireSize,-0.2*fireSize,0,-0.8*fireSize)
    quadraticVertex(0.25*fireSize,-0.35*fireSize,0.3*fireSize,-0.45*fireSize)
    quadraticVertex(0.3*fireSize,-0.1*fireSize,0.4*fireSize,-0.25*fireSize)
    quadraticVertex(0.4*fireSize,0.1*fireSize,0,0.1*fireSize)
  endShape()
  
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