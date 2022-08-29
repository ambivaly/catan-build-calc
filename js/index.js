

var hand = { 'wood': 0, 'brick': 0, 'sheep': 0, 'wheat': 0, 'ore': 0 };
console.log(hand['wood']);

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

//Checks how many times a single building can be built based on cards in hand, returns that value
function canBuildTimes(hand, buildingName){
    const building = buildings.find(building => building.name === buildingName);//Find building in buildings with name value equal to buildingName (passed in)
    if(building==false){return 0}; //Return 0 if building doesn't exist
    const resourceFactors = resources.map(resource =>
        Math.floor(hand[resource] / building.cost[resource])).filter(f=>!isNaN(f)); // Create array with numbers dividing cards in hand by building cost, ignoring resources which don't apply
    console.log(resourceFactors);
    const min = resourceFactors.reduce((min, resourceFactor) => min > resourceFactor ? resourceFactor : min); // Look for the smallest number from above array, this is how many times building can be built
    return min;
}






/* Simple function, takes string of resource name, then increases that resource value on the form by 1 */
function addResource(resource) {
    document.getElementById(resource).value = Number(document.getElementById(resource).value) + 1; /* Notice: Had to convert string to num */
}

/* Takes values from form, then creates a string to tell you what cards you have in hand */
function submitButton() {
    var cardString = "<b>Your hand is:</b><br>| ";
    for (var resource in hand) {
        hand[resource] = document.getElementById(resource).value;
        cardString += (hand[resource]+" - "+resource.charAt(0).toUpperCase()+resource.slice(1) + " | "); //Confusing way to capitalize the resource name
    }
    var buildNums = basicBuilder(hand);
    cardString += "<br><br><b>You can build:</b><br>" + 
    "<img src='.\\img\\builds\\city.png' alt='city'> " + buildNums['City'] + " Cities " + 
    "<img src='.\\img\\builds\\settlement.png' alt='settlement'> " + buildNums['Settlement'] + " Settlements " +
    "<img src='.\\img\\builds\\road.png' alt='road'> " + buildNums['Road'] + " Roads " +
    "<img src='.\\img\\builds\\dcard.png' alt='dcard'> " + buildNums['Development'] + " Dev Cards <br><br>";

    document.getElementById('cardinfo').innerHTML = cardString;
}

/* Resets all the resource input fields, and resets the cardinfo string */
function clearButton() {
    for (var resource in hand) {
        document.getElementById(resource).value = 0
    }
    document.getElementById('cardinfo').innerHTML = "Please select the cards in your hand below"
}

// Takes your hand of resources, runs it through the canBuildTimes method to return an array of how many of each building you can build maximum
function basicBuilder(hand){
    const buildList = buildings.map(building=>building.name).reduce( // Create array with building names
        (build, name)=>{build[name]=canBuildTimes(hand,name); // For each building name, assign building a value based on canBuildTimes
        return build; // Return the array, complete with building and number of times building is built 
        }, {});
    return buildList;
}