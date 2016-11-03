init();

function init(){
  console.log("Init");
  startTime();
}

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
function test(){
  console.log("Test Success");
}
//
// //
//
// var computeButton = document.getElementById('computeButton');
// var inp1 = document.getElementById('input1');
// var inp2 = document.getElementById('input2');
// var result;
// var resultText = document.getElementById('resultText');
// var selectOp = document.getElementById('selectOp');
// computeButton.addEventListener("click", test);
//
//
// function compute(){
//   if (selectOp.value = "+") {
//   var result = inp1 + inp2 = result;
// }
// }
