

var hand = { 'wood': 0, 'brick': 0, 'sheep': 0, 'wheat': 0, 'ore': 0 };
var bought = {};

const resources = Object.keys(hand);
var buildings = [
    {
        name: "City",
        cost: {
            "wheat": 2,
            "ore": 3
            }
    },
    {
        name: "Settlement",
        cost: {
            "wood": 1,
            "brick": 1,
            "wheat": 1,
            "sheep": 1
        }
    },
    {
        name: "Road",
        cost: {
            "wood": 1,
            "brick": 1
        }
    },
    {
        name: "Development",
        cost: {
            "sheep": 1,
            "wheat": 1,
            "ore": 1
        }
    },
]


var plusBuildings = [
    {
        name: "Knight",
        cost: {
            "sheep": 1,
            "wheat": 1,
            "ore": 1,
        }
    },
    {
        name: "Barracks",
        cost: {
            "wood": 2,
            "sheep": 1,
            "ore": 2,
        }
    },
    {
        name: "Market",
        cost: {
            "wood": 2,
            "sheep": 1,
            "brick": 2,
        }
    },
    {
        name: "Wall",
        cost: {
            "brick": 1,
            "wheat": 1,
        }
    },
    {
        name: "Wall T2",
        cost: {
            "wheat": 2,
            "ore": 2,
        }
    },
    {
        name: "Castle",
        cost: {
            "sheep": 2,
            "wheat": 2,
            "ore": 2,
            "brick": 2,
            "wood": 2,
        }
    }
]



//Checks how many times a single building can be built based on cards in hand, returns that value(number)
function canBuildTimes(hand, buildingName){
    const building = buildings.find(building => building.name === buildingName);//Find building in buildings with name value equal to buildingName (passed in)
    if(building==false){return 0}; //Return 0 if building doesn't exist
    const resourceFactors = resources.map(resource =>
        Math.floor(hand[resource] / building.cost[resource])).filter(f=>!isNaN(f)); // Create array with numbers dividing cards in hand by building cost, ignoring resources which don't apply
    const min = resourceFactors.reduce((min, resourceFactor) => min > resourceFactor ? resourceFactor : min); // Look for the smallest number from above array, this is how many times building can be built
    return min;
}


/* Simple function, takes resource name(string), then increases that resource value on the form by 1 */
function addResource(resource) {
    document.getElementById(resource).value = Number(document.getElementById(resource).value) + 1; /* Notice: Had to convert string to num */
}


function boughtStringBuilder(){
    var boughtString = "<br><br><b>You have built:</b><div class='boughtbuildings'>";
    for(building in bought){
        if(bought[building]!=0){boughtString +=`<div class='buildingcard'><img src='./img/builds/${building}.png' alt='${building}
        ' onerror='javascript:this.src="./img/builds/Default.png"' onclick='sellBuilding("${building}")'><br><b>${bought[building]}<br>${building}(s)</b></div>`};
    }
    boughtString += "</div><br>";
    
    return boughtString;
}

// Returns a string of all the cards in your hand
function handStringBuilder(hand,submit=false) {
    // Hand String Builder
    var handString = "<b>Your hand is:</b><br> ";
    var handStringList = [];
    if(submit){ // If submit button pressed, use values from form to fill out the hand
        for (var resource in hand) {
            hand[resource] = document.getElementById(resource).value;
            if(hand[resource] != 0) //If you have a card of that research
                {handStringList.push(hand[resource]+" "+resource.charAt(0).toUpperCase()+resource.slice(1))}; // Add capitalized string to list of resources
        }
    }else{ // If no submit button pressed, don't add resources to hand
        for (var resource in hand){
            if(hand[resource] != 0)
                {handStringList.push(hand[resource]+" "+resource.charAt(0).toUpperCase()+resource.slice(1))};
        }
    }
    handString += handStringList.join(', '); // Join resource list and format it, then add to the cardString

    return handString;
}

// Returns a string of all the buildings possible to build, (dumb builder)
function buildStringBuilder(hand){
    //Building String Builder
    var buildNums = maxBuildingCount(hand);
    var buildString = "<br><br><b>You can build:</b><div class='buildingitems'>";
    for(building of buildings){ //Create a string for each building (including image), then add to string
        if(buildNums[building.name]!=0){buildString +=`<div class='buildingcard'><img src='./img/builds/${building.name}.png' alt='${building.name}
        ' onerror='javascript:this.src="./img/builds/Default.png"' onclick='buyBuilding("${building.name}")'><br><b>${buildNums[building.name]}<br>${building.name}(s)</b></div>`};
    };
    buildString += "</div>";

    return buildString;
}

/* Takes values from form, then creates a string to tell you what cards you have in hand */
function generateDisplayText(submit=false) {
    if(submit){
        bought={}
        var cardString = boughtStringBuilder()+handStringBuilder(hand,true)+buildStringBuilder(hand);
    }else{
        var cardString = boughtStringBuilder()+handStringBuilder(hand,false)+buildStringBuilder(hand);
    };

    document.getElementById('cardinfo').innerHTML = cardString; // Display the cardstrings, hand+buildings
}

/* Resets all the resource input fields, and resets the cardinfo string */
function clearButton() {
    for (var resource in hand) {
        document.getElementById(resource).value = 0;
    }
    bought = {};
    document.getElementById('cardinfo').innerHTML = "Please select the cards in your hand below";
}

// Takes your hand of resources, runs it through the canBuildTimes method to return an array of how many of each building you can build maximum
function maxBuildingCount(hand){
    const buildList = buildings.map(building=>building.name).reduce( // Create array with building names
        (build, name)=>{build[name]=canBuildTimes(hand,name); // For each building name, assign building a value based on canBuildTimes
        return build; // Return the array, complete with building and number of times building is built 
        }, {});
    return buildList;
}

// If the checkbox is checked, add catanplus buildings. If unchecked, remove catanplus buildings
function catanPlus(){
    if(document.getElementById('catanplus').checked){
        for(building of plusBuildings){
            buildings.push(building); // Add each catanplus building
        }
        createPriorityRadioBtns(buildings); // Regenerate the priority buttons
    }else{
        buildings = buildings.filter( (building) => !plusBuildings.includes(building) ); // Filter the catanplus buildings
        createPriorityRadioBtns(buildings); // Regenerate the priority buttons
    }
}

function buyBuilding(buildingName){
    const building = buildings.find(building => building.name === buildingName);// Find building in buildings with name value equal to buildingName (passed in)
    Object.entries(building.cost).forEach(([key, value]) => hand[key] -= value);// Subtract from hand the cost of each building cost entry
    bought[building.name] = (bought[building.name] || 0)+1; // If building has been bought, add 1. OR take the number 0, then add one
    generateDisplayText();
}

function sellBuilding(buildingName){
    const building = buildings.find(building => building.name === buildingName);// Find building in buildings with name value equal to buildingName (passed in)
    Object.entries(building.cost).forEach(([key, value]) => hand[key] += value);// Add to hand the cost of each building cost entry
    bought[building.name] -=1; // Subtract 1 from bought building
    generateDisplayText();
}


function getBuildCombination(hand,buildFocus){
}


// // Creates the radio buttons to choose priority for sorting, is run immediately
// function createPriorityRadioBtns(buildings){
//     const btnNames = buildings.map(building => building.name);
//     const priorityBox = document.getElementById('priority-box');
//     while(priorityBox.firstChild){
//         priorityBox.removeChild(priorityBox.firstChild) // Clear out any existing buttons
//     }
//     for(i in btnNames){
//         btnItem = document.createElement('input');
//         btnItem.type = 'radio';
//         btnItem.id = btnNames[i];
//         btnItem.name = 'priority';
//         btnItem.value = btnNames[i];
//         btnItem.checked = (i==0);
//         btnLabel = document.createElement('label');
//         btnLabel.htmlFor = btnNames[i];
//         btnLabel.innerHTML = btnNames[i]+' ';
//         priorityBox.appendChild(btnLabel);
//         priorityBox.appendChild(btnItem);
//     }
// }
// createPriorityRadioBtns(buildings);