let features;
let video;
let knn;
let labelP;
let ready=false;
 
function setup(){
   createCanvas(320,240);
   video=createCapture(VIDEO);
   video.hide();
   video.size(320,240);


   features=ml5.featureExtractor('MobileNet',modelReady);

   knn=ml5.KNNClassifier();

   labelP=createP('need training data');
   // labelP.style("font")
}




function modelReady(){
   console.log('model ready')
}


function keyPressed(){
   const logits=features.infer(video);
   // console.log(logits.dataSync())

    if(key=='u'){
      knn.addExample(logits,'up');
      console.log('up');
   }
   else if(key=='d'){
      knn.addExample(logits,'down');
      console.log('down');
   }
   else if(key==' '){
      knn.addExample(logits,'stay');
      console.log('stay');
   }
   else if(key=='s'){
      knn.save();   
   }
}

function draw(){
   image(video,0,0);

   if(!ready && knn.getNumLabels()>0){
      goClassify();
      ready=true;
   }


   
}

function goClassify(){
   const logits=features.infer(video);
   knn.classify(logits,(err,result)=>{
      if(err){
         console.error(err)
      }
      else{
         labelP.html(result.label);
         goClassify();
      }
    
   });
}