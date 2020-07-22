class bar{
   constructor(x,y,z){
      this.x=x;
      this.y=y;
      this.width=z;
   }

   display(){
      stroke(255);
      fill(255);
      rect(0,this.y,10,this.width);
   }


}