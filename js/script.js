var store = JSON.parse(window.localStorage.getItem("store")); 
var workoutDate = new Date();

if (!store) {
    store = {
        weights: [],
        unit: 1
    };
}

function saveWorkout() {

    $('#benchpressInput').prop('disabled', true);
    $('#squatInput').prop('disabled', true);
    $('#deadliftInput').prop('disabled', true);
    $('#dateBox').prop('disabled', true);
    $('#saveBox').prop('disabled', true);

    var bench = parseInt($("#benchpressInput").val());
    var squat = parseInt($("#squatInput").val());
    var dead = parseInt($("#deadliftInput").val());

    if (!isNaN(bench)) {
        store.weights.push({ date: workoutDate, type: 1, weight: bench });
    }
    if (!isNaN(squat)) {
        store.weights.push({ date: workoutDate, type: 2, weight: squat });
    }
    if (!isNaN(dead)) {
        store.weights.push({ date: workoutDate, type: 3, weight: dead });
    }

    $("#benchpressInput").val("");
    $("#squatInput").val("");
    $("#deadliftInput").val("");
    
    setStore();

    $('#benchpressInput').prop('disabled', false);
    $('#squatInput').prop('disabled', false);
    $('#deadliftInput').prop('disabled', false);
    $('#dateBox').prop('disabled', false);
    $('#saveBox').prop('disabled', false);
}

function deleteRow(key) {
    $("#r" + key).remove();
    store.weights.splice (key, 1);
    setStore();
}

function setStore() {
    window.localStorage.setItem("store", JSON.stringify(store)); // Pass a key name and its value to add or update that key.
    loadHistory();
}

function formatMonth(m) {
    switch (m) {
        case 0: return "01"; break;
        case 1: return "02"; break;
        case 2: return "03"; break;
        case 3: return "04"; break;
        case 4: return "05"; break;
        case 5: return "06"; break;
        case 6: return "07"; break;
        case 7: return "08"; break;
        case 8: return "09"; break;
        case 9: return "10"; break;
        case 10: return "11"; break;
        case 11: return "12"; break;
    }
}

function formatDay(d) {
    switch (d) {
        case 0: return "00"; break;
        case 1: return "01"; break;
        case 2: return "02"; break;
        case 3: return "03"; break;
        case 4: return "04"; break;
        case 5: return "05"; break;
        case 6: return "06"; break;
        case 7: return "07"; break;
        case 8: return "08"; break;
        case 9: return "09"; break;
        case 10: return "10"; break;
        case 11: return "11"; break;
        case 12: return "12"; break;
        case 13: return "13"; break;
        case 14: return "14"; break;
        case 15: return "15"; break;
        case 16: return "16"; break;
        case 17: return "17"; break;
        case 18: return "18"; break;
        case 19: return "19"; break;
        case 20: return "20"; break;
        case 21: return "21"; break;
        case 22: return "22"; break;
        case 23: return "23"; break;
        case 24: return "24"; break;
        case 25: return "25"; break;
        case 26: return "26"; break;
        case 27: return "27"; break;
        case 28: return "28"; break;
        case 29: return "29"; break;
        case 30: return "30"; break;
        case 31: return "31"; break;
        case 32: return "32"; break;
    }
}

function loadHistory() {
    $("#historyTableBody").empty();

    $.each( store.weights, function( key, value ) {

        var d = new Date(value.date);
        $("#historyTable")
        .prepend($('<tr id="r' + key + '">')
            .append($('<td>')
                .append($('<span>')
                    .text(d.getFullYear() + "-" + formatMonth(d.getMonth()) + "-" + formatDay(d.getDate()))
                )
            )
            .append($('<td>')
                .append($('<span>')
                    .text(value.type === 1 ? "Bench" : (value.type === 2 ? "Squat" : value.type === 3 ? "Deadlift" : "?"))
                )
            )
            .append($('<td>')
                .append($('<span>')
                    .text(value.weight)
                )
            )
            .append($('<td>')
                .append($('<button id="b' + key + '">')
                    .text("Delete")
                )
            )
        );

        $( "#b" + key ).click(function() {
            deleteRow(key);
        });
    });

}

function setDate(){

  var options = {
    date: new Date(),
    mode: 'date'
  };

  function onSuccess(date) {
    workoutDate = date;
    $("#dateBox span").text(workoutDate.toDateString());
    }

    datePicker.show(options, onSuccess);

}

loadHistory();
$("#dateBox span").text(workoutDate.toDateString());

    