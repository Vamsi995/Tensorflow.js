// "YGdqOTDDmrbGm80gM5UHicxMBgS2"
let filter={
   "YGdqOTDDmrbGm80gM5UHicxMBgS2":true
}

let colorByLabel={
   'blue-ish':[],
   'red-ish':[],
   'grey-ish':[],
   'brown-ish':[],
   'orange-ish':[],
   'yellow-ish':[],
   'pink-ish':[],
   'purple-ish':[],
   'green-ish':[],
}

let label='blue-ish';



function setup(){

   createCanvas(400,400);

   var config = {
      apiKey: "AIzaSyDPekCKX4ee6h9NVR2lEITGAM0XIHn-c7c",
      authDomain: "color-classification.firebaseapp.com",
      databaseURL: "https://color-classification.firebaseio.com",
      projectId: "color-classification",
      storageBucket: "",
      messagingSenderId: "590040209608"
    };
    firebase.initializeApp(config);
    database=firebase.database();

    let ref=database.ref('colors');
    ref.once('value',gotData);//,errorData);
}

// function mousePressed(){

//    let i=floor(mouseX/10);
//    let j=floor(mouseY/10);
// let index=i+j*(width/10);

// let data=colorByLabel[label];
// console.log(data[index]);







// }

function gotData(results){
   // console.log(results.val());
   let data=results.val();

   //Processing the data
   let keys=Object.keys(data);
   // console.log(keys);

   // let uid_bycount={};
   // let users=[];

   // let userData=[];
   let allData={
      entries:[]
   };

   for(let key of keys){
      
      let record=data[key];
      let id=record.uid;
      // let col=color(record.r,record.g,record.b);//p5 color function creates a color with input rgb values


      // colorByLabel[record.label].push(record);
      // if(record.uid=="YGdqOTDDmrbGm80gM5UHicxMBgS2"){
      //    userData.push(record);

      if(!filter[id]){
         allData.entries.push(record);
      }
      
     

      }

      saveJSON(allData,'colorData.json');
   }
   // console.log(colorByLabel);

   // userData.sort((a,b)=>{
   //    if(a.label>b.label)
   //       return 1;
   //    return -1;
   // });


   // for(let entry of userData){
   //    let div=createDiv(entry.label);
   //    let colorBox=createDiv('');
   //    colorBox.parent(div);

   //    colorBox.size(10,10);
   //    colorBox.style('background-color',`rgb(${entry.r},${entry.g},${entry.b})`)
   // }







   // let blues=colorByLabel[label];
   // let x=0;
   // let y=0;
   // for(let i=0;i<blues.length;i++){
   //    noStroke();
   //    fill(blues[i].r,blues[i].g,blues[i].b);
   //    rect(x,y,10,10);
   //    x+=10;

   //    if(x>=width){
   //       x=0;
   //       y+=10;
   //    }
   // }



      // if(!uid_bycount[id]){
      //    uid_bycount[id]=1;
      //    users.push(id);
      // }
      // else{
      //    uid_bycount[id]++;
      // }


      // users.sort((a,b)=>{
      //    return (uid_bycount[a]-uid_bycount[b]);
      // })

      // for(let id of users){
      //    console.log(id+"  "+uid_bycount[id]);
      // }
      // console.log(record);
      // console.log(uid_bycount);
   

