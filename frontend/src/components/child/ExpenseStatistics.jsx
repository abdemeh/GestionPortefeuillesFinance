import React from "react";
import useReactApexChart from "../../hook/useReactApexChart";
import ReactApexChart from "react-apexcharts";

const ExpenseStatistics = () => {
  let { expenseStatisticsOptions, expenseStatisticsSeries } =
    useReactApexChart();
  return (
    <div className='col-md-6'>
      <div className='card radius-16 h-100'>
        <div className='card-header'>
          <div className='d-flex align-items-center flex-wrap gap-2 justify-content-between'>
            <h6 className='mb-2 fw-bold text-lg mb-0'>Expense Statistics</h6>
          </div>
        </div>
        <div className='card-body'>
          <div
            id='expenseStatistics'
            className='apexcharts-tooltip-z-none d-flex justify-content-center'
          >
            <ReactApexChart
              options={expenseStatisticsOptions}
              series={expenseStatisticsSeries}
              type='pie'
              height={540}
              width={420}
            />
          </div>
          <div className="mb-20">
            <label
                htmlFor="tradeValue"
                className="fw-semibold mb-8 text-primary-light"
            >
                Estimated value
            </label>
            <h6 className="mb-4 fw-semibold text-xl text-warning-main">
                $1455.23
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseStatistics;
