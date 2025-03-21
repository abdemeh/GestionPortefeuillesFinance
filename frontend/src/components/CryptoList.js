import React from 'react';
import { Link } from 'react-router-dom';

const CryptoList = ({ cryptoPrices }) => {
    const cryptocurrencies = [
        { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', image: 'assets/images/currency/crypto-img1.png', priceKey: 'bitcoin' },
        { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', image: 'assets/images/currency/crypto-img2.png', priceKey: 'ethereum' },
        { id: 'litecoin', name: 'Litecoin', symbol: 'LTE', image: 'assets/images/currency/crypto-img4.png', priceKey: 'litecoin' },
        { id: 'solana', name: 'solana', symbol: 'SOL', image: 'assets/images/currency/crypto-img3.png', priceKey: 'solana' },
        { id: 'binancecoin', name: 'binancecoin', symbol: 'BNB', image: 'assets/images/currency/bnb.png', priceKey: 'binancecoin' },
        { id: 'cardano', name: 'cardano', symbol: 'ADA', image: 'assets/images/currency/crypto-img4.png', priceKey: 'cardano' },
        { id: 'dogecoin', name: 'dogecoin', symbol: 'DOGE', image: 'assets/images/currency/img_9.png', priceKey: 'dogecoin' }

        // ... ajoutez d'autres cryptomonnaies ...
    ];

    return (
        <div className="row">
            {cryptocurrencies.map(crypto => (
                <div className="col" key={crypto.id}>
                    <Link to={`/marketplace-details/${crypto.id}`} className="card shadow-none border bg-gradient-end-6">
                        <div className="card-body p-20">
                            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                                <img
                                    src={crypto.image}
                                    alt={crypto.name}
                                    className="w-40-px h-40-px rounded-circle flex-shrink-0"
                                />
                                <div className="flex-grow-1">
                                    <h6 className="text-xl mb-1">{crypto.name}</h6>
                                    <p className="fw-medium text-secondary-light mb-0">{crypto.symbol}</p>
                                </div>
                            </div>
                            <div className="mt-3 d-flex flex-wrap justify-content-between align-items-center gap-1">
                                <div className="">
                                    <h6 className="mb-8">${cryptoPrices[crypto.priceKey]?.toLocaleString()}</h6>
                                </div>
                                <div
                                    id={`${crypto.id}AreaChart`}
                                    className="remove-tooltip-title rounded-tooltip-value"
                                ></div>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default CryptoList; // Ajout de cette ligne