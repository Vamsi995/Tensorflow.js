let r,g,b;
let database;
let bodyElement;
let rgbDiv;
function pickColor(){
    r=floor(random(255));
    g=floor(random(255));
    b=floor(random(255));
    background(r,g,b);
    updateBodyBG();
}
function setup(){

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
  







   createCanvas(200, 200).parent('#root');
   rgbDiv = createDiv().parent('#root');
   bodyElement = document.body;
    pickColor();

    rgbDiv.html(`R:${r} G:${g} B:${b}`);
   
   let buttons=[];
   buttons.push(createButton('red-ish').parent('#root').class('red-ish'));
   buttons.push(createButton('green-ish').parent('#root').class('green-ish'));
   buttons.push(createButton('blue-ish').parent('#root').class('blue-ish'));
   buttons.push(createButton('orange-ish').parent('#root').class('orange-ish'));
   buttons.push(createButton('yellow-ish').parent('#root').class('yellow-ish'));
   buttons.push(createButton('pink-ish').parent('#root').class('pink-ish'));
   buttons.push(createButton('purple-ish').parent('#root').class('purple-ish'));
   buttons.push(createButton('brown-ish').parent('#root').class('brown-ish'));
   buttons.push(createButton('grey-ish').parent('#root').class('grey-ish'));


   for(let i=0;i<buttons.length;i++){

    buttons[i].mousePressed(sendData);

   }


}

function sendData(){


   let colorDatabase=database.ref('colors');

   var data={
      r:r,
      g:g,
      b:b,
      label:this.html()
   }

   console.log('saving data');
   console.log(data);
   // console.log(colorDatabase);

   let color=colorDatabase.push(data,finished);
   console.log("Firebase generated key: "+color.key);

   function finished(err){
      if(err){
         console.error("ooops, something went wrong.");
         console.error(err);
      }
      else {
         console.log(('Data saved successfully'));
         pickColor();
      }
   }

   console.log(this.html());
   
}

function updateBodyBG(){
   bodyElement.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 1.0)`;
 }
 