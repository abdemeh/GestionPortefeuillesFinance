import React from 'react';
import { Link } from 'react-router-dom';

const BuySellPanel = () => {
    return (
        <div className="col-xxl-12 col-lg-6">
            <div className="card h-100">
                <div className="card-body p-24">
                    <span className="mb-4 text-sm text-secondary-light">
                        Total Balance
                    </span>
                    <h6 className="mb-4">$320,320.00</h6>
                    <ul
                        className="nav nav-pills pill-tab mb-24 mt-28 border input-form-light p-1 radius-8 bg-neutral-50"
                        id="pills-tab"
                        role="tablist"
                    >
                        <li className="nav-item w-50" role="presentation">
                            <button
                                className="nav-link px-12 py-10 text-md w-100 text-center radius-8 active"
                                id="pills-Buy-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-Buy"
                                type="button"
                                role="tab"
                                aria-controls="pills-Buy"
                                aria-selected="true"
                            >
                                Buy
                            </button>
                        </li>
                        <li className="nav-item w-50" role="presentation">
                            <button
                                className="nav-link px-12 py-10 text-md w-100 text-center radius-8"
                                id="pills-Sell-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-Sell"
                                type="button"
                                role="tab"
                                aria-controls="pills-Sell"
                                aria-selected="false"
                            >
                                Sell
                            </button>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div
                            className="tab-pane fade show active"
                            id="pills-Buy"
                            role="tabpanel"
                            aria-labelledby="pills-Buy-tab"
                            tabIndex={0}
                        >
                            <div className="mb-20">
                                <label
                                    htmlFor="estimatedValue"
                                    className="fw-semibold mb-8 text-primary-light"
                                >
                                    Amount
                                </label>
                                <div className="input-group input-group-lg border input-form-light radius-8">
                                    <input
                                        type="text"
                                        className="form-control bg-base border-0 radius-8"
                                        id="estimatedValue"
                                        placeholder="Amount"
                                    />
                                </div>
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
                            <Link
                                to="#"
                                className="btn btn-primary text-sm btn-sm px-8 py-12 w-100 radius-8"
                            >
                                {" "}
                                Buy
                            </Link>
                        </div>
                        <div
                            className="tab-pane fade"
                            id="pills-Sell"
                            role="tabpanel"
                            aria-labelledby="pills-Sell-tab"
                            tabIndex={0}
                        >
                            <div className="mb-20">
                                <label
                                    htmlFor="estimatedValue"
                                    className="fw-semibold mb-8 text-primary-light"
                                >
                                    Amount
                                </label>
                                <div className="input-group input-group-lg border input-form-light radius-8">
                                    <input
                                        type="text"
                                        className="form-control bg-base border-0 radius-8"
                                        id="estimatedValue"
                                        placeholder="Amount"
                                    />
                                </div>
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
                            <Link
                                to="#"
                                className="btn btn-primary text-sm btn-sm px-8 py-12 w-100 radius-8"
                            >
                                {" "}
                                Sell
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuySellPanel;