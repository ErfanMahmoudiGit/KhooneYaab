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
