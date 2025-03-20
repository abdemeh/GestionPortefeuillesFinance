import React from "react";
import { Link } from "react-router-dom";

const TransactionsHistory = () => {
  return (
    <div className='col-md-6'>
      <div className='card radius-16'>
        <div className='card-header'>
          <div className='d-flex align-items-center flex-wrap gap-2 justify-content-between'>
            <h6 className='mb-2 fw-bold text-lg mb-0'>Transactions History</h6>
          </div>
        </div>
        <div className='card-body'>
          <div className='d-flex align-items-center justify-content-between pb-10 mb-10 border-bottom border-neutral-200'>
            <div className=''>
              <h6 className='text-md mb-0'>Bitcoin</h6>
              <span className='text-xs text-secondary-light fw-medium'>
                18 Nov 2024
              </span>
            </div>
            <div className=''>
              <h6 className='text-sm mb-1'>$450.00</h6>
              <span className='text-xs fw-medium text-success-600 bg-success-100 rounded-pill px-3'>
              USD
              </span>
            </div>
          </div>
          <div className='d-flex align-items-center justify-content-between pb-10 mb-10 border-bottom border-neutral-200'>
            <div className=''>
              <h6 className='text-md mb-0'>Bitcoin</h6>
              <span className='text-xs text-secondary-light fw-medium'>
                18 Nov 2024
              </span>
            </div>
            <div className=''>
              <h6 className='text-sm mb-1'>$150.00</h6>
              <span className='text-xs fw-medium text-success-600 bg-success-100 rounded-pill px-3'>
              USD
              </span>
            </div>
          </div>
          <div className='d-flex align-items-center justify-content-between pb-10 mb-10 border-bottom border-neutral-200'>
            <div className=''>
              <h6 className='text-md mb-0'>Litecoin</h6>
              <span className='text-xs text-secondary-light fw-medium'>
                18 Nov 2024
              </span>
            </div>
            <div className=''>
              <h6 className='text-sm mb-1'>$450.00</h6>
              <span className='text-xs fw-medium text-success-600 bg-success-100 rounded-pill px-3'>
              USD
              </span>
            </div>
          </div>
          <div className='d-flex align-items-center justify-content-between pb-10 mb-10 border-bottom border-neutral-200'>
            <div className=''>
              <h6 className='text-md mb-0'>Etherium</h6>
              <span className='text-xs text-secondary-light fw-medium'>
                18 Nov 2024
              </span>
            </div>
            <div className=''>
              <h6 className='text-sm mb-1'>$450.00</h6>
              <span className='text-xs fw-medium text-success-600 bg-success-100 rounded-pill px-3'>
              USD
              </span>
            </div>
          </div>
          <div className='d-flex align-items-center justify-content-between'>
            <div className=''>
              <h6 className='text-md mb-0'>Bitcoin</h6>
              <span className='text-xs text-secondary-light fw-medium'>
                18 Nov 2024
              </span>
            </div>
            <div className=''>
              <h6 className='text-sm mb-1'>$450.00</h6>
              <span className='text-xs fw-medium text-success-600 bg-success-100 rounded-pill px-3'>
              USD
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsHistory;
