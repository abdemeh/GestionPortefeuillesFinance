import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import useReactApexChart from "../hook/useReactApexChart";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";
import CryptoAnalytics from './child/CryptoAnalytics'
import BuySellPanel from './child/BuySellPanel'
const MarketplaceDetailsLayer = () => {
  let { timeSeriesChartSeries, timeSeriesChartOptions } = useReactApexChart();
  const [isStarred, setIsStarred] = useState(false);
  const toggleStar = () => {
    setIsStarred(!isStarred);
  };

  return (
    <>
      <div className='row gy-4'>
        <div className='col-xxl-9 col-lg-8'>
        <CryptoAnalytics/>
        </div>
        <div className='col-xxl-3 col-lg-4'>
          <div className='card h-100'>
            <BuySellPanel/>
          </div>
        </div>
      </div>
      {/* Modal Edit Currency */}
      <div
        className='modal fade'
        id='exampleModalEdit'
        tabIndex={-1}
        aria-labelledby='exampleModalEditLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog modal-dialog-centered'>
          <div className='modal-content radius-16 bg-base'>
            <div className='modal-body px-32 py-56'>
              <div className='text-center'>
                <span className='w-100-px h-100-px bg-success-600 rounded-circle d-inline-flex justify-content-center align-items-center text-2xxl mb-32 text-white'>
                  <i className='ri-check-line' />
                </span>
                <h5 className='mb-8 text-2xl'>Your purchase was successful!</h5>
                <p className='text-neutral-500 mb-0'>
                  {" "}
                  <span className='text-primary-600'>16.2665 ITC</span> will be
                  available in your portfolio on 10-10-2022
                </p>
                <Link to='/' className='btn btn-primary-600 mt-32 px-24'>
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketplaceDetailsLayer;
