import React from "react";
import useReactApexChart from "../../hook/useReactApexChart";
import ReactApexChart from "react-apexcharts";

const BalanceHistory = () => {
  let { enrollmentChartOptions, enrollmentChartSeries } = useReactApexChart();
  return (
    <>
      <div className='col-xxl-12'>
        <div className='card h-100'>
          <div className='card-header'>
            <div className='d-flex align-items-center flex-wrap gap-2 justify-content-between'>
              <h6 className='mb-2 fw-bold text-lg mb-0'>Balance History</h6>
            </div>
          </div>
          <div className='card-body p-24'>
            <div id='enrollmentChart' className='apexcharts-tooltip-style-1'>
              <ReactApexChart
                options={enrollmentChartOptions}
                series={enrollmentChartSeries}
                type='area'
                height={260}
                width={"100%"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BalanceHistory;
