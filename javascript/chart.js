const trafficCanvas = document.getElementById("traffic-chart");

// Define datasets for each timeframe
const trafficDataHourly = {
    labels: ["16am", "17am", "18am", "19am", "20am", "21am", "22am"],
    datasets: [{
        data: [15, 25, 40, 30, 50, 70, 60],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1,
        lineTension: 0.3,
    }]
};

const trafficDataDaily = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [{
        data: [200, 350, 400, 300, 450, 500, 300],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1,
        lineTension: 0.3,
    }]
};

const trafficDataWeekly = {
    labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"],
    datasets: [{
        data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1,
        lineTension: 0.3,
    }]
};

const trafficDataMonthly = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
        data: [5000, 6000, 7500, 8000, 9500, 11000, 10500, 12000, 11500, 13000, 14500, 16000],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1,
        lineTension: 0.3,
    }]
};

// Helper function to return the correct dataset object based on ID
function getDataForTimeframe(timeframeId) {
    switch (timeframeId) {
        case 'hourly': return trafficDataHourly;
        case 'daily': return trafficDataDaily;
        case 'weekly': return trafficDataWeekly;
        case 'monthly': return trafficDataMonthly;
        default: return trafficDataWeekly;
    }
}

// Determine initial dataset based on whichever radio button is checked in HTML on page load
const checkedRadio = document.querySelector('.traffic-nav-link:checked') || document.getElementById('weekly');
const initialData = getDataForTimeframe(checkedRadio.id);

let trafficOptions = {
    responsive: false,
    maintainAspectRatio: true,
    aspectRatio: 2.5,
    backgroundColor: 'rgba(112, 104, 201, .5)',
    fill: true,
    animation: {
        duration: 0
    },
    scales: {
        y: {
            beginAtZero: true
        }
    },
    plugins: {
        legend: {
            display: false
        }
    }
};

// Initialize the traffic chart with the starting timeframe data
let trafficChart = new Chart(trafficCanvas, {
    type: 'line',
    data: initialData,
    options: trafficOptions
});

const trafficNavLinks = document.querySelectorAll('.traffic-nav-link');

trafficNavLinks.forEach(link => {
    link.addEventListener('change', () => {
        const checkedRadio = document.querySelector('.traffic-nav-link:checked');
        if (!checkedRadio) return;

        const selectedData = getDataForTimeframe(checkedRadio.id);

        if (selectedData) {
            // Replace the entire data object reference to force scale recalculation
            trafficChart.data = {
                labels: [...selectedData.labels],
                datasets: [{
                    data: [...selectedData.datasets[0].data],
                    backgroundColor: selectedData.datasets[0].backgroundColor,
                    borderWidth: selectedData.datasets[0].borderWidth,
                    lineTension: selectedData.datasets[0].lineTension
                }]
            };
            trafficChart.update();
        }
    });
});


const dailyCanvas = document.getElementById("daily-chart");

const dailyData = {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [{
        label: '# of Hits',
        data: [75, 115, 175, 125, 225, 200, 100],
        backgroundColor: '#7477BF',
        borderWidth: 1
    }]
};

const dailyOptions = {
    responsive: false,
    maintainAspectRatio: true,
    scales: {
        y: {
            beginAtZero: true
        }
    },
    plugins: {
        legend: {
            display: false
        }
    }
};

let dailyChart = new Chart(dailyCanvas, {
    type: 'bar',
    data: dailyData,
    options: dailyOptions
});

const mobileCanvas = document.getElementById("mobile-chart");

const mobileData = {
    labels: ["Desktop", "Tablet", "Phones"],
    datasets: [{
        label: '# of Users',
        data: [2000, 550, 500],
        borderWidth: 0,
        backgroundColor: [
            '#7477BF',
            '#78CF82',
            '#51B6C8'
        ]
    }]
};

const mobileOptions = {
    responsive: false,
    maintainAspectRatio: true,
    aspectRatio: 1.9,
    plugins: {
        legend: {
            position: 'right',
            labels: {
                boxWidth: 20,
                fontStyle: 'bold'
            }
        }
    }
};

let mobileChart = new Chart(mobileCanvas, {
    type: 'doughnut',
    data: mobileData,
    options: mobileOptions
});

function beforePrintHandler () {
    for (let id in trafficCanvas.instances) {
        trafficCanvas.instances[id].resize();
    }
}

window.addEventListener('afterprint', () => {
  trafficCanvas.resize();
});