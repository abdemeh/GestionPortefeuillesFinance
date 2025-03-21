import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import UnitCountEight from "./child/UnitCountEight";
import BalanceStatistic from "./child/BalanceStatistic";
import EarningCategories from "./child/EarningCategories";
import ExpenseStatistics from "./child/ExpenseStatistics";
import PaymentHistory from "./child/PaymentHistory";
import MonthlyExpenseBreakdown from "./child/MonthlyExpenseBreakdown";
import QuickTransfer from "./child/QuickTransfer";
import Investment from "./child/Investment";
import PaymentHistoryOne from "./child/PaymentHistoryOne";

const DashBoardLayerEleven = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPortfolio = async () => {
      try {
        const userData = Cookies.get("userData");
        if (!userData) {
          throw new Error("User data not found in cookies");
        }
        const parsedUserData = JSON.parse(userData);
        const userId = parsedUserData.userId;
        if (!userId) {
          throw new Error("User ID not found in parsed cookie data");
        }
        console.log(`http://localhost:8080/api/portfolio/get/${userId}`)
        const response = await fetch(`http://localhost:8080/api/portfolio/get/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch portfolio data");
        }
        const data = await response.json();
        console.log(data)
        setPortfolio(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getPortfolio();
  }, []);

  if (loading) return <p>Loading portfolio...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {/* UnitCountEight */}
      {/* <UnitCountEight /> */}

      <div className='mt-24'>
        <div className='row gy-4'>
          <div className='col-xl-8'>
            <div className='row gy-4'>
              {/* BalanceStatistic */}
              {/* <BalanceStatistic /> */}

              {/* EarningCategories */}
              {/* <EarningCategories /> */}

              {/* ExpenseStatistics */}
              {portfolio && <ExpenseStatistics assets={portfolio.assets} />}

              {/* PaymentHistory */}
              {/* <PaymentHistory /> */}

              {/* MonthlyExpenseBreakdown */}
              {/* <MonthlyExpenseBreakdown /> */}
            </div>
          </div>
          {/* Sidebar start */}
          <div className='col-xl-4'>
            {/* QuickTransfer */}
            
            {portfolio && <QuickTransfer solde={portfolio.Balance} />}

            {/* Investment */}
            {/* <Investment /> */}
          </div>
          {/* Sidebar end */}
        </div>
      </div>

      {/* PaymentHistoryOne */}
      <PaymentHistoryOne />
    </>
  );
};

export default DashBoardLayerEleven;
