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
            weekday = "WENDSDAY";
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
startTime();
