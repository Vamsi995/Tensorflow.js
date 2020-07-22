function structure(){
   for(let i=0;i<10000;i++){
   let mat1=[];
   let feed1 = data.testing[i];
   for(let j=0;j<784;j+=28){
      let temp2=[];
      for(let k=0;k<28;k++){
         temp2[k]=[(feed1[j+k])/255.0];
      }
      mat1.push(temp2);
   }
   data.array1.push(mat1);  

}
}