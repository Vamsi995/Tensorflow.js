/*
   LayersAPI --> Keras in python
   
   Methods
   tf.model()

   tf.sequential() -->Any model where outputs of one layer is input to next 
   layer --> FeedForwardNN
   
   tf.layers.dense() --> A dense layer is terminology for a fully connected layer  

   a.compile() --> a is a sequential or model object

   fit() -->for training the model-->returns a promise

   predict() -->for getting the outputs from the NN
*/



//This is the model
const model=tf.sequential();

//Create the hidden layer(configure)
//dense is a fully connected layer
//inputShape is req for the first layer which is being added 
const hidden=tf.layers.dense({
   units:4,
   inputShape:[2],
   activation:'sigmoid'

});
//Add the layer to the model
model.add(hidden);

//Create another layer
const output=tf.layers.dense({
   units:1,
   // inputShape:[4],//optional
   //As the input shape is inferred from the previous layer
   activation:'sigmoid'

});

//Add the layer to the model
model.add(output);

//An optimizer using gradient descent 
const sgdOpt=tf.train.sgd(0.01);

//I'm done configuring the model so complie it
model.compile({
   optimizer:sgdOpt,
   loss:'meanSquaredError' //or we can reference the function directly tf.losses.meanSquaredError 
});

const xs=tf.tensor2d([
   [0,0],
   [0.5,0.5],
   [1,1]
]);

const ys=tf.tensor2d([
   [1],
   [0.5],
   [0]
]);

// const config={
//    verbose:true,
//    epochs:5
// }

const config={
   shuffle:true,
   epochs:10
}


train().then(()=>{
   console.log('training is complete');
   let tys=model.predict(xs);
   tys.print();

   });
// model.fit(xs,ys).then(response=>console.log(response));
async function train(){
   for(let i=0;i<1000;i++){
   const response=await model.fit(xs,ys,config);
   console.log(response.history.loss[0]);
}
}






// const xs=tf.tensor2d([
//    [0.25,0.92],
//    [0.95,0.7],
//    [0.55,0.62]
// ]);
// let ys=model.predict(inputs);
// ys.print();



 