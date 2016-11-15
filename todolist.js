
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
var option = document.getElementById("option");

addButton.addEventListener("click", function(){
  if (option.value === "bold") {
    var task = "<strong><div>" + input.value + "</div><strong>" + "<br id='taskBr'/>"
    taskItem.innerHTML = taskItem.innerHTML + task
    console.log("test")

  }
  else if (option.value === "big"){
    var task = "<div style=\"font-size:40px;\">" + input.value + "</div>" + "<br id='taskBr'/>"
    taskItem.innerHTML = taskItem.innerHTML + task
  }
  else if (option.value === "underline") {
    var task = "<div style=\"text-decoration:underline;\">" + input.value + "</div>" + "<br id='taskBr'/>"
    taskItem.innerHTML = taskItem.innerHTML + task
  }
  else if (option.value === "small"){
    var task = "<div style=\"font-size:10px;\">" + input.value + "</div>" + "<br id='taskBr'/>"
    taskItem.innerHTML = taskItem.innerHTML + task
  }
  else if (option.value === "weird") {
    var task = "<div style=\"font-family:wingdings;\">" + input.value + "</div>" + "<br id='taskBr'/>"
    taskItem.innerHTML = taskItem.innerHTML + task

  }
  else {
    var task = "<div>" + input.value + "</div>" + "<br id='taskBr'/>"
    taskItem.innerHTML = taskItem.innerHTML + task
    console.log("test")
}
});

taskItem.addEventListener("click", function(evt){
    var removeItem = evt.target;
    var noDelete = document.getElementById("taskItem");

if (removeItem !== noDelete  && removeItem.value !== "clicked"){

  var removeItem = evt.target;
  removeItem.style.color = "#657577";
  removeItem.style.textDecoration = "line-through"
  removeItem.value = "clicked";
  console.log(removeItem.value);

}
else if (removeItem.value === "clicked") {
  removeItem.parentNode.removeChild(removeItem);
}
else {

}
});

// taskBr.addEventListener("click", function(){
//
// });
