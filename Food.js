class Food{
    constructor(){
        this.foodStock=null;
        this.lastFed=null;
        this.milkBottle=loadImage("images/Milk.png");
    }
    getFoodStock(){
        var databaseRef=database.ref("Food");
        databaseRef.on("value", function(data){
            this.foodStock=data.val();
        })
    }
    updateFoodStock(x){
        database.ref("/").update({
            Food:x
        })
    }
 updatelastFed(a){
    database.ref("/").update({
        lastFed:a
    })
    }
    display(){
        var x=30,y=80;
        for(var i=0;i<foodS;i++){
        if(i%10===0){
            x=30;
            y=y+45;
        }
        image(this.milkBottle,x,y,50,50)
        x=x+30;
        
        }
       

    }
}