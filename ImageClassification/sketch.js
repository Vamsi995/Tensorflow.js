/**
 *MobileNet is a pre-trained model so there is no training step involved here
 */


let mobilenet;
let video;
let label="";

function modelReady(){
   console.log('Model is ready'); 
   mobilenet.predict( gotResults);
}

function gotResults(error,results){
   if(error){
      console.error(error);
   }
   else{
      // console.log(results);
       label=results[0].label;

      mobilenet.predict( gotResults);
   }
}


// function imageReady(){
//    image(puffin,0,0,width,height);
// }
function setup(){
   createCanvas(640,550);

   //Creating the video capture element -> p5 function
   video=createCapture(VIDEO);
   video.size(640,550);
   video.hide(); //hides the video from appearing

   //Creating the image classifier CNN
 mobilenet=ml5.imageClassifier('MobileNet', video,modelReady); //Only for continuous image classification we use video element directly inside the                                                                    imageClassifier function otherwise if it is an image put that variable in the                                                                        predict function
}

function draw(){
   background(0)

   //Drawing the image on the canvas
   image(video,0,0,640,480)

   //Displaying the text
   fill(255); 
   textSize(64);
   text(label,10,height-20);
}