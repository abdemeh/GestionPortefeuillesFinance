import React from "react";
import ReactApexChart from "react-apexcharts";

const ExpenseStatistics = ({ assets }) => {
  // Transform assets data for the chart
  const chartData = {
    options: {
      labels: Object.keys(assets), // Labels for the pie chart (e.g., ["AAPL", "GOOGL", "TSLA"])
      chart: {
        type: "pie",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
    series: Object.values(assets), // Series data for the pie chart (e.g., [15.0, 7.5, 3.0])
  };

  return (
    <div className='col-md-6'>
      <div className='card radius-16 h-100'>
        <div className='card-header'>
          <div className='d-flex align-items-center flex-wrap gap-2 justify-content-between'>
            <h6 className='mb-2 fw-bold text-lg mb-0'>Assets</h6>
            <select className='form-select form-select-sm w-auto bg-base border text-secondary-light'>
              <option>Today</option>
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Yearly</option>
            </select>
          </div>
        </div>
        <div className='card-body'>
          <div
            id='expenseStatistics'
            className='apexcharts-tooltip-z-none d-flex justify-content-center'
          >
            <ReactApexChart
              options={chartData.options}
              series={chartData.series}
              type='pie'
              height={540}
              width={420}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseStatistics;