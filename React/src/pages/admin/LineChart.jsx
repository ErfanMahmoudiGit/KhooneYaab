// LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const LineChart = () => {
  // Define the data for each array
  const data1 = [60, 20, 30, 40, 50];
  const data2 = [15, 25, 76, 45, 55];
  const data3 = [5, 15, 4, 35, 45];

  // Define the chart data and options
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May'], // x-axis labels
    datasets: [
      {
        label: 'نظرات منفی',
        data: data1,
        borderColor: 'rgba(255, 99, 132, 1)', // Red
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // Light Red
        fill: false,
      },
      {
        label: 'نظرات خنثی',
        data: data2,
        borderColor: 'rgba(54, 162, 235, 1)', // Blue
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Light Blue
        fill: false,
      },
      {
        label: 'نظزات مثبت',
        data: data3,
        borderColor: 'rgba(75, 192, 192, 1)', // Green
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Light Green
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'آمار نظرات برای آگهی شماره 3',
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;
