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
    if (option.value === "bold") { // checks for bold
        var task = "<strong><div>" + input.value + "<br></div><strong>" // what it adds
        taskItem.innerHTML = taskItem.innerHTML + task // replaces what is before with its self plus line above
    } else if (option.value === "big") { //checks for big
        var task = "<div style=\"font-size:40px;\">" + input.value + "<br></div>"
        taskItem.innerHTML = taskItem.innerHTML + task
    } else if (option.value === "underline") {
        var task = "<div style=\"text-decoration:underline;\">" + input.value + "<br></div>"
        taskItem.innerHTML = taskItem.innerHTML + task
    } else if (option.value === "small") {
        var task = "<div style=\"font-size:10px;\">" + input.value + "<br></div>"
        taskItem.innerHTML = taskItem.innerHTML + task
    } else if (option.value === "weird") {
        var task = "<div style=\"font-family:wingdings;\">" + input.value + "<br></div>"
        taskItem.innerHTML = taskItem.innerHTML + task

    } else {
        var task = "<div>" + input.value + "<br></div>"
        taskItem.innerHTML = taskItem.innerHTML + task
        console.log("test")
    }
});

taskItem.addEventListener("click", function(evt) {
    var removeItem = evt.target;
    var noDelete = document.getElementById("taskItem");

    if (removeItem !== noDelete && removeItem.value !== "clicked") {

        var removeItem = evt.target;
        removeItem.style.color = "#657577";
        removeItem.style.textDecoration = "line-through"
        removeItem.value = "clicked";
        console.log(removeItem.value);

    } else if (removeItem.value === "clicked") {
        removeItem.parentNode.removeChild(removeItem);
    } else {

    }
});
