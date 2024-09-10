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
              title: {
                display: true,
                text: 'تاریخ',
                color: getStyle('--cui-body-color'),
                font: {
                  size: 18,
                },
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
              title: {
                display: true,
                text: 'تعداد نظرات',
                color: getStyle('--cui-body-color'),
                font: {
                  size: 18,
                },
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



// import React, { useEffect, useRef, useState } from 'react';
// import { CChartLine } from '@coreui/react-chartjs';
// import { getStyle } from '@coreui/utils';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// // Sample data for comments
// const comments = Array.from({ length: 30 }, (_, i) => ({
//   date: new Date(2024, 8, i + 1), // Adjust the date format
//   positive: Math.floor(Math.random() * 40) + 1,
//   negative: Math.floor(Math.random() * 40) + 1,
//   noDiff: Math.floor(Math.random() * 40) + 1,
// }));

// const MainChart = () => {
//   const chartRef = useRef(null);
  
//   // State for date range selection
//   const [startDate, setStartDate] = useState(new Date(2024, 8, 1)); // Default start date
//   const [endDate, setEndDate] = useState(new Date(2024, 8, 30)); // Default end date

//   // Filter comments based on the selected date range
//   const filteredComments = comments.filter(comment => 
//     comment.date >= startDate && comment.date <= endDate
//   );

//   // Extract data for the datasets
//   const labels = filteredComments.map(comment => comment.date.getDate().toString());
//   const positiveData = filteredComments.map(comment => comment.positive);
//   const negativeData = filteredComments.map(comment => comment.negative);
//   const noDiffData = filteredComments.map(comment => comment.noDiff);

//   useEffect(() => {
//     if (chartRef.current) {
//       chartRef.current.options.scales.x.grid.color = 'rgba(0, 0, 0, 0)';
//       chartRef.current.options.scales.y.grid.color = 'rgba(0, 0, 0, 0)';
//       chartRef.current.update();
//     }
//   }, [chartRef]);

//   return (
//     <>
//       <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
//         <div>
//           <label>Start Date:</label>
//           <DatePicker
//             selected={startDate}
//             onChange={(date) => setStartDate(date)}
//             dateFormat="yyyy/MM/dd"
//           />
//         </div>
//         <div>
//           <label>End Date:</label>
//           <DatePicker
//             selected={endDate}
//             onChange={(date) => setEndDate(date)}
//             dateFormat="yyyy/MM/dd"
//           />
//         </div>
//       </div>
      
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
//           scales: {
//             x: {
//               grid: {
//                 color: 'rgba(0, 0, 0, 0)',
//               },
//               title: {
//                 display: true,
//                 text: 'تاریخ',
//                 color: getStyle('--cui-body-color'),
//                 font: {
//                   size: 18,
//                 },
//               },
//             },
//             y: {
//               beginAtZero: true,
//               max: 50,
//               ticks: {
//                 maxTicksLimit: 5,
//                 stepSize: 10,
//                 color: getStyle('--cui-body-color'),
//               },
//               title: {
//                 display: true,
//                 text: 'تعداد نظرات',
//                 color: getStyle('--cui-body-color'),
//                 font: {
//                   size: 18,
//                 },
//               },
//             },
//           },
//         }}
//       />
//     </>
//   );
// };

// export default MainChart;
