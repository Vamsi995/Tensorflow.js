/*
   MoreToLearn 
   nextFrame()
   EventLoop

*/


let model;

//Vaiables for drawing
let resolution=20;
let cols;
let rows;

//Tensor of inputs
let xs;

//To store all the x-coordinates
let inputs=[];

//Training data
const train_xs=tf.tensor2d([
   [0,0],
   [1,0],
   [0,1],
   [1,1]
]);
const train_ys=tf.tensor2d([
   [0],
   [1],
   [1],
   [0]
]);




function setup(){
createCanvas(400,400);

   //Create the input data
 cols=width/resolution;
 rows=height/resolution;
for(let i=0;i<cols;i++){
   for(let j=0;j<rows;j++){
      let x1 = i/cols;
      let x2=j/rows;
      inputs.push([x1,x2]);
   }
}
 xs=tf.tensor2d(inputs);


//Making the model
model=tf.sequential();
let hidden=tf.layers.dense({
   units:2,
   inputShape:2,
   activation:'sigmoid'
});

model.add(hidden);

let outputs=tf.layers.dense({
   units:1,
   activation:'sigmoid'
});

model.add(outputs);


const sgdOpt=tf.train.adam(0.1);

model.compile({
   optimizer:sgdOpt,
   loss:'meanSquaredError'
});

//Calling the train function which in turn calls trainModel()-->which returns a promise(runs in the background)
setTimeout(train,10);
}

 function trainModel(){
   return model.fit(train_xs,train_ys,{
   shuffle:true,
   epochs:2
});
  
}

function train(){
      trainModel().then(result=>{
        console.log(result.history.loss[0]);
        setTimeout(train,10);
      });
}

function draw(){
   
   background(0);
  
   tf.tidy(()=>{  
      let ys=model.predict(xs)
      let y_values=ys.dataSync();
      let index=0;
   for(let i=0;i<cols;i++){
      for(let j=0;j<rows;j++){
         let br=y_values[index]*255;
         fill(br);
         rect(i*resolution,j*resolution,resolution,resolution);
         fill(255-br);
         textAlign(CENTER,CENTER);
         textSize(8);
         text(nf(y_values[index],1,2),i*resolution+resolution/2,j*resolution+resolution/2);
         index++;
      }
   }

});
}
