// // import { useEffect, useRef } from 'react';
// // import { CChartLine } from '@coreui/react-chartjs';
// // import { getStyle } from '@coreui/utils';

// // function formatNumber(number) {
// //   // Convert to string and format with commas
// //   let formatted = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// //   // Convert to Persian numerals
// //   const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
// //   return formatted.replace(/\d/g, (digit) => persianDigits[digit]);
// // }
// // const comments = Array.from({ length: 30 }, (_, i) => ({
// //   date: formatNumber(i + 1),
// //   positive: Math.floor(Math.random() * 40) + 1,
// //   negative: Math.floor(Math.random() * 40) + 1,
// //   noDiff: Math.floor(Math.random() * 40) + 1,
// // }));


// // const MainChart = (commentData) => {
// //   const chartRef = useRef(null);

// //   // Function to format the date to 'YYYY-MM-DD' format (ignoring the time part)
// // function formatDate(dateStr) {
// //   return new Date(dateStr).toISOString().split('T')[0];
// // }

// // // Initialize an object to store the results
// // const result = {};

// // // Iterate through the comments array
// // commentData.forEach(comment => {
// //   const date = formatDate(comment.created_at);  // Extract the date without time
// //   if (!result[date]) {
// //       result[date] = { good: 0, bad: 0, neutral: 0 };
// //   }

// //   // Count sentiment based on the comment's sentiment value
// //   if (comment.sentiment === 'good') {
// //       result[date].good += 1;
// //   } else if (comment.sentiment === 'neutral') {
// //       result[date].neutral += 1;
// //   } else {
// //       result[date].bad += 1;  // Assuming any other sentiment is 'bad'
// //   }
// // });

// // // Convert the result object into the desired array format
// // const output = Object.entries(result).map(([date, sentiments]) => ({
// //   created_at: date,
// //   good: sentiments.good,
// //   bad: sentiments.bad,
// //   neutral: sentiments.neutral,
// // }));

// // console.log("output",output);


// //   useEffect(() => {
// //     document.documentElement.addEventListener('ColorSchemeChange', () => {
// //       if (chartRef.current) {
// //         setTimeout(() => {
// //           chartRef.current.options.scales.x.grid.color = 'rgba(0, 0, 0, 0)'; // Transparent
// //           chartRef.current.options.scales.y.grid.color = 'rgba(0, 0, 0, 0)'; // Transparent
// //           chartRef.current.update();
// //         });
// //       }
// //     });
// //   }, [chartRef]);

// //   // Extract data for the datasets
// //   const labels = comments.map(comment => comment.date.toString());
// //   const positiveData = comments.map(comment => comment.positive);
// //   const negativeData = comments.map(comment => comment.negative);
// //   const noDiffData = comments.map(comment => comment.noDiff);

// //   return (
// //     <>
// //       <CChartLine
// //         ref={chartRef}
// //         style={{ height: '300px', marginTop: '40px' }}
// //         data={{
// //           labels: labels,
// //           datasets: [
// //             {
// //               label: 'نظرات مثبت',
// //               backgroundColor: 'rgba(25, 202, 42, 0.3)', // Light green for no difference
// //               borderColor: 'rgba(25, 202, 42, 1)',       // Solid green for no difference
// //               pointHoverBackgroundColor: 'rgba(25, 202, 42, 1)',
              
// //               borderWidth: 2,
// //               data: positiveData, // Use mapped positive data
// //               fill: true,
// //             },
// //             {
// //                 label: 'نظرات منفی',
// //                 backgroundColor: 'rgba(255, 99, 132, 0.3)', // Light red for negative
// //               borderColor: 'rgba(255, 99, 132, 1)',       // Solid red for negative
// //               pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)',
// //               borderWidth: 2,
// //               data: negativeData, // Use mapped negative data
// //               fill: true,
// //             },
// //             {
// //                 label: 'نظرات خنثی',
// //                 backgroundColor: 'rgba(75, 192, 192, 0.3)', // Light green for positive
// //               borderColor: 'rgba(75, 192, 192, 1)',       // Solid green for positive
// //               pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
// //               borderWidth: 1,
// //               data: noDiffData, // Use mapped no difference data
// //               borderDash: [5, 5],
// //             }
// //           ],
// //         }}
// //         options={{
// //           maintainAspectRatio: false,
// //           plugins: {
// //             legend: {
// //               display: false,
// //             },
// //             tooltip: {
// //               enabled: true, // Enable tooltip
              
// //               mode: 'index', // Tooltip mode
// //               intersect: false, // Show tooltip for nearest point
// //               position: 'nearest', // Aligns tooltip with the closest point
// //               backgroundColor: 'rgba(255, 255, 255, 0.9)', // Tooltip background
// //               titleColor: '#000', // Tooltip title color
// //               bodyColor: '#000', // Tooltip body color
// //               padding: 10,
// //               borderColor: 'rgba(0, 0, 0, 0.2)', // Tooltip border color
// //               borderWidth: 1,
// //               callbacks: {
// //                 label: (tooltipItem) => {
// //                   return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
// //                 },
// //               },
// //             },
// //           },
// //           scales: {
// //             x: {
// //               grid: {
// //                 color: 'rgba(0, 0, 0, 0)',
// //               },
// //               ticks: {
// //                 color: getStyle('--cui-body-color'),
// //               },
// //               title: {
// //                 display: true,
// //                 text: 'تاریخ',
// //                 color: getStyle('--cui-body-color'),
// //                 font: {
// //                   size: 18,
// //                 },
// //               },
// //             },
// //             y: {
// //               beginAtZero: true,
// //               grid: {
// //                 color: 'rgba(0, 0, 0, 0)',
// //               },
// //               max: 50,
// //               ticks: {
// //                 color: getStyle('--cui-body-color'),
// //                 maxTicksLimit: 5,
// //                 stepSize: Math.ceil(50 / 4),
// //               },
// //               title: {
// //                 display: true,
// //                 text: 'تعداد نظرات',
// //                 color: getStyle('--cui-body-color'),
// //                 font: {
// //                   size: 18,
// //                 },
// //               },
// //             },
// //           },
// //           elements: {
// //             line: {
// //               tension: 0.4,
// //             },
// //             point: {
// //               radius: 0,
// //               hitRadius: 10,
// //               hoverRadius: 4,
// //               hoverBorderWidth: 3,
// //             },
// //           },
// //         }}
// //       />
// //     </>
// //   );
// // };

// // export default MainChart;
// import React, { useEffect, useRef } from 'react';
// import { CChartLine } from '@coreui/react-chartjs';
// import { getStyle } from '@coreui/utils';
// import jalaali from 'jalaali-js';

// function convertToShamsi(gregorianDateString) {
//   // Parse the input date string to a Date object
//   const date = new Date(gregorianDateString);

//   // Extract the UTC year, month, and day
//   const year = date.getUTCFullYear();
//   const month = date.getUTCMonth() + 1; // getUTCMonth() returns 0-indexed months
//   const day = date.getUTCDate();

//   // Convert the Gregorian date to Shamsi (Jalali) date
//   const shamsiDate = jalaali.toJalaali(year, month, day);

//   // Return the Shamsi date in yyyy-mm-dd format
//   return `${shamsiDate.jy}-${shamsiDate.jm}-${shamsiDate.jd}`;
// }
// function formatNumber(number) {
//   // const formatted = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//   const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
//   return number.replace(/\d/g, (digit) => persianDigits[digit]);
// }

// const MainChart = ({ commentData = [] }) => {
//   const chartRef = useRef(null);

//   // Ensure commentData is an array
//   const commentsArray = Array.isArray(commentData) ? commentData : [];

//   // Function to format the date to 'YYYY-MM-DD'
//   const formatDate = (dateStr) => new Date(dateStr).toISOString().split('T')[0];

//   // Process the comments to extract data by date and sentiment
//   const processComments = (comments) => {
//     const result = {};

//     // Iterate through the comments array and process data
//     comments.forEach((comment) => {
//       const datee = formatDate(comment.created_at); // Extract date only
//       const date = convertToShamsi(datee)
//       if (!result[date]) {
//         result[date] = { good: 0, bad: 0, neutral: 0 };
//       }

//       // Count sentiment based on the comment's sentiment value
//       if (comment.sentiment === 'good') {
//         result[date].good += 1;
//       } else if (comment.sentiment === 'neutral') {
//         result[date].neutral += 1;
//       } else {
//         result[date].bad += 1;
//       }
//     });
 
//     return Object.entries(result).map(([date, sentiments]) => ({
//       created_at: date,
//       good: sentiments.good,
//       bad: sentiments.bad,
//       neutral: sentiments.neutral,
//     }));
    
// };
//   };

//   const processedComments = processComments(commentsArray);
//   console.log("commentsArray:",commentsArray);
//   console.log("processedComments:",processedComments);
  

//   // Extracting data for the datasets
//   const labels = processedComments.map((comment) => formatNumber(comment.created_at));
//   const goodData = processedComments.map((comment) => comment.good);
//   const badData = processedComments.map((comment) => comment.bad);
//   const neutralData = processedComments.map((comment) => comment.neutral);

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
//               data: goodData,
//               fill: true,
//             },
//             {
//               label: 'نظرات منفی',
//               backgroundColor: 'rgba(255, 99, 132, 0.3)',
//               borderColor: 'rgba(255, 99, 132, 1)',
//               pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)',
//               borderWidth: 2,
//               data: badData,
//               fill: true,
//             },
//             {
//               label: 'نظرات خنثی',
//               backgroundColor: 'rgba(75, 192, 192, 0.3)',
//               borderColor: 'rgba(75, 192, 192, 1)',
//               pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
//               borderWidth: 1,
//               data: neutralData,
//               borderDash: [5, 5],
//             },
//           ],
//         }}
//         options={{
//           maintainAspectRatio: false,
//           plugins: {
//             tooltip: {
//               enabled: true,
//               mode: 'index',
//               intersect: false,
//               position: 'nearest',
//               backgroundColor: 'rgba(255, 255, 255, 0.9)',
//               titleColor: '#000',
//               bodyColor: '#000',
//               padding: 10,
//               borderColor: 'rgba(0, 0, 0, 0.2)',
//               borderWidth: 1,
//               callbacks: {
//                 label: (tooltipItem) => {
//                   return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
//                 },
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
//               grid: {
//                 color: 'rgba(0, 0, 0, 0)',
//               },
//               max: 50,
//               ticks: {
//                 color: getStyle('--cui-body-color'),
//                 maxTicksLimit: 5,
//                 stepSize: Math.ceil(50 / 4),
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
import React, { useEffect, useRef } from 'react';
import { CChartLine } from '@coreui/react-chartjs';
import { getStyle } from '@coreui/utils';
import jalaali from 'jalaali-js';

function convertToShamsi(gregorianDateString) {
  const date = new Date(gregorianDateString);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const shamsiDate = jalaali.toJalaali(year, month, day);
  return `${shamsiDate.jy}-${shamsiDate.jm}-${shamsiDate.jd}`;
}

function formatNumber(number) {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return number.replace(/\d/g, (digit) => persianDigits[digit]);
}

const MainChart = ({ commentData = [] }) => {
  const chartRef = useRef(null);
  const commentsArray = Array.isArray(commentData) ? commentData : [];

  const formatDate = (dateStr) => new Date(dateStr).toISOString().split('T')[0];

  console.log(commentData);
  
  const processComments = (comments) => {
    const result = {};

    comments.forEach((comment) => {
      const datee = formatDate(comment.created_at);
      const date = convertToShamsi(datee);
      if (!result[date]) {
        result[date] = { good: 0, bad: 0, neutral: 0 };
      }

      if (comment.sentiment === 'good') {
        result[date].good += 1;
      } else if (comment.sentiment === 'neutral') {
        result[date].neutral += 1;
      } else {
        result[date].bad += 1;
      }
    });

    const sortedResult = Object.entries(result)
      .map(([date, sentiments]) => ({
        created_at: date,
        good: sentiments.good,
        bad: sentiments.bad,
        neutral: sentiments.neutral,
      }))
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at)); // Sort by date

    return sortedResult;
  };

  const processedComments = processComments(commentsArray);

  const labels = processedComments.map((comment) => formatNumber(comment.created_at));
  const goodData = processedComments.map((comment) => comment.good);
  const badData = processedComments.map((comment) => comment.bad);
  const neutralData = processedComments.map((comment) => comment.neutral);

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (chartRef.current) {
        setTimeout(() => {
          chartRef.current.options.scales.x.grid.color = 'rgba(0, 0, 0, 0)';
          chartRef.current.options.scales.y.grid.color = 'rgba(0, 0, 0, 0)';
          chartRef.current.update();
        });
      }
    });
  }, [chartRef]);

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
              backgroundColor: 'rgba(25, 202, 42, 0.3)',
              borderColor: 'rgba(25, 202, 42, 1)',
              pointHoverBackgroundColor: 'rgba(25, 202, 42, 1)',
              borderWidth: 2,
              data: goodData,
              fill: true,
            },
            {
              label: 'نظرات منفی',
              backgroundColor: 'rgba(255, 99, 132, 0.3)',
              borderColor: 'rgba(255, 99, 132, 1)',
              pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 2,
              data: badData,
              fill: true,
            },
            {
              label: 'نظرات خنثی',
              backgroundColor: 'rgba(75, 192, 192, 0.3)',
              borderColor: 'rgba(75, 192, 192, 1)',
              pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              data: neutralData,
              borderDash: [5, 5],
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              enabled: true,
              mode: 'index',
              intersect: false,
              position: 'nearest',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              titleColor: '#000',
              bodyColor: '#000',
              padding: 10,
              borderColor: 'rgba(0, 0, 0, 0.2)',
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
              max: 15,
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
