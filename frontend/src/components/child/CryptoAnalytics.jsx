import React from 'react';
import useReactApexChart from '../../hook/useReactApexChart';
import ReactApexChart from 'react-apexcharts';
import { Icon } from '@iconify/react/dist/iconify.js';

const CryptoAnalytics = () => {
    let { candleStickChartSeries, candleStickChartOptions } = useReactApexChart();
    return (
        <div className='card h-100 p-0 radius-12'>
            <div className='card-body px-24 py-32'>
              <div className='d-flex align-items-center justify-content-between mb-24'>
                <div className='d-flex align-items-center'>
                  <img
                    src='assets/images/crypto/bitcoin.png'
                    alt=''
                    className='w-72-px h-72-px rounded-circle flex-shrink-0 me-12 overflow-hidden'
                  />
                  <div className='flex-grow-1 d-flex flex-column'>
                    <h4 className='mb-4'>
                      Bitcoin{" "}
                      <span className='text-md text-neutral-400 fw-semibold'>
                        BTC
                      </span>{" "}
                    </h4>
                    <span className='text-md mb-0 fw-medium text-neutral-500 d-block'>
                      Currency in USD. Market Open
                    </span>
                  </div>
                </div>
                <div className='d-flex align-items-center gap-24'>
                  <div className='d-flex flex-column align-items-end'>
                    <div className='d-flex align-items-center gap-8 mb-4'>
                      <h6 className='mb-0'>$0.32533</h6>
                      <span className='text-sm fw-semibold rounded-pill bg-success-focus text-success-main border br-success px-8 py-4 line-height-1 d-flex align-items-center gap-1'>
                        <Icon icon='bxs:up-arrow' className='text-xs' /> 10%
                      </span>
                    </div>
                    <div className=''>
                      <span className='fw-semibold text-secondary-light text-sm'>
                        +0,021301
                      </span>
                      <span className='fw-semibold text-success-600 text-sm'>
                        (+6.42%)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='my-24'>
                <div className="col-12">
                  <div className="">
                        <div className="p-12">   
                            <div className="d-flex align-items-center gap-2 mt-12">
                                <div className="border radius-4 px-3 py-2 pe-0 d-flex align-items-center gap-3 text-sm text-secondary-light">
                                    <div className="form-check d-flex align-items-center">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="crypto"
                                            id="1D"
                                        />
                                        <label
                                            className="form-check-label line-height-1 fw-medium text-secondary-light"
                                            htmlFor="1D"
                                        >
                                            {" "}
                                            1D
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="crypto"
                                            id="5D"
                                        />
                                        <label
                                            className="form-check-label line-height-1 fw-medium text-secondary-light"
                                            htmlFor="5D"
                                        >
                                            {" "}
                                            5D
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="crypto"
                                            id="1M"
                                        />
                                        <label
                                            className="form-check-label line-height-1 fw-medium text-secondary-light"
                                            htmlFor="1M"
                                        >
                                            {" "}
                                            1M
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="crypto"
                                            id="6M"
                                        />
                                        <label
                                            className="form-check-label line-height-1 fw-medium text-secondary-light"
                                            htmlFor="6M"
                                        >
                                            {" "}
                                            6M
                                        </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="crypto"
                                            id="1Y"
                                        />
                                        <label
                                            className="form-check-label line-height-1 fw-medium text-secondary-light"
                                            htmlFor="1Y"
                                        >
                                            {" "}
                                            1Y
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <ReactApexChart options={candleStickChartOptions} series={candleStickChartSeries} type="candlestick" height={350} id="candleStickChart" />
                        </div>
                    </div>
                </div>
                <div className=''>
                  <div
                    id='timeSeriesChart'
                    className='apexcharts-tooltip-style-1'
                  />
                 
                </div>
              </div>
            </div>
          </div>
    );
};

export default CryptoAnalytics;