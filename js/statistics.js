//google.charts.load('current', {'packages':['corechart']});
//google.charts.load('current', {'packages':['line']});
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    //$('#curve_chart').empty();
    var data = new google.visualization.DataTable();
    var chart;
    var arr = [];

    data.addColumn('datetime', 'Date');
    data.addColumn('number', 'Benchpress');
    data.addColumn('number', 'Squat');
    data.addColumn('number', 'Deadlift');
    data.addRows(store.weights.length);

    for (var i = 0; i < store.weights.length; i++) {
        switch (store.weights[i].type) {
            case 1:
                data.setValue(i, 0, new Date(store.weights[i].date));
                data.setValue(i, 1, store.weights[i].weight);
                break;
            case 2:
                data.setValue(i, 0, new Date(store.weights[i].date));
                data.setValue(i, 2, store.weights[i].weight);
                break;
            case 3:
                data.setValue(i, 0, new Date(store.weights[i].date));
                data.setValue(i, 3, store.weights[i].weight);
                break;
        }
    }

    data.addRows(arr);

    var options = {
        curveType: 'function',
        legend: { position: 'top' },
        interpolateNulls: true,
        series: {
            0: { color: '#e2431e' },
            1: { color: '#6f9654' },
            2: { color: '#1c91c0' },
          }
    };

    chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    chart.draw(data, options);

    //chart = new google.charts.Line(document.getElementById('curve_chart'));
    //chart.draw(data, google.charts.Line.convertOptions(options));
}

$("#graphtab").on("click", function() {
    drawChart();
});

function updateStats() {
    if (store.unit === 1) {
        $("#unit_lbs").prop("checked", true);
    }
    else if (store.unit === 2) {
        $("#unit_kg").prop("checked", true);
    }
    else {
        store.unit = 1;
        $("#unit_lbs").prop("checked", true);
    }

    var latestWorkout = new Date(1900, 1, 1, 0, 0, 0, 0);
    var pbBenchpress = 0;
    var pbDeadlift = 0;
    var pbSquat = 0;
    for (var i = 0; i < store.weights.length; i++) {
        if (latestWorkout < new Date(store.weights[i].date)) {
            latestWorkout = new Date(store.weights[i].date);
        }
        switch (store.weights[i].type) {
            case 1:
                if (store.weights[i].weight > pbBenchpress) {
                    pbBenchpress = store.weights[i].weight;
                }
                break;
            case 2:
                if (store.weights[i].weight > pbSquat) {
                    pbSquat = store.weights[i].weight;
                }
                break;
            case 3:
                if (store.weights[i].weight > pbDeadlift) {
                    pbDeadlift = store.weights[i].weight;
                }
                break;
        }
    }
    $("#stat_latestworkout").text(latestWorkout.toDateString());
    $("#stat_pbbenchpress").text(pbBenchpress);
    $("#stat_pbsquat").text(pbSquat);
    $("#stat_pbdeadlift").text(pbDeadlift);
    $("#stat_pbtotal").text((pbBenchpress + pbSquat + pbDeadlift) + (store.unit === 1 ? " lbs" : " kg"));

    if (store.unit === 1) {
        $("#stat_percentage1000").text(((pbBenchpress + pbSquat + pbDeadlift) * 100.0 / 1000.0).toFixed(2) + "%");
    }
    else {
         $("#stat_percentage1000").text(((pbBenchpress + pbSquat + pbDeadlift) * 100.0 / 454.0).toFixed(2) + "%");
    }
}

$("#stattab").on("click", function() {
    updateStats();
});

$('#unit_selection input:radio').click(function() {
    if ($(this).val() === "lbs") {
        store.unit = 1;
    }
    else {
        store.unit = 2;
    }
    updateStats();
    setStore();
  });

function doOnOrientationChange() {
    setTimeout(function () {
        drawChart();
    }, 1000);
}
  
window.addEventListener('orientationchange', doOnOrientationChange);
