let mobilenet;
let predictor;
let video;
let value=0;
let slider;
let addButton;
let trainButton;


function whileTraining(loss){
   if(loss==null){
      console.log('Training complete')
      predictor.predict(gotResults);
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
       value=results.value;
      //  console.log(value);

      predictor.predict( gotResults);
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
 predictor=mobilenet.regression(video,videoReady);

slider=createSlider(0,1,0.5,0.01);
slider.input(()=>{
   // predictor.addImage(slider.value());
   // console.log(slider.value);
})

addButton=createButton('add example image');
addButton.mousePressed(()=>{
   predictor.addImage(slider.value());
})

 trainButton = createButton('train');
 trainButton.mousePressed(()=>{
    predictor.train(whileTraining);
 })
}

function draw(){
   background(0)
   image(video,0,0,640,480)
   ellipseMode(CENTER);
   fill(0);
   ellipse(value*width,height/2,50,50);
   
   // fill(255); 
   // textSize(64);
   // text(value,10,height-20);
}