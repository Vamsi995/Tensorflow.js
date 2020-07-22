let mobilenet;
let classifier;
let video;
let label="loading model";
// let ukeButton;
// let whistleButton;
// let trainButton;
// let saveButton;


// function whileTraining(loss){
//    if(loss==null){
//       console.log('Training complete')
//       classifier.classify(gotResults);
//    }
//    else{
//       console.log(loss);
//    }
  
// }

function modelReady(){
   console.log('Model is ready');
   classifier.load('model.json',customModelReady); 
   
}

function customModelReady(){
   console.log('Custom Model Ready');
   label="Model Ready";
   classifier.classify(gotResults);
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
   video=createCapture(VIDEO);
   video.size(640,550);
   video.hide();
   // puffin.hide()
   // background(0);
 mobilenet=ml5.featureExtractor('MobileNet',modelReady);
 classifier=mobilenet.classification(video,videoReady);

//  ukeButton=createButton('happy');
//  ukeButton.mousePressed(()=>{
//     classifier.addImage('happy');
//  })

//  whistleButton = createButton('sad');
//  whistleButton.mousePressed(()=>{
//     classifier.addImage('sad')
//  })

//  trainButton = createButton('train');
//  trainButton.mousePressed(()=>{
//     classifier.train(whileTraining);
//  })
//  saveButton = createButton('save');
//  saveButton.mousePressed(()=>{
//     classifier.save();
//  })
}

function draw(){
   background(0)
   image(video,0,0,640,480)
   fill(255); 
   textSize(64);
   text(label,10,height-20);
}