var milkBottle;

function preLoad(){

    milkBottle = loadImage("images/Milk.png");
}

class Food{

    constructor(){

        var lastFed;
        var foodStock;
    }

    getFoodStock(){

        foodStockData = database.ref('Food');
        foodStockData.on("value", updateFoodStock);

        foodStock = data.val();
    }

    updateFoodStock(a){

        database.ref('Food').update({

            Food: Food + a
        })
    }

    deductFood(){

        database.ref('Food').update({

            Food: Food - 1
        })
    }
}

display(){
    image(milkBottle, 50, 50, 50, 50);
}