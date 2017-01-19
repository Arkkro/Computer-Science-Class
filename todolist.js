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

//
//
var input = document.getElementById("input"); //connects the typed input to the javascript
var taskItem = document.getElementById("taskItem"); //connects the div where the the list item will go to the jawascript
var addButton = document.getElementById("addButton"); //connects the button to the js
var option = document.getElementById("option"); //connects the drag down to the js

addButton.addEventListener("click", function() { // add a listener that waits for a click to the connecned button. function below will look for what formatting was closen and will add it to the html
    if (option.value === "bold") { // checks if bold is selected in dropdown
        var task = "<strong><div>" + input.value + "<br></div><strong>" // userinput with bold formatting is set to the var task
        taskItem.innerHTML = taskItem.innerHTML + task // takes what is currently in the list and adds var  defined above task
    } else if (option.value === "big") { //checks if big is selected in dropdown
        var task = "<div style=\"font-size:40px;\">" + input.value + "<br></div>" // userinput with big formatting is set to the var task
        taskItem.innerHTML = taskItem.innerHTML + task // takes what is currently in the list and adds var defined above task
    } else if (option.value === "underline") {  //checks if underline is selected in dropdown
        var task = "<div style=\"text-decoration:underline;\">" + input.value + "<br></div>" // userinput with underline formatting is set to the var task
        taskItem.innerHTML = taskItem.innerHTML + task // takes what is currently in the list and adds var defined above task
    } else if (option.value === "small") { //checks if small is selected in dropdown
        var task = "<div style=\"font-size:10px;\">" + input.value + "<br></div>" // userinput with small formatting is set to the var task
        taskItem.innerHTML = taskItem.innerHTML + task // takes what is currently in the list and adds var defined above task
    } else if (option.value === "weird") { //checks if weird is selected in dropdown
        var task = "<div style=\"font-family:wingdings;\">" + input.value + "<br></div>" // userinput with weird formatting is set to the var task
        taskItem.innerHTML = taskItem.innerHTML + task // takes what is currently in the list and adds var defined above task
    } else { // if no perfrence is selected the script will defalut to normal formatting
        var task = "<div>" + input.value + "<br></div>" // userinput with normal formatting is set to the var task
        taskItem.innerHTML = taskItem.innerHTML + task // takes what is currently in the list and adds var defined above task
    }
});

taskItem.addEventListener("click", function(evt) { // adds event listener to task items
    var removeItem = evt.target; // selects the clicked item to a varible
    var noDelete = document.getElementById("taskItem"); // sets what not to delete

    if (removeItem !== noDelete && removeItem.value !== "clicked") { // checks the value to see if it has been clicked before and if the evt target isn't noDelete item
        var removeItem = evt.target;
        removeItem.style.color = "#657577"; // change the color darker
        removeItem.style.textDecoration = "line-through" // puts strikethrogh the line
        removeItem.value = "clicked"; // sets the value to be clicked

    } else if (removeItem.value === "clicked") { // checks if the value of the item has been clicked
        removeItem.parentNode.removeChild(removeItem); // deletes the task item
    }
});
