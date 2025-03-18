import React from 'react';
import useReactApexChart from '../../hook/useReactApexChart';
import { Link, NavLink, useLocation } from "react-router-dom";
const CryptoTrendingNow = () => {
    let { createChartFour } = useReactApexChart();
    return (
        <div className="col-xxl-12">
            <div className="card h-100 radius-8 border-0">
                <div className="card-body p-24">
                    <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between mb-20">
                        <h6 className="mb-2 fw-bold text-lg">Trending Now</h6>
                    </div>
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 bg-neutral-200 px-8 py-8 radius-4 mb-16">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
                            <img
                                src="assets/images/currency/crypto-img4.png"
                                alt=""
                                className="w-36-px h-36-px rounded-circle flex-shrink-0"
                            />
                            <div className="flex-grow-1">
                            <Link to='/marketplace-details'><h6 className="text-md mb-0">Litecoin</h6></Link>
                            </div>
                        </div>
                        <h6 className="text-md fw-medium mb-0">$55,000.00</h6>
                        <span className="text-success-main text-md fw-medium">
                            +3.85%
                        </span>
                        <div
                            id="markerLitecoinChart"
                            className="remove-tooltip-title rounded-tooltip-value"
                        >
                            {/* Pass the color value, height, width  here */}
                            {createChartFour("#45B369", 42, 100)}
                        </div>
                    </div>
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 bg-neutral-200 px-8 py-8 radius-4 mb-16">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
                            <img
                                src="assets/images/currency/crypto-img5.png"
                                alt=""
                                className="w-36-px h-36-px rounded-circle flex-shrink-0"
                            />
                            <div className="flex-grow-1">
                            <Link to='/marketplace-details'><h6 className="text-md mb-0">Dogecoin</h6></Link>
                            </div>
                        </div>
                        <h6 className="text-md fw-medium mb-0">$15,000.00</h6>
                        <span className="text-danger-main text-md fw-medium">-2.85%</span>
                        <div
                            id="markerDogecoinChart"
                            className="remove-tooltip-title rounded-tooltip-value"
                        >
                            {/* Pass the color value, height, width  here */}
                            {createChartFour("#EF4A00", 42, 100)}
                        </div>
                    </div>
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 bg-neutral-200 px-8 py-4 radius-4">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
                            <img
                                src="assets/images/currency/crypto-img1.png"
                                alt=""
                                className="w-36-px h-36-px rounded-circle flex-shrink-0"
                            />
                            <div className="flex-grow-1">
                            <Link to='/marketplace-details'><h6 className="text-md mb-0">Crypto</h6></Link>
                            </div>
                        </div>
                        <h6 className="text-md fw-medium mb-0">$15,000.00</h6>
                        <span className="text-danger-main text-md fw-medium">-2.85%</span>
                        <div
                            id="markerCryptoChart"
                            className="remove-tooltip-title rounded-tooltip-value"
                        >
                            {/* Pass the color value, height, width  here */}
                            {createChartFour("#EF4A00", 42, 100)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CryptoTrendingNow;