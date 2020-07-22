let data;
let model;


let xs;
let ys;

let lossP;
let labelP;
let rSlider,gSlider,bSlider;

let labelList=[
   'red-ish',
   'green-ish',
   'blue-ish',
   'orange-ish',  
   'yellow-ish',
   'pink-ish',
   'purple-ish',
   'brown-ish',
   'grey-ish' 
];

function preload(){
   data=loadJSON('colorData.json');
   createCanvas(400,400);
}

function setup(){
  
   labelP=createP();
   lossP=createP('loss: ');
   
   // console.log(data.entries.length);

   rSlider=createSlider(0,255,255);
   gSlider=createSlider(0,255,255);
   bSlider=createSlider(0,255,0);



   let colors=[];
   let labels=[];

   for(let record of data.entries){

      //Normalizing the data
      let col=[record.r/255,record.g/255,record.b/255];
      colors.push(col);
      labels.push(labelList.indexOf(record.label));
   }

   //Each  
    xs=tf.tensor2d(colors);
   // console.log(xs.shape);

   let labelsTensor=tf.tensor1d(labels,'int32');

   //One hot encoding
    ys=tf.oneHot(labelsTensor,9);
   tf.dispose(labelsTensor); 

   // console.log(xs.shape)
   // console.log(ys.shape)

   // console.log(labels);

   model=tf.sequential();

   let hidden=tf.layers.dense({
      inputDim:3,
      units:16,
      activation:'sigmoid'
   });
   
   model.add(hidden);

   let outputs=tf.layers.dense({
      units:9,
      activation:'softmax'
   });

   model.add(outputs);

   const lr=0.2;
   const optimizer=tf.train.sgd(lr);

   model.compile({
      optimizer:optimizer,
      loss:'categoricalCrossentropy'
   });



   // model.predict(tf.tensor2d([[0,1,0]])).print()


train().then(results=>{
   console.log(results.history.loss);
});

// console.log(model.summary());









}

async function train(){
   return await model.fit(xs,ys,{
      shuffle:true,
      epochs:10,
      validationSplit:0.1,
      callbacks:{
         onTrainBegin:()=>console.log('training start'),
         onTrainEnd:()=>console.log('training ends'),
         onBatchEnd:tf.nextFrame,
         onEpochEnd:(num,logs)=>{
            //The num is no of epochs and logs is an object with two variables -loss and val_loss(validation loss)
            // await tf.nextFrame();
            console.log('Epoch: '+ num);
            lossP.html('Loss: '+logs.val_loss);
         }
      }

   })

}

function draw(){

   let r=rSlider.value();
   let g=gSlider.value();
   let b=bSlider.value();
   background(r,g,b);

   tf.tidy(()=>{
      const xs=tf.tensor2d([[r/255,g/255,b/255]]);
      let results=model.predict(xs);
      let index=results.argMax(1).dataSync()[0];
       
      let label=labelList[index];
      labelP.html(label);
      
   })
   
   // index.print();
   // stroke(255);
   // strokeWeight(4);
   // line(frameCount%width,0,0,frameCount%height);
}


//More stuff to learn

/*

- About validation data sets in detail
- softmax and categoricalCrossentropy math
-  saving a trained model   -->  model.save(file name)(async function)
-  loading a trained model -->   tf.loadLayersModel(file name)  


-  hyperparameters


- more about the callbacks in model.fit()

-  doodle classifier
- MNIST dataset
- wine quality classification
- ML5 


*/




