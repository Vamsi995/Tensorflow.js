function prepareData(category,data,label){
   
   //Creating array objects inside the respective category
   category.training=[];
   category.testing=[];

   //
   for(let i=0;i<total_data;i++){
      let offset=i*len;
      let threshold=floor(0.8*total_data);
     
      //Holds the training data(800 subarrays each subarray represents an image)
      if(i<threshold){
      category.training[i]=data.bytes.subarray(offset,offset+len);
      category.training[i].label=label;

     }
     //Holds the testing data(200 images)
     else{
      category.testing[i-threshold]=data.bytes.subarray(offset,offset+len);
      category.testing[i-threshold].label=label;
     }
   }
}