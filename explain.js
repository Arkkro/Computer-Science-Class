var Bot = require('bot');
var PF = require('pathfinding');

//var bot = new Bot('c2lj23sd', 'training', 'http://vindinium.org'); //Put your bot's code here and change training to Arena when you want to fight others.
var bot = new Bot('8mfk7ewu', 'arena', 'http://52.39.33.197:9000'); //Put your bot's code here and change training to Arena when you want to fight others.
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
        var myDir;
        var myPos = [bot.yourBot.pos.x, bot.yourBot.pos.y];
        var mineTotal = (bot.freeMines.length + bot.bot1mines.length + bot.bot2mines.length + bot.bot3mines.length + bot.bot4mines.length);
        var minesActive = (mineTotal - bot.freeMines.length)
        var enemyBots = [];
        if (bot.yourBot.id != 1) enemyBots.push(bot.bot1);
        if (bot.yourBot.id != 2) enemyBots.push(bot.bot2);
        if (bot.yourBot.id != 3) enemyBots.push(bot.bot3);
        if (bot.yourBot.id != 4) enemyBots.push(bot.bot4);
        // create a var that returns the closest bot below
        var closestBot = enemyBots[0];
        for (i = 0; i < enemyBots.length; i++) {
            if (bot.findDistance(myPos, [closestBot.pos.x, closestBot.pos.y]) > bot.findDistance(myPos, [enemyBots[i].pos.x, enemyBots[i].pos.y])) {
                closestBot = enemyBots[i];
            }
        }
        // botMineAmmounts = [bot1mines.length, bot2mines.length, bot3mines.length, bot4mines.length]
        //
        if (bot.yourBot.id == 1) {
            var allMines = bot.freeMines.concat(bot.bot2mines, bot.bot3mines, bot.bot4mines);
        }
        if (bot.yourBot.id == 2) {
            var allMines = bot.freeMines.concat(bot.bot1mines, bot.bot3mines, bot.bot4mines);
        }
        if (bot.yourBot.id == 3) {
            var allMines = bot.freeMines.concat(bot.bot1mines, bot.bot2mines, bot.bot4mines);
        }
        if (bot.yourBot.id == 4) {
            var allMines = bot.freeMines.concat(bot.bot1mines, bot.bot2mines, bot.bot3mines);
        }
        /*
         * Tooru info below
         */
        // findDistance(enemyBots[i].posArray, closestTavern)


        var targets = [];
        var targetList = [];
        var targetNumber = [];
        tooru = bot.yourBot;

        if (tooru.life > 44) { // add player detection soon
            tooru.isSafe = 1;
        } else {
            tooru.isSafe = 0;
        }

        if ((tooru.life - 20) > closestBot.life) {
            tooru.canAttack = true;
            console.log("attack set to true");
        }

        if (bot.bot1.mineCount >= (mineTotal / 4) && bot.yourBot.id != 1) {
            // targetNumber.concat("1");
            targetList.push(1)
        }
        if (bot.bot2.mineCount >= (mineTotal / 4) && bot.yourBot.id != 2) {
            // targetNumber.concat("2");
            targetList.push(2)
        }
        if (bot.bot3.mineCount >= (mineTotal / 4) && bot.yourBot.id != 3) {
            // targetNumber.concat("3");
            targetList.push(3)
        }
        if (bot.bot4.mineCount >= (mineTotal / 4) && bot.yourBot.id != 4) {
            // targetNumber.concat("4");
            targetList.push(4)
        }
        if (tooru.mineCount >= mineTotal * .45 && targetList.length === 0 && bot.yourBot.gold >= 2) {
            tooru.isProtective = 1;
        } else {
            tooru.isProtective = 0;
        }
        if (targetList.length != 0) {
            console.log("Targets: bot " + targetList);
            console.log("Closest Bot: " + closestBot.id)
        }
        // for (var i = 0; i < targetNumber.length; i++) {
        //     console.log("target loop ran testing if statment")
        //     if (targetNumber[i] === closestBot.id) {
        //         var victim = targetNumber[i]
        //         tooru.isAggressive = 1;
        //         console.log("Possible Victim: " + victim)
        //     }
        // }
        var closestBotIsTarget = false;
        for (var i = 0; i < targetList.length; i++) {
            if (targetList[i] === closestBot.id) {
                closestBotIsTarget = true;
            }
        }
        var aBotHasLargeBounty = false;
        for (var i = 0; i < enemyBots.length; i++) {
            if (enemyBots[i].mineCount >= minesActive * .45 && bot.turns >= 400) {
                var aBotHasLargeBounty = true;
            }
        }
        /*                                      *
         * This Code Decides WHAT to do         *
         *                                      */
        var task;
        //bot.bot1mines.length > minesActive / 2 && bot.yourBot.id != 1 || (bot.bot2mines.length > (minesActive / 2) && bot.yourBot.id != 2) || bot.bot3mines.length > (minesActive / 2) && bot.yourBot.id != 3 || bot.bot4mines.length > (minesActive / 2) && bot.yourBot.id != 4
        if (tooru.canAttack === true && closestBotIsTarget === true) {
            task = "attack";
        }
        // else if (aBotHasLargeBounty = true) {
        //     task = "focusedAttack";
        // }
        else if (tooru.isProtective === 1 && tooru.isSafe === 1) {
            task = "defend";
        } else if (tooru.isSafe === 1 && bot.freeMines.length != 0 && bot.turns >= 600) {
            task = "freemines";
        } else if (tooru.isSafe === 1) {
            task = "mines";
        } else if (tooru.isSafe === 0) {
            task = "tavern";
        }

        console.log(task)
            /*                                      *
             * This Code Determines HOW to do it    *
             *                                      */

        // This Code find the nearest freemine and sets myDir toward that direction //
        if (task === "focusedAttack") {
            var richBot = enemyBots[0];
            for (var i = 0; i < enemyBots[0].length; i++) {
                if (enemyBots[i].mineCount > mineTotal * .45) {
                    richBot = enemyBots[i]
                }
            }
            console.log(richBot.posArray)
            console.log("Rush B ot  cyka")
            myDir = bot.findPath(myPos, richBot.posArray)

        }
        if (task === "attack") {
            console.log("Attacking bot " + closestBot.id);
            myDir = bot.findPath(myPos, [closestBot.pos.x, closestBot.pos.y])
        }

        if (task === "freemines") {
            var closestFreeMine = bot.freeMines[0];
            for (i = 0; i < bot.freeMines.length; i++) {
                if (bot.findDistance(myPos, closestFreeMine) > bot.findDistance(myPos, bot.freeMines[i])) {
                    closestMine = bot.freeMines[i];
                }
            }
            console.log(closestFreeMine)
            console.log("Claiming a free mine!");
            myDir = bot.findPath(myPos, closestFreeMine);

        }
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
        if (task === "defend") {
            if (tooru.life < 80) {
                var closestTavern = bot.taverns[0];
                for (var i = 0; i < bot.taverns.length; i++) {
                    if (bot.findDistance(myPos, closestTavern) > bot.findDistance(myPos, bot.taverns[i])) {
                        closestTavern = bot.taverns[i]
                    }
                }
                console.log("Defence Heal");
                console.log(closestTavern)
                myDir = bot.findPath(myPos, closestTavern);
            } else {
                myDir = "none"
                console.log("Defending");
            }
        }




        /*                                                                                                                              *
         * This Code Sets your direction based on myDir.  If you are trying to go to a place that you can't reach, you move randomly.   *
         * Otherwise you move in the direction set by your code.  Feel free to change this code if you want.                            */


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
