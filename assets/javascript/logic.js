const firebaseConfig = {
    apiKey: "AIzaSyBNKh7NaVRVHTY8qFliPBRSvA0Z-Zvcr2g",
    authDomain: "train-5e78e.firebaseapp.com",
    databaseURL: "https://train-5e78e.firebaseio.com",
    projectId: "train-5e78e",
    storageBucket: "",
    messagingSenderId: "76556621900",
    appId: "1:76556621900:web:4c039e6dd1322410113ce9"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

var train;
var destination;
var firstTime;
var frequency;

$("#submit").on("click", function () {
    event.preventDefault();

    var train = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTime = $("#first-time").val().trim();
    var frequency = $("#frequency").val().trim();

    database.ref().push({
        train: train,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});


database.ref().on("child_added", function (snapshot) {
    var sv = snapshot.val();

    //first time adjusted to be in the past
    var firstTimeConverted = moment(sv.firstTime, "hh:mm").subtract(1, "day");
    
    //difference between times
    var timeDiff = moment().diff(firstTimeConverted, "minutes");

    //time until next train
    var tMinutesTillTrain = sv.frequency - timeDiff % sv.frequency;

    //time of arrival of the next train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextTrainTime = moment(nextTrain).format("hh:mm");

    var newRow = $("<tr>");

    newRow.append($("<td>").text(sv.train));
    newRow.append($("<td>").text(sv.destination));
    newRow.append($("<td>").text(sv.frequency));
    newRow.append($("<td>").text(nextTrainTime));
    newRow.append($("<td>").text(tMinutesTillTrain));

    $("#table-body").append(newRow);

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});