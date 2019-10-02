// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBNKh7NaVRVHTY8qFliPBRSvA0Z-Zvcr2g",
    authDomain: "train-5e78e.firebaseapp.com",
    databaseURL: "https://train-5e78e.firebaseio.com",
    projectId: "train-5e78e",
    storageBucket: "",
    messagingSenderId: "76556621900",
    appId: "1:76556621900:web:4c039e6dd1322410113ce9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// initial value
var train;
var destination;
var firstTime;
var frequency;

// var nextArrival;

$("#submit").on("click", function () {
    event.preventDefault();

    train = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTime = $("#first-time").val().trim();
    frequency = $("#frequency").val().trim();

    hour = firstTime.split(":")[0]
    minute = firstTime.split(":")[1]
    console.log(hour)
    console.log(minute)

    // var firstTime = moment(userTime, "hh:mm");
    // var realTime = firstTime._i;
    //increased time not working
    // var increasedTime = moment(firstTime).add(frequency, "minutes")

    // date = $("#employ-date").val();
    // console.log(date);
    // var randomFormat = "MM/DD/YYYY";
    // var convertedDate = moment(date, randomFormat);
    // time = convertedDate.diff(moment(), "month") * -1;

    // rate = $("#employ-rate").val();
    // paytotal = rate * time;

    database.ref().push({
        train: train,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency,
        // increasedTime : increasedTime,
        // nextArrival : nextArrival,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});


database.ref().on("child_added", function (snapshot) {
    var sv = snapshot.val();
    var newRow = $("<tr>");
    console.log(sv);

    newRow.append($("<td>").text(sv.train));
    newRow.append($("<td>").text(sv.destination));
    newRow.append($("<td>").text(sv.frequency));

    newRow.append($("<td>").text(sv.firstTime));
    // newRow.append($("<td>").text(sv.increasedTime));// REALTIME + FREQUENCY
    // newRow.append($("<td>").text(sv.rate));
    // newRow.append($("<td>").text(sv.paytotal));

    $("#table-body").append(newRow);

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});