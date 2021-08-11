class Food{
    constructor(){
        this.image = loadImage("Images/Milk.png");
        this.foodStock=0;
    }

    getFoodStock(){
        return this.foodStock;
    }

    updateFoodStock(){
        var stock = this.foodStock+1;
        var foodStockRef = database.ref('/');
        foodStockRef.update({
            Food : stock
        })
    }

    deductFood(){
        var stock;
        if(this.foodStock<=0){
            stock = 0;
        }else{
            stock = this.foodStock-1;
        }
        var foodStockRef = database.ref('/');
        foodStockRef.update({
            Food : stock
        })
    }

    display(){

        var x=250;
        var y=150;

        if(this.foodStock!=0){
            
            for(var i=0; i<this.foodStock ; i++){
                console.log(" i == " + i);
                if(i%10 === 0){
                    console.log("under modulus");
                    y=y+30;
                    x=250;
                }
               
                console.log("x = " + x);
                console.log("y = "+ y);

                imageMode(CENTER);
                image(this.image,x,y,70,70); 
                x = x+30;
            }
        }
    }

    updateLastFeedTime(){
        var lastFeedTime = lastFeed ;
        var lastFeedRef = database.ref('/');
        lastFeedRef.update({
            LastFeed : hour() + ":" + minute()
        })
    }
}