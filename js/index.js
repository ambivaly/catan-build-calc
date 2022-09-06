

var hand = { 'wood': 0, 'brick': 0, 'sheep': 0, 'wheat': 0, 'ore': 0 };

const resources = Object.keys(hand);
var buildings = [
    {
        name: "City",
        cost: {
            "wheat": 2,
            "ore": 3
            },
        canBuy: 0,
        bought: 0
    },
    {
        name: "Settlement",
        cost: {
            "wood": 1,
            "brick": 1,
            "wheat": 1,
            "sheep": 1
        },
        canBuy: 0,
        bought: 0
    },
    {
        name: "Road",
        cost: {
            "wood": 1,
            "brick": 1
        },
        canBuy: 0,
        bought: 0
    },
    {
        name: "Development",
        cost: {
            "sheep": 1,
            "wheat": 1,
            "ore": 1
        },
        canBuy: 0,
        bought: 0
    },
]


var plusBuildings = [
    {
        name: "Knight",
        cost: {
            "sheep": 1,
            "wheat": 1,
            "ore": 1,
        },
        canBuy: 0,
        bought: 0
    },
    {
        name: "Barracks",
        cost: {
            "wood": 2,
            "sheep": 1,
            "ore": 2,
        },
        canBuy: 0,
        bought: 0
    },
    {
        name: "Market",
        cost: {
            "wood": 2,
            "sheep": 1,
            "brick": 2,
        },
        canBuy: 0,
        bought: 0
    },
    {
        name: "Wall",
        cost: {
            "brick": 1,
            "wheat": 1,
        },
        canBuy: 0,
        bought: 0
    },
    {
        name: "Wall T2",
        cost: {
            "wheat": 2,
            "ore": 2,
        },
        canBuy: 0,
        bought: 0
    },
    {
        name: "Castle",
        cost: {
            "sheep": 2,
            "wheat": 2,
            "ore": 2,
            "brick": 2,
            "wood": 2,
        },
        canBuy: 0,
        bought: 0
    }
]
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Hand Functions ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* Adds 1 to a resource field */
function addResource(resource) {
    document.getElementById(resource).value = Number(document.getElementById(resource).value) + 1; /* Notice: Had to convert string to num */
}

/* Updates the hand with the values from the form */
function updateHand(submit=false) {
    if(submit){
        for (var resource in hand) {
            hand[resource] = document.getElementById(resource).value;
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// String Builders ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* Returns a string of all the cards in your hand */
function handStringBuilder() {
    // Hand String Builder
    var handString = "<b>Your hand is:</b><br> ";
    var handStringList = [];
    for (var resource in hand) {
        if(hand[resource] != 0) {
            handStringList.push(hand[resource]+" "+resource.charAt(0).toUpperCase()+resource.slice(1))}; // Add capitalized string to list of resources
        }
    handString += handStringList.join(', ');
    
    return handString;
}

/* Returns a string for buildings that have been built */
function boughtStringBuilder(){
    var boughtString = "<br><br><b>You have built:</b><div class='boughtbuildings'>";
    for(building of buildings){
        if(building.bought!=0){boughtString +=`<div class='buildingcard'><img src='./img/builds/${building.name}.png' alt='${building.name}
        ' onerror='javascript:this.src="./img/builds/Default.png"' onclick='sellBuilding("${building.name}")'><br><b>${building.bought}<br>${building.name}(s)</b></div>`};
    }
    boughtString += "</div><br>";
    
    return boughtString;
}

/* Returns a string for the buildings that you can build */
function buildStringBuilder(){
    var buildString = "<br><br><b>You can build:</b><div class='buildingitems'>";
    for(building of buildings){ //Create a string for each building (including image), then add to string
        if(building.canBuy!=0){buildString +=`<div class='buildingcard'><img src='./img/builds/${building.name}.png' alt='${building.name}
        ' onerror='javascript:this.src="./img/builds/Default.png"' onclick='buyBuilding("${building.name}")'><br><b>${building.canBuy}<br>${building.name}(s)</b></div>`};
    };
    buildString += "</div>";
    return buildString;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Building Functions ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*Checks how many times a single building can be built based on cards in hand, returns that value(number) */
function canBuildTimes(hand, buildingName){
    const building = buildings.find(building => building.name === buildingName);//Find building in buildings with name value equal to buildingName (passed in)
    if(building==false){return 0}; //Return 0 if building doesn't exist
    const resourceFactors = resources.map(resource =>
        Math.floor(hand[resource] / building.cost[resource])).filter(f=>!isNaN(f)); // Create array with numbers dividing cards in hand by building cost, ignoring resources which don't apply
    const min = resourceFactors.reduce((min, resourceFactor) => min > resourceFactor ? resourceFactor : min); // Look for the smallest number from above array, this is how many times building can be built
    return min;
}

/* Updates each building with how many times it can be built */
function updateBuildings(submit=false){
    for(building of buildings){
        building.canBuy = canBuildTimes(hand, building.name); // Set canBuy for resource to number of times it can be built
        if(submit){
            building.bought = 0; // If submit pressed, reset bought buildings to 0
        }
    }
}

/* Adds 1 to building.bought, subtracts resources from hand */
function buyBuilding(buildingName, amount=1, manual=true){
    for(building of buildings){
        if(building.name === buildingName){
            building.bought += amount;
            Object.entries(building.cost).forEach(([key, value]) => hand[key] -= value*amount); // Subtract from hand the cost of each building cost entry
            updateBuildings();
        }
    }

    if(manual){
        generateDisplayText(); // Regenerates the display
    };
}

/* Subtracts 1 from building.bought, adds resources back to hand */
function sellBuilding(buildingName, amount=1, manual=true){
    for(building of buildings){
        if(building.name === buildingName){
            building.bought -= amount;
            Object.entries(building.cost).forEach(([key, value]) => hand[key] += value*amount); // Add to hand the cost of each building cost entry
            updateBuildings();
        }
    };

    if(manual){
        generateDisplayText(); // Regenerates the display
    };
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Button Functions /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* Updates hand/buildings based on form inputs, then generates HTML based on those updates in the "cardinfo" div */
function generateDisplayText(submit=false) {
    updateHand(submit);
    updateBuildings(submit);
    var cardString = boughtStringBuilder()+handStringBuilder(submit)+buildStringBuilder();

    document.getElementById('cardinfo').innerHTML = cardString; // Display the cardstrings, hand+buildings
}

/* Resets all of the values for resources in your hand, and replaces the "cardinfo" div with generic text */
function clearButton() {
    for (var resource in hand) {
        document.getElementById(resource).value = 0;
    }
    document.getElementById('cardinfo').innerHTML = "Please select the cards in your hand below";
}

/* If the checkbox is checked, add catanplus buildings. If unchecked, remove catanplus buildings */
function catanPlus(){
    if(document.getElementById('catanplus').checked){
        for(building of plusBuildings){
            buildings.push(building); // Add each catanplus building
        }
        createPriorityRadioBtns(); // Regenerate the priority buttons
    }else{
        buildings = buildings.filter( (building) => !plusBuildings.includes(building) ); // Filter the catanplus buildings
        createPriorityRadioBtns(); // Regenerate the priority buttons
    }
}

/* Builds cards based on selected priority button */
function priorityBuild(){
    var buildFocus = document.querySelector('input[name="priority"]:checked').value;
    getBuildCombination(buildFocus);
    generateDisplayText();
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// In Development Functions /////////////////////////////////////////////////////////////////////////////////////////////////


function getBuildCombination(buildFocus){
    //console.log(buildFocus);
    var priorityBuilding = buildings.find(building => building.name === buildFocus);
    if(priorityBuilding.canBuy != 0) {
        buyBuilding(priorityBuilding.name, priorityBuilding.canBuy, false);
    }
    for(building of buildings){
        if(building.canBuy != 0){
            buyBuilding(building.name, building.canBuy, false);
        }
    }
}


/* Creates the radio buttons to choose priority for sorting, is run immediately */
function createPriorityRadioBtns(){
    const btnNames = buildings.map(building => building.name);
    const priorityBox = document.getElementById('priority-box');
    while(priorityBox.firstChild){
        priorityBox.removeChild(priorityBox.firstChild) // Clear out any existing buttons
    }
    for(i in btnNames){
        btnItem = document.createElement('input');
        btnItem.type = 'radio';
        btnItem.id = btnNames[i];
        btnItem.name = 'priority';
        btnItem.value = btnNames[i];
        btnItem.checked = (i==0);
        btnLabel = document.createElement('label');
        btnLabel.htmlFor = btnNames[i];
        btnLabel.innerHTML = btnNames[i]+' ';
        priorityBox.appendChild(btnItem);
        priorityBox.appendChild(btnLabel);
    }
}

createPriorityRadioBtns();