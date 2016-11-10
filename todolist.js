
function init(){
  console.log("Init");
  startTime();
}
init();
function startTime() {
    var today = new Date();
    var date = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getYear() +1900;
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
        case  6:
            weekday = "SATURDAY";
    }

    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clocktext').innerHTML =
    weekday+ " " +month + "/"+ date + "/" + year+ " " + " " + h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

//
//
var input = document.getElementById("input");
var taskItem = document.getElementById("taskItem");
var addButton = document.getElementById("addButton");
var select = document.getElementById("select");

addButton.addEventListener("click", function(){
var task = "<div>" + input.value + "</div>" + "<br id='taskBr'/>"
    taskItem.innerHTML = taskItem.innerHTML + task
    console.log("test")
});

taskItem.addEventListener("click", function(evt){
  var removeItem = evt.target;
  removeItem.parentNode.removeChild(removeItem);
});
