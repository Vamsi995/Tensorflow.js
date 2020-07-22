// import * as tf from '@tensorflow/tfjs';
 
const TRAIN_BATCHES=150;
const BATCH_SIZE=64;
let model;
let xs;
let ys;
let txs;
let tys;


const len=784;
const total_data=60000;
const test_data=10000;

let labelList=[
   '0',
   '1',
   '2',
   '3',
   '4',
   '5',
   '6',
   '7',
   '8',
   '9',
];

//Loading the bytes
let trainingData;
let testingData;
let traingingLabels;
let testingLabels;

//Each object has two arrays - training ,testing
let data={};


function preload(){
   trainingData = loadBytes('data/training-images.bin');
   testingData = loadBytes('data/testing-images.bin');
   trainingLabels = loadBytes('data/training-labels.bin');
   testingLabels = loadBytes('data/testing-labels.bin');
   // console.log(testingLabels);
}
function setup(){
  createCanvas(280,280);
   background(255);

//DataPrep----arguments(object to store data, trainingdata,testingdata,traininglabels,testinglabels)
prepareData(data , trainingData, testingData, trainingLabels, testingLabels);
structure();



//Creating the neural network 784-64-3
model=tf.sequential();


let hidden=tf.layers.conv2d({
   inputShape:[28,28,1],
   filters:16,
   kernelSize:5,
   strides:1,
   activation:'relu',
   kernelInitializer:'varianceScaling'
})

model.add(hidden);

model.add(tf.layers.maxPooling2d({
   poolSize:[2,2],
   strides:[2,2]
}));



let hidden2=tf.layers.conv2d({
   filters:16,
   kernelSize:5,
   strides:1,
   activation:'relu',
   kernelInitializer:'varianceScaling'
})

model.add(hidden2);

model.add(tf.layers.maxPooling2d({
   poolSize:[2,2],
   strides:[2,2]
}));

let flatten=tf.layers.flatten();
model.add(flatten);
let output=tf.layers.dense({
   units:10,
   activation:'softmax',
   kernelInitializer:'varianceScaling'
})

model.add(output);

model.compile({
   optimizer:'adam',
   loss:'categoricalCrossentropy' ,
   metrics:['accuracy'] 
})
//=============================================================

//The training array holds all the 2400 subarrays each of length 784
// let training=[];
// training=data.training;


//Creating target tensor using one hot encoding
let labelIndex=[];
for(let i=0;i<10000;i++){
   labelIndex.push(labelList.indexOf(data.training[i].label));
}
// console.log(labelIndex)
let result=tf.tensor1d(labelIndex,'int32');
ys=tf.oneHot(result,10); //ys has all the target values
// console.log(ys.dataSync()); 
tf.dispose(result);  //Memory Management

// xs=tf.tensor4d(data.array);  //xs --> training data as tensor-->shape=[2400,784]


//The testing array holds all the 600 subarrays each of length 784
// let testing=[];
// testing=data.testing;
// console.log(data.testing[0].label);

//Creating target tensor using one hot encoding
let labelTest=[];
for(let images of data.testing){
   labelTest.push(labelList.indexOf(images.label));
}
// console.log(labelTest)
let temp=tf.tensor1d(labelTest,'int32');
tys=tf.oneHot(temp,10);  //tys has all the target values

tf.dispose(temp); //Memory Management

txs=tf.tensor4d(data.array1);  //txs --> testing data as tensor-->shape=[600,784]
// console.log(txs.dataSync())

//Setting up train button events
let trainButton=select('#train');
trainButton.mousePressed(()=>{
   open();
   trainEpoch();
});


//Setting up test button events
let testButton=select('#test');
testButton.mousePressed(()=>{
   let percent=testAll();
   console.log("Percent: "+nf(percent,2,2)+"%");
});


//Setting up guess button events
let guessButton=select("#guess");
guessButton.mousePressed(()=>{
   //loading the drawing into an array
   let inputs=[];
   let img=get();       //p5 function to get the sketch as an image object
   img.resize(28,28);   //Resizing the 280x280 image to 28x28
   img.loadPixels();
   let bright;
   //Each pixel has four values R,G,B,A -- we are accessing the fourth value(transparency) of each pixel
   for(let i=0;i<len;i++){       
      bright=img.pixels[i*4];
      inputs[i]=(255-bright)/255.0;    //Taking the inverted results as our dataset has white skect on black background
   }
   let matrix=[];
   let temp;
   for(let i=0;i<len;i+=28){
      temp=[];
      for(let j=0;j<28;j++){
         temp[j]=[inputs[i+j]];
      }
      matrix.push(temp);
   }
      let tinputs=tf.tensor4d([matrix]);
      let guess=model.predict(tinputs)   //argMax is used to find the index of the max value
      guess.print()
      let m=guess.argMax(1).dataSync();
      let classification=m[0];  //dataSync() returns the data of a tensor as an array

   console.log(labelList[classification]);
   
});


//Setting up clear button events
let clearButton=select('#clear');
clearButton.mousePressed(()=>{
   background(255);
});
}

function draw(){
   strokeWeight(8);
   stroke(0);
   if(mouseIsPressed){
      line(pmouseX,pmouseY,mouseX,mouseY);
   }
}


function testAll(){

   let correct=0;
   let predict;
   tf.tidy(()=>{
      let output=model.predict(txs).argMax(1).dataSync();
      let labels=tys.argMax(1).dataSync();                  //The argMax method finds the maximum index of the element in a tensor                    
     
      console.log(output)
       console.log(labels)                                   // and the argument passed is the axis of search
      for(let i=0;i<labels.length;i++){
         if(output[i]===labels[i]){
            correct++;
         }
      }
       predict=correct/labels.length;
   })
   return predict*100;
}

async function trainEpoch(){
   console.log('Start training');

   for(let i=0;i<TRAIN_BATCHES;i++){
      const batch=tf.tidy(()=>{
         const batch =datab.nextTrainBatch(BATCH_SIZE);
         batch.xs=batch.xs.reshape([BATCH_SIZE,28,28,1]);
         return batch;
      })
   

   await model.fit(batch.xs,batch.labels,{
      batchSize:BATCH_SIZE,
      epochs:1,
      validationSplit:0.1
   })

   tf.dispose(batch);

   }
   console.log('Training is complete');

}

let datab;
async function open(){
   console.log('Loading MNIST data...');
   datab=new MnistData();
   await datab.load();
   console.log('Data loaded successfully');
}

