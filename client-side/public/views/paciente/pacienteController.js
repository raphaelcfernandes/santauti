/**
 * Created by raphael on 2/16/17.
 */
app.controller('pacienteCtrl', function($scope) {


    $scope.problemas = [
        {text:'Dengue', done:true, date: 1392658632},
        {text:'Cancer', done:false},
        {text:'Tuberculose', done:false}
    ];




    var data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                fill:false,
                /*backgroundColor: "rgba(75,192,192,0.4)",*/
                borderColor: "#ff1131",
                label: "Data1",
                fillColor: "rgba(255, 17, 49, 1)",
                strokeColor: "rgba(255, 17, 49, 1)",
                pointColor: "rgba(210, 214, 222, 1)",
                pointStrokeColor: "#c1c7d1",
                pointHighlightFill: "#ff1131",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                fill: false,
                label: "Data2",
                borderColor: "#3b8bba",
                fillColor: "rgba(60,141,188,0.9)",
                strokeColor: "rgba(60,141,188,0.8)",
                pointColor: "#3b8bba",
                pointStrokeColor: "rgba(60,141,188,1)",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(60,141,188,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };

    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Segunda", "Terća", "Quarta", "Quinta", "Sexta", "Sabado"],
            datasets: [{
                label: 'Exemplo',
                data: [36, 37.5, 38, 38.5, 39, 39.5],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
    var ctx1 = document.getElementById("lineChart");
    var lineChart = new Chart(ctx1, {
        type: 'line',
        data: data,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
    var ctx2 = document.getElementById("barChart");
    var barChart = new Chart(ctx2, {
        type: 'radar',
        data: data,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
    var ctx3 = document.getElementById("pieChart");
    var pieChart = new Chart(ctx3,{
        type: 'line',
        data: data,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
});