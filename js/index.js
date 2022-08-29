

var hand = { 'wood': 0, 'brick': 0, 'sheep': 0, 'wheat': 0, 'ore': 0 };

const resources = Object.keys(hand);
const buildings = [
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
        name: "Development",
        cost: {
            "sheep": 1,
            "wheat": 1,
            "ore": 1
        }
    },
    {
        name: "Road",
        cost: {
            "wood": 1,
            "brick": 1
        }
    }
]

// Creates the radio buttons to choose priority for sorting, is run immediately
function createPriorityRadioBtns(buildings){
    const btnNames = buildings.map(building => building.name);
    const priorityBox = document.getElementById('priority-box');
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
        priorityBox.appendChild(btnLabel);
        priorityBox.appendChild(btnItem);
    }
}
createPriorityRadioBtns(buildings);




//Checks how many times a single building can be built based on cards in hand, returns that value(number)
function canBuildTimes(hand, buildingName){
    const building = buildings.find(building => building.name === buildingName);//Find building in buildings with name value equal to buildingName (passed in)
    if(building==false){return 0}; //Return 0 if building doesn't exist
    const resourceFactors = resources.map(resource =>
        Math.floor(hand[resource] / building.cost[resource])).filter(f=>!isNaN(f)); // Create array with numbers dividing cards in hand by building cost, ignoring resources which don't apply
    console.log(resourceFactors);
    const min = resourceFactors.reduce((min, resourceFactor) => min > resourceFactor ? resourceFactor : min); // Look for the smallest number from above array, this is how many times building can be built
    return min;
}


/* Simple function, takes resource name(string), then increases that resource value on the form by 1 */
function addResource(resource) {
    document.getElementById(resource).value = Number(document.getElementById(resource).value) + 1; /* Notice: Had to convert string to num */
}


function handStringBuilder(hand) {
    // Hand String Builder
    var handString = "<b>Your hand is:</b><br> ";
    var handStringList = [];
    for (var resource in hand) {
        hand[resource] = document.getElementById(resource).value;
        if(hand[resource] != 0) //If you have a card of that research
            {handStringList.push(hand[resource]+" "+resource.charAt(0).toUpperCase()+resource.slice(1))}; // Add capitalized string to list of resources
    }
    handString += handStringList.join(', '); // Join resource list and format it, then add to the cardString

    return handString;
}

function buildStringBuilder(hand){
    //Building String Builder
    var buildNums = maxBuildingCount(hand);
    var buildString = "<br><br><b>You can build:</b><br>" + 
    "<img src='.\\img\\builds\\city.png' alt='city'> " + buildNums['City'] + " Cities " + 
    "<img src='.\\img\\builds\\settlement.png' alt='settlement'> " + buildNums['Settlement'] + " Settlements " +
    "<img src='.\\img\\builds\\road.png' alt='road'> " + buildNums['Road'] + " Roads " +
    "<img src='.\\img\\builds\\dcard.png' alt='dcard'> " + buildNums['Development'] + " Dev Cards <br><br>";

    return buildString;
}

/* Takes values from form, then creates a string to tell you what cards you have in hand */
function submitButton() {

    cardString = handStringBuilder(hand)+buildStringBuilder(hand);

    document.getElementById('cardinfo').innerHTML = cardString; // Display the cardstring

    var priority = document.forms.catanform.priority.value;
    console.log(priority);
    getBuildCombination(hand,priority);
}

/* Resets all the resource input fields, and resets the cardinfo string */
function clearButton() {
    for (var resource in hand) {
        document.getElementById(resource).value = 0
    }
    document.getElementById('cardinfo').innerHTML = "Please select the cards in your hand below"
}

// Takes your hand of resources, runs it through the canBuildTimes method to return an array of how many of each building you can build maximum
function maxBuildingCount(hand){
    const buildList = buildings.map(building=>building.name).reduce( // Create array with building names
        (build, name)=>{build[name]=canBuildTimes(hand,name); // For each building name, assign building a value based on canBuildTimes
        return build; // Return the array, complete with building and number of times building is built 
        }, {});
    return buildList;
}


function getBuildCombination(hand,buildFocus){
    
}