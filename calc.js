
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
// // //
// function test(){
//   alert("Test Success");
// }
//
// // //

// // //
// Gets elements by id so they can be refrenced by javascript
var computeButton = document.getElementById('computeButton');
var input1 = document.getElementById('input1');
var input2 = document.getElementById('input2');
var result;
// varible result is created to store the answer
// // //

// // //
// creates 
computeButton.addEventListener("click", compute);


function compute(){
  var selectOp = document.getElementById('selectOp');
  var int1 = parseInt(input1.value);
  var int2 = parseInt(input2.value);

  if (selectOp.value === "+") {
    var result = int1 + int2;
    alert ("Your answer is "  + result)
  }
  else if (selectOp.value === "-") {
    var result = int1 - int2;
    alert ("Your answer is "  + result)
  }

  else if(selectOp.value === "x"){
    var result = int1 * int2;
    alert ("Your answer is "  + result)
  }
  else if(selectOp.value === "/"){
    var result = int1 / int2;
    alert ("Your answer is "  + result)
  }
  else if(selectOp.value === "^"){
    var result = Math.pow(int1, int2);
    alert ("Your answer is "  + result)
  }
  else if(selectOp.value === "%"){
    var result = int1 % int2;
    alert ("Your answer is "  + result)
  }
  else {
    alert ("Injecting Javascript I see")
  }
  }
