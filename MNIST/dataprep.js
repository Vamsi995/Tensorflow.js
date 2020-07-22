function prepareData(category,trainingData, testingData, trainingLabels, testingLabels){
   
   //Creating array objects inside the respective category
   category.training=[];
   category.testing=[];
   category.array=[];
   category.array1=[];

  
   for(let i=0;i<10000;i++){
      let offset=i*len;
 
      category.training[i]=trainingData.bytes.subarray(offset,offset+len);
         category.training[i].label=String(trainingLabels.bytes[i]);

           
         

   }

   // for(let i=10000;i<20000;i++){
   //    let offset=i*len;
 
   //    category.training[i]=trainingData.bytes.subarray(offset,offset+len);
   //       category.training[i].label=String(trainingLabels.bytes[i]);

   //          let mat=[]; 
   //          let feed = data.training[i];
   //          for(let j=0;j<784;j+=28){
   //             let temp1=[];
   //             for(let k=0;k<28;k++){
   //                temp1[k]=[(feed[j+k])/255.0];
   //             }
   //             mat.push(temp1);
   //          }
   //          data.array.push(mat);  
         

   // }

   // for(let i=20000;i<30000;i++){
   //    let offset=i*len;
 
   //    category.training[i]=trainingData.bytes.subarray(offset,offset+len);
   //       category.training[i].label=String(trainingLabels.bytes[i]);

   //          let mat=[]; 
   //          let feed = data.training[i];
   //          for(let j=0;j<784;j+=28){
   //             let temp1=[];
   //             for(let k=0;k<28;k++){
   //                temp1[k]=[(feed[j+k])/255.0];
   //             }
   //             mat.push(temp1);
   //          }
   //          data.array.push(mat);  
         

   // }

   for(let i=0;i<test_data;i++){
      let offset=i*len;
      category.testing[i]=testingData.bytes.subarray(offset,offset+len);
      category.testing[i].label=String(testingLabels.bytes[i]);

      
   
   }





}