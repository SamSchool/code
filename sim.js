var spaces = [
    {num: 0, type: "other", name: "Go", order: 0},
    {num: 0, type: "property", group: "brown", name: "Mediterranean", order: 1},
    {num: 0, type: "card", name: "Community Chest 1", order: 2},                                   
    {num: 0, type: "property", group: "brown", name: "Baltic", order: 3},
    {num: 0, type: "other", name: "Income Tax", order: 4},
    {num: 0, type: "property", group: "railroad", name: "Reading Railroad", order: 5},
    {num: 0, type: "property", group: "light blue", name: "Oriental", order: 6},      
    {num: 0, type: "card", name: "Chance 1", order: 7},           
    {num: 0, type: "property", group: "light blue", name: "Vermont", order: 8},            
    {num: 0, type: "property", group: "light blue", name: "Connecticut", order: 9},       
    {num: 0, type: "other", name: "Jail (visit)", order: 10},     
    {num: 0, type: "other", name: "Jail (jailed)", order: 11},     
    {num: 0, type: "property", group: "pink", name: "St. Charles", order: 12},         
    {num: 0, type: "property", group: "utility", name: "Electric Company", order: 13}, 
    {num: 0, type: "property", group: "pink", name: "States", order: 14},         
    {num: 0, type: "property", group: "pink", name: "Virginia", order: 15},         
    {num: 0, type: "property", group: "railroad", name:"Pennsylvania Railroad", order: 16}, 
    {num: 0, type: "property", group: "orange", name: "St. James", order: 17},          
    {num: 0, type: "card", name: "Community Chest 2", order: 18}, 
    {num: 0, type: "property", group: "orange", name: "Tennesse", order: 19},      
    {num: 0, type: "property", group: "orange", name: "New York", order: 20},      
    {num: 0, type: "other", name: "Free Parking", order: 21},    
    {num: 0, type: "property", group: "red", name: "Kentucky", order: 22},      
    {num: 0, type: "card", name: "Chance 2", order: 23},   
    {num: 0, type: "property", group: "red", name: "Indiana", order: 24},  
    {num: 0, type: "property", group: "red", name: "Illinois", order: 25},     
    {num: 0, type: "property", group: "railroad", name: "B. & O. Railroad", order: 26},
    {num: 0, type: "property", group: "yellow", name: "Atlantic", order: 27},      
    {num: 0, type: "property", group: "yellow", name: "Ventnor", order: 28},        
    {num: 0, type: "property", group: "utility", name: "Water Works", order: 29},    
    {num: 0, type: "property", group: "yellow", name: "Marvin Gardens", order: 30},  
    {num: 0, type: "other", name: "Go To Jail", order: 31},     
    {num: 0, type: "property", group: "green", name: "Pacific", order: 32},        
    {num: 0, type: "property", group: "green", name: "North Carolina", order: 33},   
    {num: 0, type: "card", name: "Community Chest 3", order: 34}, 
    {num: 0, type: "property", group: "green", name: "Pennsylvania Ave.", order: 35},      
    {num: 0, type: "property", group: "railroad", name: "Short Line Railroad", order: 36}, 
    {num: 0, type: "card", name: "Chance 3", order: 37},         
    {num: 0, type: "property", group: "dark blue", name: "Park Place", order: 38},     
    {num: 0, type: "other", name: "Luxury Tax", order: 39},     
    {num: 0, type: "property", group: "dark blue", name: "Boardwalk", order: 40}];   

var currentSpace = 0, 
    chanceIndex = 16, 
    chestIndex = 16, 
    double = 0, 
    min, 
    max,
    prevSpace,
    chestDeck = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
    chanceDeck = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
    trials = 1000000;                       // number of trials
$(".trials-input").val(trials);             // displays the number of trials in text box

runSim();                                   // performs the simulation

function runSim() {
    for(var i = 0; i < trials; i++) {       // roll (trials) times
        var diceNum = roll();
        if (double == 3) {
            double = 0;
            currentSpace = 11;              // go to Jail if three doubles are rolled in a row
            record();
        } else {
            prevSpace = currentSpace;       // saves previous location
            currentSpace += diceNum;        
            if (currentSpace > 40) {
                currentSpace -= 41;         // creates new location and keeps within spaces 0 - 40
            }
            if(prevSpace < 11 && currentSpace >= 11) {
                currentSpace++;             // if Jail (jailed) space is crossed, advance one more space
            }
            if (currentSpace == 31) {
                currentSpace = 11;          // go to Jail
                double = 0;
            }
            if (currentSpace == 7 || currentSpace == 23 || currentSpace == 37) {
                chanceCard();               // draw Chance card
            } else if (currentSpace == 2 || currentSpace == 18 || currentSpace == 34) {
                chestCard();                // draw Community Chest cards
            } else {
                record();                   // if no Chance or Chest cards
            }
        }    
    }
}

create();                                   // creates the visual display of data

function roll() {
    var die1 = Math.floor(Math.random() * 6) + 1; 
    var die2 = Math.floor(Math.random() * 6) + 1; 
    if (die1 == die2) {
        double++;
    } else {
        double = 0;
    }
    return die1 + die2;
}

function shuffle(deck) {
    for(var i = 15; i > 0; i--) {
        var index = Math.floor(Math.random() * (i + 1)); 
        var temp = deck[index];
        deck[index] = deck[i];
        deck[i] = temp;
    }
    return deck;
}

function chanceCard() {
    if (chanceIndex == 16) {
        chanceDeck = shuffle(chanceDeck);
        chanceIndex = 0;            // resets Chance cards
    }
    if (chanceDeck[chanceIndex] == 1) {
        currentSpace = 0;           // advance to Go
        record();        
    } else if (chanceDeck[chanceIndex] == 2) {
        currentSpace = 25;          // advance to Illinois
        record();
    } else if (chanceDeck[chanceIndex] == 3) {
        currentSpace = 12;          // advance to St. Charles
        record();
    } else if (chanceDeck[chanceIndex] == 4) {
        currentSpace = 40;          // advance to Boardwalk
        record();
    } else if (chanceDeck[chanceIndex] == 5) {
        currentSpace = 5;           // advance to Reading Railroad
        record();
    } else if (chanceDeck[chanceIndex] == 6) {
        currentSpace = 11;          // go to Jail
        double = 0;
        record();
    } else if (chanceDeck[chanceIndex] == 7) {
        currentSpace -= 3;          // go back three spaces
        record();
    } else if (chanceDeck[chanceIndex] == 8) {       
        if (currentSpace == 7) {
            currentSpace = 13;      // if at first chance, go to Electric Company
            record();
        } else if (currentSpace == 23) {
            currentSpace = 29;      // if at second chance, go to Water Company
            record();
        } else {
            currentSpace = 13;      // if at third chance, go to Electric Company
            record();
        }
    } else if (chanceDeck[chanceIndex] == 9) {       
        if (currentSpace == 7) {
            currentSpace = 16;      // if at first chance, go to Pennsylvania Railroad
            record();
        } else if (currentSpace == 23) {
            currentSpace = 26;      // if at second chance, go to B&O Railroad
            record();
        } else {
            currentSpace = 5;       // if at third chance, go to Reading Railroad
            record();
        }
    } else {
        record();                   // if no movement
    }
    chanceIndex++;
}

function chestCard() {
    if (chestIndex == 16) {
        chestDeck = shuffle(chestDeck);
        chestIndex = 0;             // resets Community Chest cards
    }
    if (chestDeck[chestIndex] == 1) {
        currentSpace = 0;           // advance to Go
        record();
    } else if (chestDeck[chestIndex] == 2) {
        currentSpace = 11;          // go to Jail
        double = 0;
        record();
    } else {
        record();                   // if no movement
    }
    chestIndex++;
}

function record() {
    spaces[currentSpace].num += 1;
}

$(".allBtn").on("click", function() {
    $(".allBtn").addClass("active");
    $(".onlyPropBtn").removeClass("active");
    rankSpaces("all");
    findMinAndMax("all");
    for(var i = 0; i < spaces.length; i++) {
        green = Math.floor(convertRange( spaces[i].num, [ spaces[min].num, spaces[max].num ], [ 0, 255 ] ));
        red = 255 - green;
        spaces[i].color = "rgb(" + red + "," + green + ",0)";
        $(".space:contains(" + spaces[i].name + ")").css("background", spaces[i].color);
    }
});

$(".onlyPropBtn").on("click", function() {
    $(".onlyPropBtn").addClass("active");
    $(".allBtn").removeClass("active");
    rankSpaces("properties");
    findMinAndMax("properties");
    for(var i = 0; i < spaces.length; i++) {
         if(spaces[i].type != "property") {
            spaces[i].color = "rgb(150,150,150)";
        } else {
            green = Math.floor(convertRange( spaces[i].num, [ spaces[min].num, spaces[max].num ], [ 0, 255 ] ));
            red = 255 - green;
            spaces[i].color = "rgb(" + red + "," + green + ",0)";
        }
        $(".space:contains(" + spaces[i].name + ")").css("background", spaces[i].color);
    }
});

$(".refresh").on("click", function() {
    currentSpace = 0;
    $(".onlyPropBtn").removeClass("active");
    trials = $(".trials-input").val();
    $(".visual").empty();
    spaces.sort(dynamicSort("order"));
    for(var i = 0; i < spaces.length; i++) {
        spaces[i].num = 0;
    }
    runSim();
    create();
});

function dynamicSort(property) {            // this function was created by Ege Özcan and found on stackoverflow.com
    var sortOrder = 1;                      // it sorts an array of objects by a variable in each object
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function convertRange(value, r1, r2) { 
    return (value - r1[0]) * (r2[1] - r2[0]) / (r1[1] - r1[0]) + r2[0];
}

function create() {
    // set order of board position and create elements
    $("button:contains(All Spaces)").addClass("active");
    var order = [11,12,13,14,15,16,17,18,19,20,21,9,-1,22,8,-1,23,7,-1,24,6,-1,25,5,-1,26,4,-1,27,3,-1,28,2,-1,29,1,-1,30,0,40,39,38,37,36,35,34,33,32,31];
    for(var i = 0; i < order.length; i++) {
        if(order[i] < 0) {
            $(".visual").append("<div class='gap'>");
        } else {
            $(".visual").append("<div class='space'>" + spaces[order[i]].name + "</div>");
        }
    }
    // rank the spaces and find min and max
    rankSpaces("all");
    findMinAndMax("all");
    // iterate through array and set color relative to odds of landing on space
    for(var i = 0; i < spaces.length; i++) {
        green = Math.floor(convertRange(spaces[i].num, [spaces[min].num, spaces[max].num], [0, 255]));
        red = 255 - green;
        spaces[i].color = "rgb(" + red + "," + green + ",0)";
        $(".space:contains(" + spaces[i].name + ")").css("background", spaces[i].color);
    }
}

function findMinAndMax(type) {
    min = 0;
    max = 0;
    if(type == "all") {
        min = 40;
    } else {
        max = 40;
        for(var i = 0; i < spaces.length; i++) {
            if(spaces[i].num < spaces[min].num && spaces[i].type == "property") {
                min = i;
            }
            if(spaces[i].num > spaces[max].num && spaces[i].type == "property") {
                max = i;
            }
        }
    }
}

function rankSpaces(type) {
    spaces.sort(dynamicSort("-num"));
    $(".ranks p").remove();
    if(type == "all") {
        for(var i = 0; i < spaces.length; i++) {
            percent = Math.round(spaces[i].num / trials * 10000) / 100;        
            rank = i + 1;
            $(".ranks").append("<p>" + rank  + ". " + spaces[i].name + " — <span>" + percent + "%</span></p>");
        }
    } else {
        var sum = 0;
        var rank = 0;
        for(var i = 0; i < spaces.length; i++) {
            if(spaces[i].type == "property") {
                sum += spaces[i].num;
            }
        }
        for(var i = 0; i < spaces.length; i++) {
            if(spaces[i].type == "property") {
                percent = Math.round(spaces[i].num / sum * 10000) / 100;        
                rank += 1;
                $(".ranks").append("<p>" + rank  + ". " + spaces[i].name + " — <span>" + percent + "%</span></p>");
            }
        }
    }
    // rank and display group odds
    var utility = 0, brown = 0, light_blue = 0, pink = 0, orange = 0, red = 0, yellow = 0, green = 0, dark_blue = 0, railroad = 0, sum = 0;
    for(var i = 0; i < spaces.length; i++) {
        if(spaces[i].group == "brown") {
            brown += spaces[i].num;
            sum += spaces[i].num;
        } else if(spaces[i].group == "light blue") {
            light_blue += spaces[i].num;
            sum += spaces[i].num;
        } else if(spaces[i].group == "pink") {
            pink += spaces[i].num;
            sum += spaces[i].num;
        } else if(spaces[i].group == "orange") {
            orange += spaces[i].num;
            sum += spaces[i].num;
        } else if(spaces[i].group == "red") {
            red += spaces[i].num;
            sum += spaces[i].num;
        } else if(spaces[i].group == "yellow") {
            yellow += spaces[i].num;
            sum += spaces[i].num;
        } else if(spaces[i].group == "green") {
            green += spaces[i].num;
            sum += spaces[i].num;
        } else if(spaces[i].group == "dark blue") {
            dark_blue += spaces[i].num;
            sum += spaces[i].num;
        } else if(spaces[i].group == "railroad") {
            railroad += spaces[i].num;
            sum += spaces[i].num;
        } else if(spaces[i].group == "utility") {
            utility += spaces[i].num;
            sum += spaces[i].num;
        }
    }
    if(type == "all") {
        sum = trials;
    }
    // sets visual text to each percentage
    $(".best-groups").empty();
    $(".best-groups").append("<h3>Odds of Landing on Color-Group</h3>");
    $(".best-groups").append("<p>Brown — <span>" + Math.round(brown / sum * 10000) / 100  + "%</span></p>");
    $(".best-groups").append("<p>Light Blue — <span>" + Math.round(light_blue / sum * 10000) / 100  + "%</span></p>");
    $(".best-groups").append("<p>Pink — <span>" + Math.round(pink / sum * 10000) / 100  + "%</span></p>");
    $(".best-groups").append("<p>Orange — <span>" + Math.round(orange / sum * 10000) / 100  + "%</span></p>");
    $(".best-groups").append("<p>Red — <span>" + Math.round(red / sum * 10000) / 100  + "%</span></p>");
    $(".best-groups").append("<p>Yellow — <span>" + Math.round(yellow / sum * 10000) / 100  + "%</span></p>");
    $(".best-groups").append("<p>Green — <span>" + Math.round(green / sum * 10000) / 100  + "%</span></p>");
    $(".best-groups").append("<p>Dark Blue — <span>" + Math.round(dark_blue / sum * 10000) / 100  + "%</span></p>");
    $(".best-groups").append("<p>Railroad — <span>" + Math.round(railroad / sum * 10000) / 100  + "%</span></p>");
    $(".best-groups").append("<p>Utility — <span>" + Math.round(utility / sum * 10000) / 100  + "%</span></p>");
}