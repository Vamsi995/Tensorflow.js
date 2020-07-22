let features;
let video;
let knn;
let labelP;
let ready=false;
let x,y;
let label;
let xspeed=0;
let yspeed=0; 

function setup(){
   createCanvas(320,240);
   video=createCapture(VIDEO);
   // video.hide();
   video.size(320,240);


   features=ml5.featureExtractor('MobileNet',modelReady);

  

   labelP=createP('need training data');
   // labelP.style("font")
   x=width/2;
   y=height/2;
}




function modelReady(){
   console.log('MobileNet loaded');
   knn=ml5.KNNClassifier();
   knn.load('myKNN.json',()=>{
      console.log('KNN data loaded')
      goClassify();
   });
}


function keyPressed(){
   const logits=features.infer(video);
   // console.log(logits.dataSync())
   if(key=="l"){
      knn.addExample(logits,'left');
      console.log('left');
   }
   else if(key=='r'){
      knn.addExample(logits,'right');
      console.log('right');
   }
   else if(key=='u'){
      knn.addExample(logits,'up');
      console.log('up');
   }
   else if(key=='d'){
      knn.addExample(logits,'down');
      console.log('down');
   }
   else if(key=='s'){
      knn.save();   
   }
}

function draw(){


   background(0);
   fill(255);
   ellipse(x,y,18)

   if(label=='up'){
      yspeed--;
      y-=yspeed;
   }
   ellipse(x,y,18)

   if(label=='down'){
      yspeed++;
      y+=yspeed;
   }
   ellipse(x,y,18)

   if(label=='right'){
      xspeed++;
      x+=xspeed;
   }
   ellipse(x,y,18)

   if(label=='left'){
      xspeed--;
      x-=xspeed;
   }

   // x=constrain(x,0,width)
   // y=constrain(x,0,height)
   if(x>width){
      xspeed=-xspeed;
   }
   if(y>height){
      yspeed=-yspeed;
   }

 

   // if(!ready && knn.getNumLabels()>0){
   //    goClassify();
   //    ready=true;
   // }


   
}

function goClassify(){
   const logits=features.infer(video);
   knn.classify(logits,(err,result)=>{
      if(err){
         console.error(err)
      }
      else{
         label=result.label;
         labelP.html(label);
         goClassify();
      }
    
   });
}