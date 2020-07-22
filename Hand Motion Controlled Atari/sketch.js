let features;
let video;
let knn;
let labelP;
let label;
let ob1;
let space;
let  barspeed=2;
let ballspeed=1;

function setup(){
   createCanvas(400,400);
   ob1=new ball(random(400),random(400),ballspeed,ballspeed,10);
   space=new bar(10,160,50);





   video=createCapture(VIDEO);
   // video.hide();
   video.size(320,240);


   features=ml5.featureExtractor('MobileNet',modelReady);

  

   labelP=createP('need training data');
   // labelP.style("font")

}




function modelReady(){
   console.log('MobileNet loaded');
   knn=ml5.KNNClassifier();
   knn.load('myKNN (2).json',()=>{
      console.log('KNN data loaded')
      goClassify();
   });
}


// function keyPressed(){
//    const logits=features.infer(video);
//    // console.log(logits.dataSync())

//    if(key=='u'){
//       knn.addExample(logits,'up');
//       console.log('up');
//    }
//    else if(key=='d'){
//       knn.addExample(logits,'down');
//       console.log('down');
//    }
//    // else if(key=='s'){
//    //    knn.save();   
//    // }
// }

function draw(){


   background(0);
   fill(255);

   if(ob1.intersects(space)){
      ob1.xs = -ob1.xs;
      // ob1.update();
      // ob1.display()
   }


   ob1.update();
   ob1.display();


   if(label=='up'){ 
      space.y-=barspeed;
   }

   if(label=='down'){
      space.y+=barspeed;
   }
   
   if(label=='stay'){
      space.display();
   }

   // if(space.y<=0){
   //    space.display()
   // }
   // if(space.y>=350-height){
   //    space.display()
   // }

  

   space.display()

   // if(!ready && knn.getNumLabels()>0){
   //    goClassify();
   //    ready=true;
   // }
   // constrain(space.y,0,height);
   
}

async function goClassify(){
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