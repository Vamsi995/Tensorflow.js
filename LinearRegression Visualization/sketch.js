//Find the mean and the variance of the points with different colors

let x_vals=[];
let y_vals=[];
let ymean;
let xmean;
let cov_y;
let cov_x;

let m;
let b;

const learningRate=0.2;
// sgd=Stochastic Gradient Descent
let optimizer;

function preload(){
   optimizer=tf.train.sgd(learningRate);
}

function setup(){
createCanvas(400,400);

   m=tf.variable(tf.scalar(random(1)));
   b=tf.variable(tf.scalar(random(1)));

}

function draw(){
   

   tf.tidy(()=>{
      if(x_vals.length>0){
         const ys=tf.tensor1d(y_vals);
         optimizer.minimize(()=>loss(predict(x_vals),ys));
      }
   });
   
   background(0);
   stroke(255);
   strokeWeight(8);
   
   for(let i=0;i<x_vals.length;i++){
      let px=map(x_vals[i],0,1,0,width);
      let py=map(y_vals[i],0,1,height,0);
      let xm=map(xmean,0,1,0,width);
      let ym=map(ymean,0,1,height,0);
      let xv=map(cov_x,0,1,0,width);
      let yv=map(cov_y,0,1,height,0);
   
      point(px,py);

      if(x_vals.length>1){
         fill(255,0,0);
         stroke(255,0,0);
         point(xm,ym);
         stroke(0,255,0);
         point(xv,yv);
         fill(255);
         stroke(255);
      }
   }


      const xs=[0,1];
   const ys=tf.tidy(()=>predict(xs));
   // ys.print();
   let x1=map(xs[0],0,1,0,width);
   let x2=map(xs[1],0,1,0,width);
   
   let lineY=ys.dataSync();
   let y1=map(lineY[0],0,1,height,0);
   let y2=map(lineY[1],0,1,height,0);
   strokeWeight(2);
line(x1,y1,x2,y2);
   ys.dispose();

   if(x_vals.length!=0){
      mean(x_vals,y_vals);
      variance(x_vals,y_vals);
   }

}


//Calculates the variance sx and sy of the list of x_vals and y_vals seperately
function variance(x_vals,y_vals){

   tf.tidy(()=>{
      let x_values=tf.tensor1d(x_vals);
      let y_values=tf.tensor1d(y_vals);

      let mean_x=x_values.mean().dataSync();
      let mean_y=y_values.mean().dataSync();

       cov_x=x_values.sub(mean_x).square().mean().dataSync();
       cov_y=x_values.sub(mean_y).square().mean().dataSync();
   })



}

//Calculates the mean of x_vals and y_vals 
function  mean(x_vals,y_vals){

   tf.tidy(()=>{
      let x_values=tf.tensor1d(x_vals);
      let y_values=tf.tensor1d(y_vals);

      let x=x_values.mean();
      let y=y_values.mean();
   
       xmean=x.dataSync();
       ymean=y.dataSync();
   })

   


}

//Getting the points on mouse click
function mousePressed(){
   let x=map(mouseX,0,width,0,1);
   let y=map(mouseY,0,height,1,0);

   x_vals.push(x);
   y_vals.push(y);
}



//Taking the whole xs array and performing y=mx+b for each one using tensors
//Our guess(y) for each x
function predict(x){
   const xs=tf.tensor1d(x);
   //y=mx+b
   const ys=xs.mul(m).add(b);
   return ys;
}

//returns the mean of the loss function
function loss(pred,labels){
   return pred.sub(labels).square().mean(); 
}








