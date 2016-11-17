function init() {
    console.log("Init");
    startTime();
}
init();

function startTime() {
    var today = new Date();
    var date = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getYear() + 1900;
    switch (today.getDay()) {
        case 0:
            weekday = "SUNDAY";
            break;
        case 1:
            weekday = "MONDAY";
            break;
        case 2:
            weekday = "TUESDAY";
            break;
        case 3:
            weekday = "WEDNESDAY";
            break;
        case 4:
            weekday = "THURSDAY";
            break;
        case 5:
            weekday = "FRIDAY";
            break;
        case 6:
            weekday = "SATURDAY";
    }

    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clocktext').innerHTML =
        weekday + " " + month + "/" + date + "/" + year + " " + " " + h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }; // add zero in front of numbers < 10
    return i;
}

// // // // // //

// // //
// gets elements by id so they can be refrenced by javascript
var computeButton = document.getElementById('computeButton');
var input1 = document.getElementById('input1'); // Type input box one
var input2 = document.getElementById('input2'); // Type input box two
var result; // creates a varible to hold
// varible result is created to store the answer
// // //

// // //
// creates a listener that waits for a "click" on the computeButton element
computeButton.addEventListener("click", compute);
// when clicked it will call the function compute
// // //

// // //
// compute function that gives the answer of selected operator on the given numbers
function compute() {
    var selectOp = document.getElementById('selectOp'); // gets element of the operator selecter
    var int1 = parseInt(input1.value); // creates a varible that = a string of the first input box and converts it into a number that javascript can do math to it
    var int2 = parseInt(input2.value); // creates a varible that = a string of the second input box and converts it into a number that javascript can do math to it

    if (selectOp.value === "+") { // checks if the plus operation is selected and executes belov if it is
        var result = int1 + int2; // adds both converted inputs
        if (isNaN(result) === false) { //checks if the the calculated answer is a number
            alert("Your answer is " + result) // if result is a number then the answer will be displayed
        } else {
            alert("T-that isn't a number.. baka >////<")// if result isn't a number then message will be displayed
        }
    } else if (selectOp.value === "-") { //same thing but for minus
        var result = int1 - int2;
        if (isNaN(result) === false) {
            alert("Your answer is " + result)
        } else {
            alert("T-that isn't a number.. baka >////<")
        }
    } else if (selectOp.value === "x") { // so on
        var result = int1 * int2;
        if (isNaN(result) === false) {
            alert("Your answer is " + result)
        } else {
            alert("T-that isn't a number.. baka >////<")
        }
    } else if (selectOp.value === "/") { // ..
        var result = int1 / int2;
        if (isNaN(result) === false) {
            alert("Your answer is " + result)
        } else {
            alert("T-that isn't a number.. baka >////<")
        }
    } else if (selectOp.value === "^") { // .....
        var result = Math.pow(int1, int2);
        if (isNaN(result) === false) {
            alert("Your answer is " + result)
        } else {
            alert("T-that isn't a number.. baka >////<")
        }
    } else if (selectOp.value === "%") { // ..............
        var result = int1 % int2;
        if (isNaN(result) === false) {
            alert("Your answer is " + result)
        } else {
            alert("T-that isn't a number.. baka >////<")
        }
    }
}
