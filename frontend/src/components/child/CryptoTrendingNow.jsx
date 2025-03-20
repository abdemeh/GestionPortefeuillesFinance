import React, { useState, useEffect } from 'react';
import useReactApexChart from '../../hook/useReactApexChart';
import { Link } from "react-router-dom";
import axios from 'axios';

const CryptoTrendingNow = () => {
    let { createChartFour } = useReactApexChart();
    const [trendingCryptoData, setTrendingCryptoData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const cryptoList = [
        'bitcoin', 'ethereum', 'tether', 'binancecoin', 'usd-coin', 'ripple', 'solana', 'cardano', 'dogecoin', 'tron',
        'chainlink', 'polygon', 'litecoin', 'avalanche-2', 'polkadot', 'shiba-inu', 'dai', 'uniswap', 'cosmos', 'monero'
    ];

    useEffect(() => {
        const fetchTrendingCryptoData = async () => {
            try {
                const response = await axios.get(
                    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoList.join(',')}&order=volume_desc&per_page=3&page=1&sparkline=false`
                );

                if (!response.data) {
                    throw new Error('Aucune donnée de marché reçue.');
                }

                const data = response.data.map(crypto => ({
                    id: crypto.id,
                    name: crypto.name,
                    price: crypto.current_price,
                    change: crypto.price_change_percentage_24h,
                    image: crypto.image
                }));

                const detailedResponses = await Promise.all(data.map(crypto => axios.get(`https://api.coingecko.com/api/v3/coins/${crypto.id}`)));
                const detailedData = detailedResponses.map(res => {
                    if (!res.data) {
                        throw new Error(`Aucune donnée détaillée reçue pour ${res.config.url}`);
                    }
                    return res.data;
                });

                const finalData = data.map(crypto => {
                    const detailed = detailedData.find(d => d.id === crypto.id);
                    return {
                        ...crypto,
                        image: detailed?.image?.small
                    };
                });

                setTrendingCryptoData(finalData);
                setLoading(false);
            } catch (err) {
                console.error('Erreur lors de la récupération des données:', err);
                setError(err);
                setLoading(false);
            }
        };

        fetchTrendingCryptoData();
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
                        <h6 className="mb-2 fw-bold text-lg">Trending Now</h6>
                    </div>
                    {trendingCryptoData.map((crypto, index) => (
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

export default CryptoTrendingNow;