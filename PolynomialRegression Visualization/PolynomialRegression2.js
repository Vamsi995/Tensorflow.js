// /*
//    Without the mousedragging
//    Make something which has buttons with the buttons having degree of polynomial   
// */ 

// let x_vals=[];
// let y_vals=[];

// let a;
// let b;
// let c;
// let d;


// const learningRate=0.2;
// // sgd=Stochastic Gradient Descent
// let optimizer;

// function preload(){
//    optimizer=tf.train.adam(learningRate);
// }

// function setup(){
// createCanvas(400,400);

//    a=tf.variable(tf.scalar(random(-1,1)));
//    b=tf.variable(tf.scalar(random(-1,1)));
//    c=tf.variable(tf.scalar(random(-1,1)));
//    d=tf.variable(tf.scalar(random(-1,1)));

// }

// function draw(){

//    tf.tidy(()=>{
//       if(x_vals.length>0){
//          const ys=tf.tensor1d(y_vals);
//          optimizer.minimize(()=>loss(predict(x_vals),ys));
//       }
//    });

//    background(0);
//    stroke(255);
//    strokeWeight(8);
   
//    for(let i=0;i<x_vals.length;i++){
//       let px=map(x_vals[i],-1,1,0,width);
//       let py=map(y_vals[i],-1,1,height,0);
   
//       point(px,py);
   
//    }

//    //Many x values between -1,1 for drawwing the curve
//    const curveX=[];
//    for(let x=-1;x<1.01;x+=0.05){
//       curveX.push(x);
//    }


// //The values of y for all the x
// const ys=tf.tidy(()=>predict(curveX));
// const curveY=ys.dataSync();
   
//    //Drawing the curve
//    beginShape();
//    noFill();
//    stroke(255);
//    strokeWeight(2);
//    for(let i=0;i<curveX.length;i++){
//       let x=map(curveX[i],-1,1,0,width);
//       let y=map(curveY[i],-1,1,height,0);
//       vertex(x,y);
//    }
//    endShape();
//    ys.dispose();
// }

// //Getting the points on mouse click
// function mousePressed(){
//    let x=map(mouseX,0,width,-1,1);
//    let y=map(mouseY,0,height,1,-1);

//    x_vals.push(x);
//    y_vals.push(y);
// }



// //Taking the whole xs array and performing y=mx+b for each one using tensors
// //Our guess(y) for each x
// function predict(x){
//    const xs=tf.tensor1d(x);
//    //y=ax^3+bx^2+cx+d
// const ys=xs.pow(tf.scalar(3)).mul(a).add(xs.square().mul(b)).add(xs.mul(c)).add(d);
//    return ys;
// }

// //returns the mean of the loss function
// function loss(pred,labels){
//    return pred.sub(labels).square().mean(); 
// }