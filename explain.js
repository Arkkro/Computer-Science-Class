var Bot = require('bot');
var PF = require('pathfinding');

//var bot = new Bot('yourID', 'training', 'http://vindinium.org'); //Put your bot's code here and change training to Arena when you want to fight others.
var bot = new Bot('yourID', 'arena', 'http://52.39.33.197:9000'); //Put your bot's code here and change training to Arena when you want to fight others.
var goDir;
var Promise = require('bluebird');
Bot.prototype.botBrain = function() {
    return new Promise(function(resolve, reject) {
        _this = bot;
        //////* Write your bot below Here *//////
        //////* Set `myDir` in the direction you want to go and then bot.goDir is set to myDir at the bottom *////////

        /*                                      *
         * This Code is global data!            *
         *                                      */

        // Set myDir to what you want and it will set bot.goDir to that direction at the end.  Unless it is "none"
        var myDir; // creates a varible to hold the next direction
        var myPos = [bot.yourBot.pos.x, bot.yourBot.pos.y]; //create a varible that holds a array of our bot's x,y position on the map
        var mineTotal = (bot.freeMines.length + bot.bot1mines.length + bot.bot2mines.length + bot.bot3mines.length + bot.bot4mines.length); //totals the data of free mines and all enemy mines
        var minesActive = (mineTotal - bot.freeMines.length) //takes all mines and subtracts the untaken mines which results in the mine count of how many mines are taken
        var enemyBots = []; //creates a empty array to store the bot id's that exculde your bot
        if (bot.yourBot.id != 1) enemyBots.push(bot.bot1); // compares your bot id to others bot's ids to figure out what bots are enemys
        if (bot.yourBot.id != 2) enemyBots.push(bot.bot2); // ^
        if (bot.yourBot.id != 3) enemyBots.push(bot.bot3); // ^^
        if (bot.yourBot.id != 4) enemyBots.push(bot.bot4); // ^^^
        // create a var that returns the closest bot below
        var closestBot = enemyBots[0]; // Declares a varible to store the closestBot position
        for (i = 0; i < enemyBots.length; i++) { // this makes the code below run for every piece of data in the array
            if (bot.findDistance(myPos, [closestBot.pos.x, closestBot.pos.y]) > bot.findDistance(myPos, [enemyBots[i].pos.x, enemyBots[i].pos.y])) { // compares potental closestBot distance to every enemyBots distance x,y
                closestBot = enemyBots[i]; //sets closest bot to equal the recently tried enemyBots if the conditon above passes
            }


        if (bot.yourBot.id == 1) { // checks if our bot has a id of 1
            var allMines = bot.freeMines.concat(bot.bot2mines, bot.bot3mines, bot.bot4mines);//if conditon passes then create a varible that concats all the positon arrays of all the mines but your own
        }
        if (bot.yourBot.id == 2) { // checks if our bot has a id of 2
            var allMines = bot.freeMines.concat(bot.bot1mines, bot.bot3mines, bot.bot4mines); // ^^
        }
        if (bot.yourBot.id == 3) { // checks if our bot has a id of 3
            var allMines = bot.freeMines.concat(bot.bot1mines, bot.bot2mines, bot.bot4mines);// ^^^^
        }
        if (bot.yourBot.id == 4) { // checks if our bot has a id of 4
            var allMines = bot.freeMines.concat(bot.bot1mines, bot.bot2mines, bot.bot3mines);// ^^^^^^
        }
        /*
         * Tooru info below
         */

        var targets = []; // creates a empty array
        var targetList = []; // ^
        var targetNumber = []; // ^^
        tooru = bot.yourBot; // makes tooru equal to the bot.yourBot Object

        if (tooru.life > 44) { // depeneding on health this sets a varible to be refrenced later to determine to attack or not
            tooru.isSafe = 1;
        } else {
            tooru.isSafe = 0; //^
        }

        if ((tooru.life - 20) > closestBot.life) { //depending on my health and the closest bots health a varible is set to determine either to attack
            tooru.canAttack = true;
            console.log("attack set to true");
        }

//These if statements below determine what bots are targets based on how many mines they have and also exculdes our bot
        if (bot.bot1.mineCount >= (mineTotal / 4) && bot.yourBot.id != 1) {
            targetList.push(1) // adds the target to the array of targets
        }
        if (bot.bot2.mineCount >= (mineTotal / 4) && bot.yourBot.id != 2) {
            targetList.push(2)
        }
        if (bot.bot3.mineCount >= (mineTotal / 4) && bot.yourBot.id != 3) {
            targetList.push(3)
        }
        if (bot.bot4.mineCount >= (mineTotal / 4) && bot.yourBot.id != 4) {
            targetList.push(4)
        }

        // this if statment determines if my bot has the majority of mines and there are no targets
        // It also makes sure that my bot has two gold to spend on the tavern
        if (tooru.mineCount >= mineTotal * .45 && targetList.length === 0 && bot.yourBot.gold >= 2) {
            tooru.isProtective = 1;
        } else {
            tooru.isProtective = 0;
        }

        if (targetList.length != 0) { //If theres a target then it will be logged in the console
            console.log("Targets: bot " + targetList);
            console.log("Closest Bot: " + closestBot.id)
        }


        var closestBotIsTarget = false; //creates a varible to say if the closed bot is a target or not
        for (var i = 0; i < targetList.length; i++) { // if the target's pos array is the closestBot's pos array then this varible will be set to true and be refrenced later
            if (targetList[i] === closestBot.id) {
                closestBotIsTarget = true;
            }
        }
        var aBotHasLargeBounty = false;
        for (var i = 0; i < enemyBots.length; i++) { //looks for bots who have "too many mines" and also checks the what stage of the game is (bot.turns)
            if (enemyBots[i].mineCount >= minesActive * .45 && bot.turns >= 400) {
                var aBotHasLargeBounty = true;
            }
        }
        /*                                      *
         * This Code Decides WHAT to do         *
         *                                      */
        var task;
        if (tooru.canAttack === true && closestBotIsTarget === true) { // If the set varibles before are true then the task will be set to attack
            task = "attack"; // sets the task
        }
        else if (tooru.isProtective === 1 && tooru.isSafe === 1) { // If these varibles determined before are true then the bot will defend
            task = "defend";//^
        } else if (tooru.isSafe === 1 && bot.freeMines.length != 0 && bot.turns >= 600) { // If the varible before is set and the there are freemines and the turns are less than 600 then the bot will capture freemines
            task = "freemines";
        } else if (tooru.isSafe === 1) { // If the conditon above doesn't pass then it will check if the bot is safe (determined way above) and then capture mines if the conditon passes
            task = "mines";
        } else if (tooru.isSafe === 0) {
            task = "tavern";
        }

        console.log(task) // Tells me what the bot task is
            /*                                      *
             * This Code Determines HOW to do it    *
             *                                      */

        // This Code find the nearest freemine and sets myDir toward that direction //
// if the task is attack then it will log it the console and then go to attack the closestBot
        if (task === "attack") {
            console.log("Attacking bot " + closestBot.id);
            myDir = bot.findPath(myPos, [closestBot.pos.x, closestBot.pos.y])
        }

// if the task is freemines then the function looks for the closest mine and sets a path to go to it
        if (task === "freemines") {
            var closestFreeMine = bot.freeMines[0];
            for (i = 0; i < bot.freeMines.length; i++) { // Creates a loop that ends when the length of the array is reached
                if (bot.findDistance(myPos, closestFreeMine) > bot.findDistance(myPos, bot.freeMines[i])) { // compares the recent closestMine to the distance of the new one selected by the loop
                    closestMine = bot.freeMines[i]; // if that passes it adds the location closest mine to the varible closestMine
                }
            }
            console.log(closestFreeMine)
            console.log("Claiming a free mine!"); // logging to show what he bot's doing
            myDir = bot.findPath(myPos, closestFreeMine); // sets the direction to what the function bot.findPath returns with the arguments being my bot's posArray and the posArray of the closest mine

        }
// same as the function above but instead of the array of free mines, it's a array of all the mines
        if (task === "mines") {
            var closestMine = allMines[0];
            for (i = 0; i < allMines.length; i++) {
                if (bot.findDistance(myPos, closestMine) > bot.findDistance(myPos, allMines[i])) {
                    closestMine = allMines[i];
                }
            }
            console.log("Claiming a mine!");
            console.log(closestMine)
            myDir = bot.findPath(myPos, closestMine);
        }
// also same as the function above but instead oy the array of mines, It's a array of tavern
        if (task === "tavern") {
            var closestTavern = bot.taverns[0];
            for (var i = 0; i < bot.taverns.length; i++) {
                if (bot.findDistance(myPos, closestTavern) > bot.findDistance(myPos, bot.taverns[i])) {
                    closestTavern = bot.taverns[i]
                }
            }
            console.log(closestTavern)
            console.log("Going to closest tavren!");
            myDir = bot.findPath(myPos, closestTavern);
        }
// This function makes my bot defend and it's simular to finding a tavern instead of the (new comments)
        if (task === "defend") {
            if (tooru.life < 80) { // checks if the bot health is below 80 for effencincy and saving money
                var closestTavern = bot.taverns[0];
                for (var i = 0; i < bot.taverns.length; i++) {
                    if (bot.findDistance(myPos, closestTavern) > bot.findDistance(myPos, bot.taverns[i])) {
                        closestTavern = bot.taverns[i]
                    }
                }
                console.log("Defence Heal");
                console.log(closestTavern)
                myDir = bot.findPath(myPos, closestTavern);
            } else { // if the heath is above 80 then my bot will not move and sit right next to the tavern
                myDir = "none"
                console.log("Defending");
            }
        }




        /*                                                                                                                              *
         * This Code Sets your direction based on myDir.  If you are trying to go to a place that you can't reach, you move randomly.   *
         * Otherwise you move in the direction set by your code.  Feel free to change this code if you want.                            */

// This code was changed by me to allaw the bot to not move while camping a tavern
        if (myDir === "none" && task != "defend") {
            console.log("Going Random!");
            var rand = Math.floor(Math.random() * 4);
            var dirs = ["north", "south", "east", "west"];
            bot.goDir = dirs[rand];
        } else {
            bot.goDir = myDir;
        }


        ///////////* DON'T REMOVE ANTYTHING BELOW THIS LINE *//////////////
        resolve();
    });
}
bot.runGame();
