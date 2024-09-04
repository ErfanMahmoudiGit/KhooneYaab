import React, { useEffect, useRef } from 'react';
import { CChartLine } from '@coreui/react-chartjs';
import { getStyle } from '@coreui/utils';

const comments = Array.from({ length: 30 }, (_, i) => ({
  date: i + 1,
  positive: Math.floor(Math.random() * 40) + 1,
  negative: Math.floor(Math.random() * 40) + 1,
  noDiff: Math.floor(Math.random() * 40) + 1,
}));

const MainChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (chartRef.current) {
        setTimeout(() => {
          chartRef.current.options.scales.x.grid.color = 'rgba(0, 0, 0, 0)'; // Transparent
          chartRef.current.options.scales.y.grid.color = 'rgba(0, 0, 0, 0)'; // Transparent
          chartRef.current.update();
        });
      }
    });
  }, [chartRef]);

  // Extract data for the datasets
  const labels = comments.map(comment => comment.date.toString());
  const positiveData = comments.map(comment => comment.positive);
  const negativeData = comments.map(comment => comment.negative);
  const noDiffData = comments.map(comment => comment.noDiff);

  return (
    <>
      <CChartLine
        ref={chartRef}
        style={{ height: '300px', marginTop: '40px' }}
        data={{
          labels: labels,
          datasets: [
            {
              label: 'نظرات مثبت',
              backgroundColor: 'rgba(25, 202, 42, 0.3)', // Light green for no difference
              borderColor: 'rgba(25, 202, 42, 1)',       // Solid green for no difference
              pointHoverBackgroundColor: 'rgba(25, 202, 42, 1)',
              
              borderWidth: 2,
              data: positiveData, // Use mapped positive data
              fill: true,
            },
            {
                label: 'نظرات منفی',
                backgroundColor: 'rgba(255, 99, 132, 0.3)', // Light red for negative
              borderColor: 'rgba(255, 99, 132, 1)',       // Solid red for negative
              pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 2,
              data: negativeData, // Use mapped negative data
              fill: true,
            },
            {
                label: 'نظرات خنثی',
                backgroundColor: 'rgba(75, 192, 192, 0.3)', // Light green for positive
              borderColor: 'rgba(75, 192, 192, 1)',       // Solid green for positive
              pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              data: noDiffData, // Use mapped no difference data
              borderDash: [5, 5],
            }
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: true, // Enable tooltip
              
              mode: 'index', // Tooltip mode
              intersect: false, // Show tooltip for nearest point
              position: 'nearest', // Aligns tooltip with the closest point
              backgroundColor: 'rgba(255, 255, 255, 0.9)', // Tooltip background
              titleColor: '#000', // Tooltip title color
              bodyColor: '#000', // Tooltip body color
              padding: 10,
              borderColor: 'rgba(0, 0, 0, 0.2)', // Tooltip border color
              borderWidth: 1,
              callbacks: {
                label: (tooltipItem) => {
                  return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                },
              },
            },
          },
          scales: {
            x: {
              grid: {
                color: 'rgba(0, 0, 0, 0)',
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0)',
              },
              max: 50,
              ticks: {
                color: getStyle('--cui-body-color'),
                maxTicksLimit: 5,
                stepSize: Math.ceil(50 / 4),
              },
            },
          },
          elements: {
            line: {
              tension: 0.4,
            },
            point: {
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4,
              hoverBorderWidth: 3,
            },
          },
        }}
      />
    </>
  );
};

export default MainChart;

// comments = [
//     {date : 1 , positive : 7 , negetive : 4 , noDiff : 5},
//     {date : 12 , positive : 8 , negetive : 14 , noDiff : 25},
//     {date : 8 , positive : 3 , negetive : 14 , noDiff : 5},
//     {date : 9 , positive : 10 , negetive : 4 , noDiff : 15}
// ]

// import React, { useEffect, useRef } from 'react';
// import { CChartLine } from '@coreui/react-chartjs';
// import { getStyle } from '@coreui/utils';

// const comments = Array.from({ length: 30 }, (_, i) => ({
//   date: i + 1,
//   positive: Math.floor(Math.random() * 40) + 1,
//   negative: Math.floor(Math.random() * 40) + 1,
//   noDiff: Math.floor(Math.random() * 40) + 1,
// }));

// const MainChart = () => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     document.documentElement.addEventListener('ColorSchemeChange', () => {
//       if (chartRef.current) {
//         setTimeout(() => {
//           chartRef.current.options.scales.x.grid.color = 'rgba(0, 0, 0, 0)'; 
//           chartRef.current.options.scales.y.grid.color = 'rgba(0, 0, 0, 0)'; 
//           chartRef.current.update();
//         });
//       }
//     });
//   }, [chartRef]);

//   const labels = comments.map(comment => comment.date.toString());
//   const positiveData = comments.map(comment => comment.positive);
//   const negativeData = comments.map(comment => comment.negative);
//   const noDiffData = comments.map(comment => comment.noDiff);

//   return (
//     <>
//       <CChartLine
//         ref={chartRef}
//         style={{ height: '300px', marginTop: '40px' }}
//         data={{
//           labels: labels,
//           datasets: [
//             {
//               label: 'نظرات مثبت',
//               backgroundColor: 'rgba(25, 202, 42, 0.3)',
//               borderColor: 'rgba(25, 202, 42, 1)',
//               pointHoverBackgroundColor: 'rgba(25, 202, 42, 1)',
//               borderWidth: 2,
//               data: positiveData,
//               fill: true,
//             },
//             {
//               label: 'نظرات منفی',
//               backgroundColor: 'rgba(255, 99, 132, 0.3)',
//               borderColor: 'rgba(255, 99, 132, 1)',
//               pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)',
//               borderWidth: 2,
//               data: negativeData,
//               fill: true,
//             },
//             {
//               label: 'نظرات خنثی',
//               backgroundColor: 'rgba(75, 192, 192, 0.3)',
//               borderColor: 'rgba(75, 192, 192, 1)',
//               pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
//               borderWidth: 1,
//               data: noDiffData,
//               borderDash: [5, 5],
//             }
//           ],
//         }}
//         options={{
//           maintainAspectRatio: false,
//           plugins: {
//             legend: {
//               display: false,
//             },
//             tooltip: {
//               enabled: true,
//               mode: 'index',
//               intersect: false,
//               position: 'nearest', // You can also use a custom handler if needed
//               // Custom tooltip positioning
//               callbacks: {
//                 label: (tooltipItem) => {
//                   return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
//                 },
//                 afterLabel: () => {
//                   return ""; // Empty to avoid extra labels
//                 },
//               },
//               // Custom positioning function
//               custom: function(tooltipModel) {
//                 // Tooltip element
//                 const tooltipEl = document.getElementById('chartjs-tooltip');
                
//                 // Create element if not exist
//                 if (!tooltipEl) {
//                   const newTooltipEl = document.createElement('div');
//                   newTooltipEl.id = 'chartjs-tooltip';
//                   newTooltipEl.innerHTML = '<table></table>';
//                   document.body.appendChild(newTooltipEl);
//                 }

//                 // Positioning logic
//                 const position = this._chart.canvas.getBoundingClientRect();
//                 const top = position.top + window.scrollY;

//                 // Set tooltip content
//                 const tooltipData = tooltipModel.body.map(item => item.lines).join('');
//                 const tooltip = document.getElementById('chartjs-tooltip');
//                 tooltip.style.opacity = '1';
//                 tooltip.style.left = position.left + window.scrollX + tooltipModel.caretX + 'px';
//                 tooltip.style.top = top + tooltipModel.caretY - 30 + 'px'; // Move above the point
//                 tooltip.querySelector('table').innerHTML = tooltipData;
//               },
//             },
//           },
//           scales: {
//             x: {
//               grid: {
//                 color: 'rgba(0, 0, 0, 0)',
//               },
//               ticks: {
//                 color: getStyle('--cui-body-color'),
//               },
//             },
//             y: {
//               beginAtZero: true,
//               grid: {
//                 color: 'rgba(0, 0, 0, 0)',
//               },
//               max: 50,
//               ticks: {
//                 color: getStyle('--cui-body-color'),
//                 maxTicksLimit: 5,
//                 stepSize: Math.ceil(50 / 4),
//               },
//             },
//           },
//           elements: {
//             line: {
//               tension: 0.4,
//             },
//             point: {
//               radius: 0,
//               hitRadius: 10,
//               hoverRadius: 4,
//               hoverBorderWidth: 3,
//             },
//           },
//         }}
//       />
//     </>
//   );
// };

// export default MainChart;
// #chartjs-tooltip {
//     opacity: 0;
//     position: absolute;
//     background: rgba(255, 255, 255, 0.9);
//     border: 1px solid rgba(0, 0, 0, 0.2);
//     border-radius: 4px;
//     pointer-events: none;  /* Prevent mouse events on the tooltip */
//     transition: opacity 0.2s ease;  /* Smooth transitions */
//   }
  
//   #chartjs-tooltip table {
//     border-collapse: collapse;
//   }
  