import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useReactApexChart from '../../hook/useReactApexChart';

const UnitCountThree = () => {
    const [cryptoPrices, setCryptoPrices] = useState({
        bitcoin: null,
        ethereum: null,
        solana: null,
        litecoin: null,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let { createChartThree } = useReactApexChart();

    useEffect(() => {
        const fetchCryptoPrices = async () => {
            try {
                const response = await axios.get(
                    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,litecoin&vs_currencies=usd'
                );
                setCryptoPrices({
                    bitcoin: response.data.bitcoin.usd,
                    ethereum: response.data.ethereum.usd,
                    solana: response.data.solana.usd,
                    litecoin: response.data.litecoin.usd,
                });
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchCryptoPrices();
    }, []);

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>Erreur : {error.message}</div>;
    }

    return (
        <div className="row row-cols-xxxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4 mb-1">
            <div className="col">
                <Link className="card shadow-none border bg-gradient-end-3" to="/marketplace-details">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <img
                                src="assets/images/currency/crypto-img1.png"
                                alt=""
                                className="w-40-px h-40-px rounded-circle flex-shrink-0"
                            />
                            <div className="flex-grow-1">
                                <h6 className="text-xl mb-1">Bitcoin</h6>
                                <p className="fw-medium text-secondary-light mb-0">BTC</p>
                            </div>
                        </div>
                        <div className="mt-3 d-flex flex-wrap justify-content-between align-items-center gap-1">
                            <div className="">
                                <h6 className="mb-8">${cryptoPrices.bitcoin?.toLocaleString()}</h6>
                            </div>
                            <div
                                id="bitcoinAreaChart"
                                className="remove-tooltip-title rounded-tooltip-value"
                            ></div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="col">
                <Link to="/marketplace-details" className="card shadow-none border bg-gradient-end-1">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <img
                                src="assets/images/currency/crypto-img2.png"
                                alt=""
                                className="w-40-px h-40-px rounded-circle flex-shrink-0"
                            />
                            <div className="flex-grow-1">
                                <h6 className="text-xl mb-1">Ethereum</h6>
                                <p className="fw-medium text-secondary-light mb-0">ETH</p>
                            </div>
                        </div>
                        <div className="mt-3 d-flex flex-wrap justify-content-between align-items-center gap-1">
                            <div className="">
                                <h6 className="mb-8">${cryptoPrices.ethereum?.toLocaleString()}</h6>
                            </div>
                            <div
                                id="ethereumAreaChart"
                                className="remove-tooltip-title rounded-tooltip-value"
                            ></div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="col">
                <Link to="/marketplace-details" className="card shadow-none border bg-gradient-end-5">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <img
                                src="assets/images/currency/crypto-img3.png"
                                alt=""
                                className="w-40-px h-40-px rounded-circle flex-shrink-0"
                            />
                            <div className="flex-grow-1">
                                <h6 className="text-xl mb-1">Solana</h6>
                                <p className="fw-medium text-secondary-light mb-0">SOL</p>
                            </div>
                        </div>
                        <div className="mt-3 d-flex flex-wrap justify-content-between align-items-center gap-1">
                            <div className="">
                                <h6 className="mb-8">${cryptoPrices.solana?.toLocaleString()}</h6>
                            </div>
                            <div
                                id="solanaAreaChart"
                                className="remove-tooltip-title rounded-tooltip-value"
                            ></div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="col">
                <Link to="/marketplace-details" className="card shadow-none border bg-gradient-end-6">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <img
                                src="assets/images/currency/crypto-img4.png"
                                alt=""
                                className="w-40-px h-40-px rounded-circle flex-shrink-0"
                            />
                            <div className="flex-grow-1">
                                <h6 className="text-xl mb-1">Litecoin</h6>
                                <p className="fw-medium text-secondary-light mb-0">LTE</p>
                            </div>
                        </div>
                        <div className="mt-3 d-flex flex-wrap justify-content-between align-items-center gap-1">
                            <div className="">
                                <h6 className="mb-8">${cryptoPrices.litecoin?.toLocaleString()}</h6>
                            </div>
                            <div
                                id="litecoinAreaChart"
                                className="remove-tooltip-title rounded-tooltip-value"
                            ></div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default UnitCountThree;