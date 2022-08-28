

var resources = { 'wood': 0, 'brick': 0, 'sheep': 0, 'wheat': 0, 'ore': 0 };


/* Simple function, takes string of resource name, then increases that resource value on the form by 1 */
function addResource(resource) {
    document.getElementById(resource).value = Number(document.getElementById(resource).value) + 1; /* Notice: Had to convert string to num */
}

/* Takes values from form, then creates a string to tell you what cards you have in hand */
function submitButton() {
    var cardString = "<b>Your resources are:</b><br>| ";
    for (var resource in resources) {
        resources[resource] = document.getElementById(resource).value;
        cardString += (resources[resource]+" - "+resource.toUpperCase() + " | ");
    }
    var buildNums = basicBuilder();
    cardString += "<br><br><b>You can build:</b><br>" + 
    "<img src='.\\img\\builds\\city.png' alt='city'> " + buildNums['cities'] + " Cities " + 
    "<img src='.\\img\\builds\\settlement.png' alt='settlement'> " + buildNums['settlements'] + " Settlements " +
    "<img src='.\\img\\builds\\road.png' alt='road'> " + buildNums['roads'] + " Roads " +
    "<img src='.\\img\\builds\\dcard.png' alt='dcard'> " + buildNums['dcards'] + " Dev Cards ";
    document.getElementById('cardinfo').innerHTML = cardString;
}

/* Resets all the resource input fields, and resets the cardinfo string */
function clearButton() {
    for (var resource in resources) {
        document.getElementById(resource).value = 0
    }
    document.getElementById('cardinfo').innerHTML = "Please select the cards in your hand below"
}

/* Basic builder, need to change to better formula */
function basicBuilder() {
    var buildDict = { 'roads': 0, 'settlements': 0, 'cities': 0, 'dcards': 0 }
    while (resources['wheat'] >= 2 && resources['ore'] >= 3) {
        resources['wheat'] -= 2;
        resources['ore'] -= 3;
        buildDict['cities'] += 1;
    }
    while (resources['wood'] >= 1 && resources['brick'] >= 1 && resources['sheep'] >= 1 && resources['wheat'] >= 1) {
        resources['wood'] -= 1;
        resources['brick'] -= 1;
        resources['sheep'] -= 1;
        resources['wheat'] -= 1;
        buildDict['settlements'] += 1;
    }
    while (resources['sheep'] >= 1 && resources['wheat'] >= 1 && resources['ore'] >= 1) {
        resources['sheep'] -= 1;
        resources['wheat'] -= 1;
        resources['ore'] -= 1;
        buildDict['dcards'] += 1;
    }
    while (resources['wood'] >= 1 && resources['brick'] >= 1) {
        resources['wood'] -= 1;
        resources['brick'] -= 1;
        buildDict['roads'] += 1;
    }
    return buildDict;
}