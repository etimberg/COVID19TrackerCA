// lineGraph: configures data for line graphs
// @param data: [] case data
// @param id: string graph container
// @param flag: boolean cumulative or not

Chart.Legend.prototype.afterFit = function() {
    this.height = this.height + 20;
};

function lineGraph(data, id, flag, type) {
    var name = [];
    var prefix = flag ? "total" : "change";
    var allData = {
        "cases": [],
        "fatalities": [],
        "recoveries": [],
        "hospitalizations": [],
        "criticals": [],
        "tests": [],
        "vaccinations": []
    };


    for (var i in data) {
        var date = new Date(data[i].date);
        date.setDate(date.getDate() + 1);

        name.push(new Intl.DateTimeFormat('en-us', {
            month: 'short',
            day: 'numeric'
        }).format(date));

        for (var key in allData) {
            var dataItem = data[i][prefix ? (prefix + "_" + key) : key];
            if (!dataItem) dataItem = 0;
            allData[key].push(dataItem);
        }
    }

    // used to setup graph that needs to be drawn
    var graphConfig = {
        graphTarget: $(id),
        type: 'line',
        unit: 'date',
        chartdata: {
            labels: name,
            datasets: [
                {
                    label: "Cases",
                    lineTension: 0.2,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    pointHitRadius: 3,
                    pointBorderWidth: 1,
                    pointBorderColor: "rgba(255,255,255,0.8)",
                    pointBackgroundColor: "rgba(2,117,216,1)",
                    pointHoverBackgroundColor: "rgba(2,117,216,1)",
                    backgroundColor: "rgba(2,117,216,0.2)",
                    borderColor: "rgba(2,117,216,1)",
                    data: allData["cases"]
                },
                {
                    label: "Deaths",
                    lineTension: 0.2,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    pointHitRadius: 3,
                    pointBorderWidth: 1,
                    pointBorderColor: "rgba(255,255,255,0.8)",
                    pointBackgroundColor: "rgba(220,53,69,0.8)",
                    pointHoverBackgroundColor: "#dc3545",
                    backgroundColor: "rgba(220,53,69,0.2)",
                    borderColor: "#dc3545",
                    data: allData["fatalities"],
                    hidden: true
                },
                {
                    label: "Recoveries",
                    lineTension: 0.2,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    pointHitRadius: 3,
                    pointBorderWidth: 1,
                    pointBorderColor: "rgba(255,255,255,0.8)",
                    pointBackgroundColor: "#28a745",
                    pointHoverBackgroundColor: "#28a745",
                    backgroundColor: "rgba(40,167,69,0.2)",
                    borderColor: "#28a745",
                    data: allData["recoveries"],
                    hidden: true
                },
                {
                    label: "Hospitalizations",
                    lineTension: 0.2,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    pointHitRadius: 3,
                    pointBorderWidth: 1,
                    pointBorderColor: "rgba(255,255,255,0.8)",
                    pointBackgroundColor: "#ffc107",
                    pointHoverBackgroundColor: "#ffc107",
                    backgroundColor: "rgba(255,193,7,0.2)",
                    borderColor: "#ffc107",
                    data: allData["hospitalizations"],
                    hidden: true
                },
                {
                    label: "Criticals",
                    lineTension: 0.2,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    pointHitRadius: 3,
                    pointBorderWidth: 1,
                    pointBorderColor: "rgba(255,255,255,0.8)",
                    pointBackgroundColor: "#ff6a07",
                    pointHoverBackgroundColor: "#ff6a07",
                    backgroundColor: "rgba(255,106,7,0.2)",
                    borderColor: "#ff6a07",
                    data: allData["criticals"],
                    hidden: true
                },
                {
                    label: "Testing",
                    lineTension: 0.2,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    pointHitRadius: 3,
                    pointBorderWidth: 1,
                    pointBorderColor: "rgba(255,255,255,0.8)",
                    pointBackgroundColor: "#5c3b8d",
                    pointHoverBackgroundColor: "#5c3b8d",
                    backgroundColor: "rgba(92,59,141,0.2)",
                    borderColor: "#5c3b8d",
                    data: allData["tests"],
                    hidden: true
                },
                {
                    label: "Vaccinations",
                    lineTension: 0.2,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    pointHitRadius: 3,
                    pointBorderWidth: 1,
                    pointBorderColor: "rgba(255,255,255,0.8)",
                    pointBackgroundColor: "#353A3F",
                    pointHoverBackgroundColor: "#353A3F",
                    backgroundColor: "rgba(92,59,141,0.2)",
                    borderColor: "#353A3F",
                    data: allData["vaccinations"],
                    hidden: true
                }
            ]
        },
        ticks: 7
    }

    if (type === "region") graphConfig.chartdata.datasets = [graphConfig.chartdata.datasets[0], graphConfig.chartdata.datasets[1]];

    // renders the graph
    draw(graphConfig);
}

function lineGraphCompare(data1, data2, label1, label2, field, id, flag) {
    var name = [];
    var prefix = flag ? "total" : "change";
    var allData = {
        "cases1": [],
        "fatalities1": [],
        "recoveries1": [],
        "hospitalizations1": [],
        "criticals1": [],
        "tests1": [],
        "vaccinations1": [],
        "cases2": [],
        "fatalities2": [],
        "recoveries2": [],
        "hospitalizations2": [],
        "criticals2": [],
        "tests2": [],
        "vaccinations2": []


    };

    for (var i in data1) {
        var date = new Date(data1[i].date);
        date.setDate(date.getDate() + 1);

        name.push(new Intl.DateTimeFormat('en-us', {
            month: 'short',
            day: 'numeric'
        }).format(date));

        for (var key in allData) {
            var data = key.indexOf("1") !== -1 ? data1 : data2;
            var realKey = key.substr(0, key.length - 1);
            var dataItem = data[i][prefix + "_" + realKey];
            if (!dataItem) dataItem = 0;
            allData[key].push(dataItem);
        }
    }

    // used to setup graph that needs to be drawn
    var graphConfig = {
        graphTarget: $(id),
        type: 'line',
        unit: 'date',
        chartdata: {
            labels: name,
            datasets: []
        },
        ticks: 7
    }

    if (field === "cases") {
        graphConfig.chartdata.datasets = [
            {
                label: label1 + " Cases",
                    lineTension: 0.2,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    pointHitRadius: 3,
                    pointBorderWidth: 1,
                pointBorderColor: "rgba(255,255,255,0.8)",
                pointBackgroundColor: "rgba(2,117,216,1)",
                pointHoverBackgroundColor: "rgba(2,117,216,1)",
                backgroundColor: "rgba(2,117,216,0.2)",
                borderColor: "rgba(2,117,216,1)",
                data: allData["cases1"]
            },
            {
                label: label2 + " Cases",
                    lineTension: 0.2,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    pointHitRadius: 3,
                    pointBorderWidth: 1,
                pointBorderColor: "rgba(255,255,255,0.8)",
                pointBackgroundColor: "rgba(220,53,69,0.8)",
                pointHoverBackgroundColor: "#dc3545",
                backgroundColor: "rgba(220,53,69,0.2)",
                borderColor: "#dc3545",
                data: allData["cases2"]
            }
        ];
    }

    if (field === "fatalities") {
        graphConfig.chartdata.datasets = [
            {
                label: label1 + " Deaths",
                    lineTension: 0.2,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    pointHitRadius: 3,
                    pointBorderWidth: 1,
                pointBorderColor: "rgba(255,255,255,0.8)",
                pointBackgroundColor: "rgba(2,117,216,1)",
                pointHoverBackgroundColor: "rgba(2,117,216,1)",
                backgroundColor: "rgba(2,117,216,0.2)",
                borderColor: "rgba(2,117,216,1)",
                data: allData["fatalities1"]
            },
            {
                label: label2 + " Deaths",
                    lineTension: 0.2,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    pointHitRadius: 3,
                    pointBorderWidth: 1,
                pointBorderColor: "rgba(255,255,255,0.8)",
                pointBackgroundColor: "rgba(220,53,69,0.8)",
                pointHoverBackgroundColor: "#dc3545",
                backgroundColor: "rgba(220,53,69,0.2)",
                borderColor: "#dc3545",
                data: allData["fatalities2"]
            }
        ];
    }

    if (field === "recoveries") {
        graphConfig.chartdata.datasets = [
            {
                label: label1 + " Recoveries",
                    lineTension: 0.2,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    pointHitRadius: 3,
                    pointBorderWidth: 1,
                pointBorderColor: "rgba(255,255,255,0.8)",
                pointBackgroundColor: "rgba(2,117,216,1)",
                pointHoverBackgroundColor: "rgba(2,117,216,1)",
                backgroundColor: "rgba(2,117,216,0.2)",
                borderColor: "rgba(2,117,216,1)",
                data: allData["recoveries1"]
            },
            {
                label: label2 + " Recoveries",
                    lineTension: 0.2,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    pointHitRadius: 3,
                    pointBorderWidth: 1,
                pointBorderColor: "rgba(255,255,255,0.8)",
                pointBackgroundColor: "rgba(220,53,69,0.8)",
                pointHoverBackgroundColor: "#dc3545",
                backgroundColor: "rgba(220,53,69,0.2)",
                borderColor: "#dc3545",
                data: allData["recoveries2"]
            }
        ];
    }

    if (field === "hospitalizations") {
        graphConfig.chartdata.datasets = [
            {
                label: label1 + " Hospitalizations",
                    lineTension: 0.2,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    pointHitRadius: 3,
                    pointBorderWidth: 1,
                pointBorderColor: "rgba(255,255,255,0.8)",
                pointBackgroundColor: "rgba(2,117,216,1)",
                pointHoverBackgroundColor: "rgba(2,117,216,1)",
                backgroundColor: "rgba(2,117,216,0.2)",
                borderColor: "rgba(2,117,216,1)",
                data: allData["hospitalizations1"]
            },
            {
                label: label2 + " Hospitalizations",
                    lineTension: 0.2,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    pointHitRadius: 3,
                    pointBorderWidth: 1,
                pointBorderColor: "rgba(255,255,255,0.8)",
                pointBackgroundColor: "rgba(220,53,69,0.8)",
                pointHoverBackgroundColor: "#dc3545",
                backgroundColor: "rgba(220,53,69,0.2)",
                borderColor: "#dc3545",
                data: allData["hospitalizations2"]
            }
        ];
    }

    if (field === "criticals") {
        graphConfig.chartdata.datasets = [
            {
                label: label1 + " Criticals",
                    lineTension: 0.2,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    pointHitRadius: 3,
                    pointBorderWidth: 1,
                pointBorderColor: "rgba(255,255,255,0.8)",
                pointBackgroundColor: "rgba(2,117,216,1)",
                pointHoverBackgroundColor: "rgba(2,117,216,1)",
                backgroundColor: "rgba(2,117,216,0.2)",
                borderColor: "rgba(2,117,216,1)",
                data: allData["criticals1"]
            },
            {
                label: label2 + " Criticals",
                    lineTension: 0.2,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    pointHitRadius: 3,
                    pointBorderWidth: 1,
                pointBorderColor: "rgba(255,255,255,0.8)",
                pointBackgroundColor: "rgba(220,53,69,0.8)",
                pointHoverBackgroundColor: "#dc3545",
                backgroundColor: "rgba(220,53,69,0.2)",
                borderColor: "#dc3545",
                data: allData["criticals2"]
            }
        ];
    }

    if (field === "tests") {
        graphConfig.chartdata.datasets = [
            {
                label: label1 + " Testing",
                    lineTension: 0.2,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    pointHitRadius: 3,
                    pointBorderWidth: 1,
                pointBorderColor: "rgba(255,255,255,0.8)",
                pointBackgroundColor: "rgba(2,117,216,1)",
                pointHoverBackgroundColor: "rgba(2,117,216,1)",
                backgroundColor: "rgba(2,117,216,0.2)",
                borderColor: "rgba(2,117,216,1)",
                data: allData["tests1"]
            },
            {
                label: label2 + " Testing",
                    lineTension: 0.2,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    pointHitRadius: 3,
                    pointBorderWidth: 1,
                pointBorderColor: "rgba(255,255,255,0.8)",
                pointBackgroundColor: "rgba(220,53,69,0.8)",
                pointHoverBackgroundColor: "#dc3545",
                backgroundColor: "rgba(220,53,69,0.2)",
                borderColor: "#dc3545",
                data: allData["tests2"]
            }
        ];
    }



    if (field === "vaccinations") {
        graphConfig.chartdata.datasets = [
            {
                label: label1 + " Vaccinated",
                    lineTension: 0.2,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    pointHitRadius: 3,
                    pointBorderWidth: 1,
                pointBorderColor: "rgba(255,255,255,0.8)",
                pointBackgroundColor: "rgba(2,117,216,1)",
                pointHoverBackgroundColor: "rgba(2,117,216,1)",
                backgroundColor: "rgba(2,117,216,0.2)",
                borderColor: "rgba(2,117,216,1)",
                data: allData["vaccinations1"]
            },
            {
                label: label2 + " Vaccinated",
                    lineTension: 0.2,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    pointHitRadius: 3,
                    pointBorderWidth: 1,
                pointBorderColor: "rgba(255,255,255,0.8)",
                pointBackgroundColor: "rgba(220,53,69,0.8)",
                pointHoverBackgroundColor: "#dc3545",
                backgroundColor: "rgba(220,53,69,0.2)",
                borderColor: "#dc3545",
                data: allData["vaccinations2"]
            }
        ];
    }
    
    // renders the graph
    draw(graphConfig);
}

// barGraph: configures data for bar graphs
// @param data: [] case data
// @param id: string graph container
function barGraph(data, id) {
    var name = [];
    var allData = {
        "cases": [],
        "fatalities": [],
        "recoveries": [],
        "hospitalizations": [],
        "criticals": [],
        "tests": []
    };

    data.sort(function(a, b) {
        return b["total_cases"] - a["total_cases"];
    });

    for (var i in data) {
        name.push(provinceProperties(data[i].province).name);
        for (var key in allData) {
            var dataItem = data[i]["total_" + key];
            if (!dataItem) dataItem = 0;
            allData[key].push(dataItem);
        }
    }

    var graphConfig = {
        graphTarget: $(id),
        type: 'bar',
        unit: 'month',
        chartdata: {
            labels: name,
            datasets: [
                {
                    label: "Cases",
                    backgroundColor: "rgba(2,117,216,1)",
                    borderColor: "rgba(2,117,216,1)",
                    data: allData["cases"]
                },
                {
                    label: "Deaths",
                    backgroundColor: "#dc3545",
                    borderColor: "#dc3545",
                    data: allData["fatalities"],
                    hidden: true
                },
                {
                    label: "Recoveries",
                    backgroundColor: "#28a745",
                    borderColor: "#28a745",
                    data: allData["recoveries"],
                    hidden: true
                },
                {
                    label: "Hospitalizations",
                    backgroundColor: "#ffc107",
                    borderColor: "#ffc107",
                    data: allData["hospitalizations"],
                    hidden: true
                },
                {
                    label: "Criticals",
                    backgroundColor: "#ff6a07",
                    borderColor: "#ff6a07",
                    data: allData["criticals"],
                    hidden: true
                },
                {
                    label: "Testing",
                    backgroundColor: "#5c3b8d",
                    borderColor: "#5c3b8d",
                    data: allData["tests"],
                    hidden: true
                },
                {
                    label: "Vaccinations",
                    backgroundColor: "#353A3F",
                    borderColor: "#353A3F",
                    data: allData["vaccinations"],
                    hidden: true
                }
            ]
        },
        ticks: 15
    }

    // renders the graph
    draw(graphConfig);
}


// draw: renders the graph to HTML
// @param graphConfig: {} config for graph
function draw(graphConfig) {
    Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = '#292b2c';

    var chart = new Chart(graphConfig.graphTarget, {
        type: graphConfig.type,
        data: graphConfig.chartdata,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    time: {
                        unit: graphConfig.unit
                    },
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        maxTicksLimit: graphConfig.ticks
                    }
                }],
                yAxes: [{
                    ticks: {
                        min: 0,
                        maxTicksLimit: 5
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, .125)",
                    }
                }],
            },
            legend: {
                display: true
            }
        }
    });

    graphConfig.graphTarget.data("chart", chart);
    graphConfig.graphTarget.data("originalData", graphConfig.chartdata);
}

function toggleChartSetting(el) {
    var isChecked = $(el)[0].checked;
    if (isChecked) $(el).parent().addClass("checked");
    else $(el).parent().removeClass("checked");

    updateGraph($(el).closest(".card-body"));
}

function updateGraph(container) {
    var graphContainer = container.find("canvas");
    var graph = graphContainer.data("chart");
    var originalData = graphContainer.data("originalData");

    var recentOnly = container.find(".chart-options > span:nth-child(1) input")[0].checked;
    var logarithmicScale = container.find(".chart-options > span:nth-child(2) input")[0].checked;
    var rollingAverage = container.find(".chart-options > span:nth-child(3) input")[0].checked;

    var data = $.extend(true, {}, originalData);

    // filter original data by last 3 weeks, if set
    if (recentOnly) {
        var originalCount = data.labels.length;
        var labels = $.extend(true, [], data.labels);
        labels = labels.filter(item => moment().diff(item + ' 2020', 'week') < 3);
        data.labels = labels;
        var itemsRemoved = originalCount - labels.length;
        data.datasets.forEach(dataset => {
           dataset.data.splice(0, itemsRemoved);
        });
    }

    // apply log scale to graph, if set
    graph.config.options.scales.yAxes[0].type = logarithmicScale ? "logarithmic" : "linear";

    // apply rolling average
    data.datasets.forEach(dataset => {
        if (dataset.originalData === undefined) dataset.originalData = [...dataset.data];
    });

    if (rollingAverage) {
        data.datasets.forEach(dataset => {
            dataset.data = movingAvg([...dataset.originalData], 7);
        });
    }
    else {
        data.datasets.forEach(dataset => {
            dataset.data = [...dataset.originalData];
        });
    }

    // set new data based on original data
    graph.config.data = data;
    graph.update();
}

function movingAvg(array, count, qualifier){

    // calculate average for subarray
    var avg = function(array, qualifier){

        var sum = 0, count = 0, val;
        for (var i in array){
            val = array[i];
            if (!qualifier || qualifier(val)){
                sum += val;
                count++;
            }
        }

        return sum / count;
    };

    var result = [], val;

    // pad beginning of result with null values
    for (var i=0; i < count-1; i++)
        result.push(null);

    // calculate average for each subarray and add to result
    for (var i=0, len=array.length - count; i <= len; i++){

        val = avg(array.slice(i, i + count), qualifier);
        if (isNaN(val))
            result.push(null);
        else
            result.push(val);
    }

    return result;
}