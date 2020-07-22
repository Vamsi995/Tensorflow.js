let model;
let xs;
let ys;
let txs;
let tys;

const len=784;
const total_data=1000;

let labelList=[
   'CAT',
   'RAINBOW',
   'TRAIN'
];

//Targets
const CAT=0;
const RAINBOW=1;
const TRAIN=2;

//Loading the bytes
let catsData;
let trainsData;
let rainbowsData;

//Each object has two arrays - training ,testing
let cats={};
let trains={};
let rainbows={};

function preload(){
 catsData = loadBytes('data/cat1000.bin');
   rainbowsData = loadBytes('data/rainbows100.bin');
   trainsData = loadBytes('data/train1000.bin');
}
function setup(){
  createCanvas(280,280);
   background(255);

//DataPrep----arguments(object to store data in, data, label)
prepareData(cats ,catsData,'CAT');
prepareData(rainbows,rainbowsData,'RAINBOW');
prepareData(trains,trainsData,'TRAIN');


//Creating the neural network 784-64-3
model=tf.sequential();

let hidden=tf.layers.dense({
   inputShape:784,
   units:64,
   activation:'sigmoid'
})

model.add(hidden);

let output=tf.layers.dense({
   units:3,
   activation:'softmax'
})

model.add(output);

model.compile({
   optimizer:'adam',
   loss:'categoricalCrossentropy'  
})
//=============================================================

//The training array holds all the 2400 subarrays each of length 784
let training=[];
training=training.concat(cats.training);
training=training.concat(rainbows.training);
training=training.concat(trains.training);



//Creating target tensor using one hot encoding
let labelIndex=[];
for(let images of training){
   labelIndex.push(labelList.indexOf(images.label));
}

let result=tf.tensor1d(labelIndex,'int32');
ys=tf.oneHot(result,3); //ys has all the target values

tf.dispose(result);  //Memory Management

xs=tf.tensor2d(training);  //xs --> training data as tensor-->shape=[2400,784]


//The testing array holds all the 600 subarrays each of length 784
let testing=[];
testing=testing.concat(cats.testing);
testing=testing.concat(rainbows.testing);
testing=testing.concat(trains.testing);


//Creating target tensor using one hot encoding
let labelTest=[];
for(let images of testing){
   labelTest.push(labelList.indexOf(images.label));
}

let temp=tf.tensor1d(labelTest,'int32');
tys=tf.oneHot(temp,3);  //tys has all the target values

tf.dispose(temp); //Memory Management

txs=tf.tensor2d(testing);  //txs --> testing data as tensor-->shape=[600,784]


//Setting up train button events
let trainButton=select('#train');
trainButton.mousePressed(()=>{
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

   //Each pixel has four values R,G,B,A -- we are accessing the fourth value(transparency) of each pixel
   for(let i=0;i<len;i++){       
      let bright=img.pixels[i*4];
      inputs[i]=(255-bright)/255.0;    //Taking the inverted results as our dataset has white skect on black background
   }

      let tinputs=tf.tensor2d([inputs])
      let guess=model.predict(tinputs).argMax(1).dataSync();   //argMax is used to find the index of the max value
      let classification=guess[0];  //dataSync() returns the data of a tensor as an array
  
      if(classification===CAT){
         console.log("Cat");
      }
      else if(classification===RAINBOW){
         console.log("rainbow");
      }
      else if(classification===TRAIN){
         console.log("train");
      }
   
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
      let labels=tys.argMax(1).dataSync();                  //The argMax method finds the maximum index of the element in a tensor                                                           and the argument passed is the axis of search

      for(let i=0;i<labels.length;i++){
         if(output[i]===labels[i]){
            correct++;
         }
      }
       predict=correct/labels.length;
   })
   return predict*100;
}

function trainEpoch(){
   return model.fit(xs,ys,{
      shuffle:true,
      epochs:10,
      validationSplit:0.1,
      callbacks:{
         onTrainBegin:()=>console.log('Training start'),
         onTrainEnd:()=>console.log('Training Ends'),
         onEpochEnd:(num,logs)=>{            
            console.log("Epoch "+num);
            console.log(logs.val_loss);
         }
      }

   })
}

