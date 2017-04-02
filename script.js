
//Passes through the array finding the largest element to the LEFT of each index if right == false
//Finds the largest element to the RIGHT of each index if right == true.
//does this by reversing the array first when right == true
function largestElement(array, right){
    if(right == true){
        array.reverse();
        var rightMax =[];
    }
    else{
        var leftMax = [];
    }
    var tempMax = array[0];

    for(var i in array){
            if(array[i] > tempMax){
                tempMax = array[i];
            }
            if(right == true){
                rightMax.push(tempMax);
            }
            else{
                leftMax.push(tempMax);
            }
            
        }
    if (right == true){
        array.reverse();
        rightMax.reverse();
        return rightMax;
    }
    else{
        return leftMax;
    }
}



$(document).ready(function(){
    //set up variables to hold the html that will be used later to create the divs
    var divHtml1 = "<div class='tower-container' id='container";
    var divHtml2 = "'><div class='tower' id='tower";
    var divHtml3 = "'></div></div>"
    //when the button is pressed an array is created by pulling the value from the text input
    //split function is used to separate values by commas
    //then parseInt is used in a for loop to convert the array of strings into an array of ints
    $("button").click(function(){
        var array = $("#array-input").val().split(",");
        for(var i in array){
            array[i] = parseInt(array[i]);
        }
        //check if the array length is 3 or longer
        if (array.length < 3){
        console.log("array is not long enough");
        return 1;
        }
        
        
        
//call the largestElement function to create an array storing the value of the largest element to the left of each index
        var leftMax = largestElement(array, false);
//Repeat to find largest element to right of each index
        var rightMax = largestElement(array, true);
//set up an empty array that will hold the amount of "water" above each "tower"
        var water = [];
//Iterate through the array and determine the "water level" at each index
//The "water level" is equal to the smaller of the largest tower to the left and largest tower to the right of each index

        var waterLevel=array[0];
        for (var i in array){
            
            waterLevel = Math.min(leftMax[i], rightMax[i]);
            //if the "tower" is above the "water level", then no water will be above it: water[i] = 0
            if (array[i] >= waterLevel){
                water[i] = 0;
            }
            //if the "tower" is below the "water level", then the amount of water above the tower will be equal to
            // the water level minus the height of the tower
            else{
                water[i] = waterLevel - array[i];
            }
        }
 //Now we have an array called "array" that has the heights of each tower, and an array called "water" that has the height of water above each tower      
// We need to determine which water "buckets" are largest      
        
        //I don't remember why I had to start bucketCounter at -1, but I know that it breaks when I change it to 0 
        //If you understand why please let me know
        var bucketCounter = -1;
        var buckets = [0];
        var bucketStart = [];

 //iterate through the water array       
            for (var i in water){
                
                if (water[i] == 0){
                    
                    continue;
                }
                //if the last water height was 0 and the current one is not, then we know we are at the start of a new "bucket"
                if (water[i-1] == 0){
                    //store the value of i in the bucket start array. This is a array of the indices where the buckets start
                    bucketStart.push(i);

                    bucketCounter++;
                    //incremement bucketCounter because you're in a "new" "bucket"
                    //and add the amount of water from the current tower into the current "bucket" (buckets[i])
                    buckets[bucketCounter] = water[i];
                    
                   
                    continue;
                    
                }
                //if the first two if statments are false it means we are currently in a bucket but not in a new bucket.
                //so we add the current water value to the bucket we're in
                buckets[bucketCounter] += water[i];
                    
                    
            }
        //find the which bucket is biggest and store the index of the beginning of the biggest bucket
        var biggestBucket = buckets[0];
        var biggestIndex = 0;
        //I just realized I didn't account for when multiple buckets are tied for "biggest"
        //Currently it would just set whichever one comes first as the "biggest"
        for (var i = 0; i < buckets.length; i++){
            if (buckets[i]> biggestBucket){
                biggestBucket = buckets[i];
                biggestIndex = i;
            }
        }


        

        //clear the container div by setting the contents equal to an empty string.
        $(".container").text("");
        //iterate over the array and make a div that will make a div that holds the tower plus the water above it
        for(var i in array){
            
            $(".container").append(divHtml1+i+divHtml2+i+divHtml3);
            

            //I multipllied the array values by 100 just to make it look better (because the widths are 100px)
            $("#tower"+i).css("height", array[i]*100+"px");
            $("#tower"+i).css("margin-top", water[i]*100+"px");
            $("#container"+i).css("height", (water[i]+array[i])*100+"px" ) ;  
        }

//finally I add the value of each bucket and give the biggest one a different class to make it a different color
        for(var i in bucketStart){
            if(i == biggestIndex){
                $("#container"+bucketStart[i]).prepend("<h1 class='red'>"+buckets[i]+"</h1>");
            }
            else{
                $("#container"+bucketStart[i]).prepend("<h2>"+buckets[i]+"</h2>");
            }
        }
    });
})