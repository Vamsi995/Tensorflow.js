class ball{
   constructor(x,y,xs,ys,r){
      this.x=x;
      this.y=y;
      this.xs=xs;
      this.ys=ys;
      this.r=r;

   }

   intersects(other){

      if(this.x<other.x){
         return false;
      }
      if(other.x>=this.x-this.r){
         if(this.y>other.y && this.y < other.y+other.width){
            other.width+=5;
            return true;
         }
      }
      return false;
   }

   update(){

      this.x += this.xs;
      this.y += this.ys;
      if (this.x >= 400  || this.x <= 0) {
        this.xs = -this.xs;
      }
      if (this.y >= 400   || this.y <= 0) {
        this.ys = -this.ys;
      }
      
   }
   
   display(){
      fill(255)
      ellipse(this.x,this.y,this.r);
   }
}