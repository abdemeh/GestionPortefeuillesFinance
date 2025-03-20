import React from "react";
import UnitCountEight from "./child/UnitCountEight";
import BalanceStatistic from "./child/BalanceStatistic";
import EarningCategories from "./child/EarningCategories";
import ExpenseStatistics from "./child/ExpenseStatistics";
import PaymentHistory from "./child/PaymentHistory";
import TransactionsHistory from "./child/TransactionsHistory";
import MonthlyExpenseBreakdown from "./child/MonthlyExpenseBreakdown";
import QuickTransfer from "./child/QuickTransfer";
import Investment from "./child/Investment";
import PaymentHistoryOne from "./child/PaymentHistoryOne";
import BalanceWidget from "./child/BalanceWidget";
import BalanceHistory from "./child/BalanceHistory";

const DashBoardLayerEleven = () => {
  return (
    <>
      {/* UnitCountEight */}
      {/* <UnitCountEight /> */}
      <BalanceHistory />
      <div className='mt-24'>
        <div className='row gy-4'>
          <div className='col-xl-8'>
            <div className='row gy-4'>
              {/* TransactionsHistory */}

              <TransactionsHistory />
              {/* ExpenseStatistics */}
              <ExpenseStatistics />

              {/* <Investment /> */}
            </div>
          </div>
          {/* Sidebar start */}
          <div className='col-xl-4'>
            {/* BalanceWidget */}
            <BalanceWidget />
          </div>
          {/* Sidebar end */}
        </div>
      </div>
    </>
  );
};

export default DashBoardLayerEleven;
