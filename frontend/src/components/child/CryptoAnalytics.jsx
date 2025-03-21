import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Icon } from '@iconify/react/dist/iconify.js';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BuySellPanel from './BuySellPanel'; // Importez BuySellPanel

const CryptoAnalytics = () => {
    const { cryptoId } = useParams();
    const [price, setPrice] = useState(null);
    const [percentageChange, setPercentageChange] = useState(null);
    const [candleStickChartSeries, setCandleStickChartSeries] = useState([{ data: [] }]);
    const [candleStickChartOptions, setCandleStickChartOptions] = useState({
        plotOptions: {
            candlestick: {
                colors: {
                    upward: "#487FFF",
                    downward: "#FF9F29",
                },
                wick: {
                    useFillColor: true,
                },
            },
        },
        chart: {
            type: "candlestick",
            height: 350,
            toolbar: {
                show: false,
            },
        },
        xaxis: {
            type: "datetime",
        },
        yaxis: {
            tooltip: {
                enabled: true,
            },
        },
    });
    const [cryptoName, setCryptoName] = useState('');
    const [cryptoSymbol, setCryptoSymbol] = useState('');
    const [cryptoImage, setCryptoImage] = useState('');

    useEffect(() => {
        const fetchCoinData = async () => {
            try {
                const priceResponse = await axios.get(
                    `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=usd&include_24hr_change=true`
                );
                setPrice(priceResponse.data[cryptoId].usd.toFixed(5));
                setPercentageChange(priceResponse.data[cryptoId].usd_24h_change.toFixed(2));

                const historicalResponse = await axios.get(
                    `https://api.coingecko.com/api/v3/coins/${cryptoId}/ohlc?vs_currency=usd&days=30`
                );
                const historicalData = historicalResponse.data.map(item => ({
                    x: new Date(item[0]),
                    y: [item[1], item[2], item[3], item[4]],
                }));
                setCandleStickChartSeries([{ data: historicalData }]);

                const coinDetailsResponse = await axios.get(
                    `https://api.coingecko.com/api/v3/coins/${cryptoId}`
                );
                setCryptoName(coinDetailsResponse.data.name);
                setCryptoSymbol(coinDetailsResponse.data.symbol.toUpperCase());
                setCryptoImage(coinDetailsResponse.data.image.large);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCoinData();
        const intervalId = setInterval(fetchCoinData, 60000);

        return () => clearInterval(intervalId);
    }, [cryptoId]);

    if (price === null || percentageChange === null) {
        return <div>Loading...</div>;
    }

    const isPositiveChange = percentageChange >= 0;
    const percentageChangeAbs = Math.abs(percentageChange);
    const percentageChangeColor = isPositiveChange ? 'success-main' : 'danger-main';
    const percentageChangeFocus = isPositiveChange ? 'success-focus' : 'danger-focus';
    const percentageChangeBorder = isPositiveChange ? 'br-success' : 'br-danger';
    const arrowIcon = isPositiveChange ? 'bxs:up-arrow' : 'bxs:down-arrow';

    return (
        <div className='row'> {/* Ajout de la classe row */}
            <div className='col-xxl-9 col-lg-8'> {/* Ajout de la classe col-xxl-9 */}
                <div className='card h-100 p-0 radius-12'>
                    <div className='card-body px-24 py-32'>
                        <div className='d-flex align-items-center justify-content-between mb-24'>
                            <div className='d-flex align-items-center'>
                                <img
                                    src={cryptoImage}
                                    alt={cryptoName}
                                    className='w-72-px h-72-px rounded-circle flex-shrink-0 me-12 overflow-hidden'
                                />
                                <div className='flex-grow-1 d-flex flex-column'>
                                    <h4 className='mb-4'>
                                        {cryptoName}{" "}
                                        <span className='text-md text-neutral-400 fw-semibold'>
                                            {cryptoSymbol}
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
                                        <h6 className='mb-0'>${price}</h6>
                                        <span
                                            className={`text-sm fw-semibold rounded-pill bg-${percentageChangeFocus} text-${percentageChangeColor} border ${percentageChangeBorder} px-8 py-4 line-height-1 d-flex align-items-center gap-1`}
                                        >
                                            <Icon icon={arrowIcon} className='text-xs' /> {percentageChangeAbs}%
                                        </span>
                                    </div>
                                    <div className=''>
                                        <span className='fw-semibold text-secondary-light text-sm'>
                                            {isPositiveChange ? '+' : '-'}
                                            {Math.abs(percentageChange / 100 * price).toFixed(5)}
                                        </span>
                                        <span className={`fw-semibold text-${percentageChangeColor} text-sm`}>
                                            ({isPositiveChange ? '+' : '-'}{percentageChangeAbs}%)
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
                                                        id="1M"
                                                        defaultChecked
                                                    />
                                                    <label
                                                        className="form-check-label line-height-1 fw-medium text-secondary-light"
                                                        htmlFor="1M"
                                                    >
                                                        1M
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
            </div>
            <div className='col-xxl-3 col-lg-4'> {/* Ajout de la classe col-xxl-3 */}
                <BuySellPanel /> {/* Ajoutez BuySellPanel ici */}
            </div>
        </div>
    );
};

export default CryptoAnalytics;