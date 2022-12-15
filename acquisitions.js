import { Chart } from '/package/auto/auto.js'

(async function() {
  const data = [
    { hour: 4, count: 28 },  
    { hour: 5, count: 28 },
    { hour: 6, count: 27 },
    { hour: 7, count: 26.5 },
    { hour: 8, count: 25 },
    { hour: 9, count: 22 },
    { hour: 10, count: 26 },
    { hour: 11, count: 30 },  
    { hour: 12, count: 20 },
    { hour: 13, count: 24 },
    { hour: 14, count: 23.5 },
    { hour: 15, count: 27 },
    { hour: 16, count: 26 },
    { hour: 17, count: 29 },
  ];

  new Chart(
    document.getElementById('acquisitions'),
    {
      type: 'line',
      data: {
        labels: data.map(row => row.hour),
        datasets: [
          {
            label: 'Temperature by hour',
            data: data.map(row => row.count)
          }
        ]
      }
    }
  );
})();