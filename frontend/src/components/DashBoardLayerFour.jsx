import React from 'react'
import UnitCountThree from './child/UnitCountThree'
import CoinAnalyticsOne from './child/CoinAnalyticsOne'
import CryptoMostPopular from './child/CryptoMostPopular'
import CryptoTrendingNow from './child/CryptoTrendingNow'
import NewsPanel from './child/NewsPanel'
import MyOrdersOne from './child/MyOrdersOne'
import RecentTransactionOne from './child/RecentTransactionOne'
import MyCardsOne from './child/MyCardsOne'
import TotalBalanceOne from './child/TotalBalanceOne'
import UserActivatesOne from './child/UserActivatesOne'

const DashBoardLayerFour = () => {
  return (
    <>
      <section>
        <div className="row gy-4 mt-4">
          {/* Crypto Home Widgets Start */}
          <div className="col-xxl-8">
            <UnitCountThree />
            <br/>
            <div className="row gy-4">

              <CryptoMostPopular />
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
    </>
  )
}

export default DashBoardLayerFour