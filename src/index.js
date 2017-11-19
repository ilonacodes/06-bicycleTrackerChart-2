var data = [];
var storedData = localStorage.getItem("bicycleTrackerData");
if (storedData) {
   data = JSON.parse(storedData).map(function(entry) {
       entry.date = new Date(entry.date);
       return entry;
   });
}

function renderGraph(data) {
    var maxY = Math.max.apply(null, data.map(function (point) {
        return point.distance;
    }));

    var tr = 'tr';
    var td = 'td';

    var color = "one";

    var chart = document.getElementById('chart');
    chart.innerHTML = "";

    var barChart = document.createElement('table');
    chart.appendChild(barChart);

    var titleRow = document.createElement(tr);
    barChart.appendChild(titleRow);

    var titleData = document.createElement(td);
    titleRow.appendChild(titleData);

    titleData.setAttribute('colspan', 30);
    titleData.setAttribute('class', 'chart-title');
    titleData.innerText = 'Your Bicycle Achievements, km';

    var barRow = document.createElement(tr);
    barChart.appendChild(barRow);
    barRow.setAttribute('class', 'bars');

    var datesRow = document.createElement(tr);
    barChart.appendChild(datesRow);
    datesRow.setAttribute('class', 'dates');

    for (var i = data.length - 30; i < data.length; i++) {

        var entry = data[i] || {
                date: {
                    toLocaleDateString: function () {
                        return "";
                    }
                },
                distance: "N/A"
            };

        var barData = document.createElement(td);
        barRow.appendChild(barData);
        barData.setAttribute('class', 'distance');

        var barText = document.createElement('span');
        barData.appendChild(barText);

        var bar = document.createElement('div');
        barData.appendChild(bar);

        bar.setAttribute('class', color);
        bar.style.height = 100.0 * entry.distance / maxY + '%';

        var datesData = document.createElement(td);
        datesRow.appendChild(datesData);

        var options = {month: 'short', day: 'numeric'};
        datesData.innerText = entry.date.toLocaleDateString("en-US", options);

        barText.innerText = Math.floor(entry.distance);

    }
};

var input = document.getElementById("user-input");

document.addEventListener("keydown", function(e) {
   var distance = parseFloat(input.value);

   if (e.keyCode === 13) {
       data.push({date: new Date, distance: distance});

       localStorage.setItem("bicycleTrackerData", JSON.stringify(data));

       renderGraph(data);
       input.value = "";
   }

});

renderGraph(data);