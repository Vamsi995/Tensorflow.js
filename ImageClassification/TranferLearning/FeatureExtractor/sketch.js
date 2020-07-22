/**
 * Transfer Learning via feature extractor means we can use the MobileNet's neural network for our own dataset 
 */


let mobilenet;
let classifier;
let video;
let label="";
let ukeButton;
let whistleButton;
let trainButton;
let saveButton;


function whileTraining(loss){
   if(loss==null){
      console.log('Training complete')
      //classify function outputs the logits through the final layer 
      classifier.classify(gotResults);
   }
   else{
      console.log(loss);
   }
  
}

function modelReady(){
   console.log('Model is ready'); 
}
function videoReady(){
   console.log('Video is ready'); 
}

function gotResults(error,results){
   if(error){
      console.error(error);
   }
   else{
      // console.log(results);
       label=results[0].label;
      //  console.log(label);

      classifier.classify( gotResults);
   }
}


// function imageReady(){
//    image(puffin,0,0,width,height);
// }
function setup(){
   createCanvas(640,550);

   //Creating the video element
   video=createCapture(VIDEO);
   video.size(640,550);
   video.hide();

//The featureExtractor() is used to extract the CNN model from MobileNet
 mobilenet=ml5.featureExtractor('MobileNet',modelReady);
 classifier=mobilenet.classification(video,videoReady);

 ukeButton=createButton('happy');
 ukeButton.mousePressed(()=>{
    //addImage() function adds a node to the output layer --> it means we are adding the outputs
    classifier.addImage('happy');
 })

 whistleButton = createButton('sad');
 whistleButton.mousePressed(()=>{
    classifier.addImage('sad')
 })

 trainButton = createButton('train');
 trainButton.mousePressed(()=>{

   //Using the train() function to train our custom model
    classifier.train(whileTraining);   //whileTraining is a callback
 })

}

function draw(){
   background(0)

   //Drawing the image on the canvas
   image(video,0,0,640,480)

   //Drawing the text
   fill(255); 
   textSize(64);
   text(label,10,height-20);
}