import React from 'react';
import CryptoMostPopular from './child/CryptoMostPopular';
import CryptoTrendingNow from './child/CryptoTrendingNow';
import NewsPanel from './child/NewsPanel';
import UnitCountThree from './child/UnitCountThree';

const DashBoardLayerFour = () => {
  return (
      <section>
        <div className="row gy-4 mt-4">
          {/* Crypto Home Widgets Start */}
          <div className="col-xxl-8">
            <UnitCountThree />
            <div className="row gy-4 mt-4">
              <CryptoMostPopular />
            </div>
            <div className="row gy-4 mt-4">
              <CryptoTrendingNow />
            </div>
          </div>
          {/* Crypto Home Widgets End */}

          <div className="col-xxl-4">
            <div className="row gy-4">
              <NewsPanel />
            </div>
          </div>
        </div>
      </section>
  );
};

export default DashBoardLayerFour;