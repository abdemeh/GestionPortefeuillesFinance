import React, { useState, useEffect } from 'react';
import useReactApexChart from '../../hook/useReactApexChart';
import { Link } from "react-router-dom";
import axios from 'axios';

const CryptoMostPopular = () => {
    let { createChartFour } = useReactApexChart();
    const [cryptoData, setCryptoData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const cryptoList = [
        'bitcoin', 'ethereum', 'solana', 'litecoin', 'dogecoin', 'cardano', 'binancecoin'
    ];

    const cryptoImages = {
        'bitcoin': 'assets/images/currency/crypto-img1.png',
        'ethereum': 'assets/images/currency/crypto-img2.png',
        'solana': 'assets/images/currency/crypto-img3.png',
        'litecoin': 'assets/images/currency/crypto-img4.png',
        'dogecoin': 'assets/images/currency/crypto-img5.png',
        'cardano': 'assets/images/currency/img_2.png',
        'binancecoin': 'assets/images/currency/bnb.png',
    };

    useEffect(() => {
        const fetchCryptoData = async () => {
            try {
                const response = await axios.get(
                    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoList.join(',')}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
                );
                const data = response.data.map(crypto => ({
                    id: crypto.id,
                    name: crypto.name,
                    price: crypto.current_price,
                    change: crypto.price_change_percentage_24h,
                    image: cryptoImages[crypto.id]
                }));
                setCryptoData(data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchCryptoData();
        const intervalId = setInterval(fetchCryptoData, 60000); // Mettre à jour toutes les minutes

        return () => clearInterval(intervalId); // Nettoyer l'intervalle lors du démontage
    }, []);

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>Erreur : {error.message}</div>;
    }

    return (
        <div className="col-xxl-12">
            <div className="card h-100 radius-8 border-0">
                <div className="card-body p-24">
                    <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between mb-20">
                        <h6 className="mb-2 fw-bold text-lg">Most Popular</h6>
                    </div>
                    {cryptoData.map((crypto, index) => (
                        <div key={crypto.id} className="d-flex flex-wrap align-items-center justify-content-between gap-2 bg-neutral-200 px-8 py-8 radius-4 mb-16">
                            <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
                                <img src={crypto.image} alt={crypto.name} className="w-36-px h-36-px rounded-circle flex-shrink-0" />
                                <div className="flex-grow-1">
                                    <Link to='/marketplace-details'><h6 className="text-md mb-0">{crypto.name}</h6></Link>
                                </div>
                            </div>
                            <h6 className="text-md fw-medium mb-0">${crypto.price?.toLocaleString()}</h6>
                            <span className={crypto.change > 0 ? "text-success-main text-md fw-medium" : "text-danger-main text-md fw-medium"}>
                                {crypto.change?.toFixed(2)}%
                            </span>
                            <div className="remove-tooltip-title rounded-tooltip-value">
                                {createChartFour(crypto.change > 0 ? "#45B369" : "#EF4A00", 42, 100)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CryptoMostPopular;