/* eslint-disable react/prop-types */
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HouseLineChart = ({ data }) => {
  // Example static data structure for the chart
  const chartData = {
    labels: ['1', '2', '3', '4', '5', '6','7','8','9','10','11'], // X-axis labels
    datasets: [
      {
        label: 'آمار بازدید', // Legend label
        fill: false,  // No fill below the line
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)', // Line fill color
        borderColor: 'rgba(75,192,192,1)', // Line color
        borderCapStyle: 'butt',
        borderDash: [], // Dashed line
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data,  // Dynamically provided data from props
      }
    ]
  };

  return (
    <div>
      <Line
        data={chartData}
        options={{
          title: {
            display: true,
            text: 'House Views by Month',
            fontSize: 20
          },
          legend: {
            display: true,
            position: 'right'
          },
          maintainAspectRatio: false, // Optional: maintain the aspect ratio of the chart,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'زمان', // X-axis label
                font: {
                  size: 16
                }
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'تعداد بازدید', // Y-axis label
                font: {
                  size: 16
                }
              },
              beginAtZero: true // Ensure the Y-axis starts at 0
            }
        }}}
      />
    </div>
  );
};

export default HouseLineChart;
