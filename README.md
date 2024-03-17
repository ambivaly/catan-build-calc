# catan-build-calc

## Settlers of Catan Hand Calculator
This project aims to provide a web-based tool for calculating what buildings you can construct in the board game Settlers of Catan based on the current resources in your hand. 
The calculator dynamically updates as you input your available resources, allowing you to see which buildings you can afford to build.

A live version is located at: [https://ambivaly.com/catan](https://ambivaly.com/catan)

## Git Installation
Clone the repository with the following command in your terminal:
```git clone https://github.com/ambivaly/catan-build-calc.git```

From there you should be able to open up the index.html file in your browser of choice.


## How to Use
- **Input Your Resources:** Use the form to input the number of each type of resource you have in your hand (wood, brick, sheep, wheat, and ore). Either type, manually increment, or click the cards themselves.
- **Submit Hand:** Click the submit button to submit the cards you ahve in your hand.
- **View Available Buildings:** The tool will display the buildings you can currently afford to build based on your available resources.
- **Build Priority:** You can choose a priority building type to focus on by selecting it from the radio buttons. 
- **Auto-Build:** The tool will attempt to build as many of the priority building type as possible before moving on to other buildings with what's left of your resources.
- **Custom Buildings:** You can also add custom buildings by providing their name, an image URL (optional), and resource costs.
- **Catan+:&** This is a custom Catan gamemode with additional buildings, added them by default with an optional checkbox.


## Files
- **index.html:** This HTML file contains the structure and form elements for inputting resources and displaying available buildings.
- **catan.js:** This JavaScript file provides the functionality for updating the hand, calculating available buildings, and handling user interactions.
- **catan.css:** This CSS file styles the HTML elements for a better user experience.
- **Images Folder:** Contains images of resources and buildings used in the application.
