import React, { useEffect } from "react";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { loadTransactions } from "../../store/slice/transactionsSlice";

import "./Balance.css";

const Balance: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const transactions = useSelector((state: RootState) => state.transactions.data);

  const calculateTotal = (type: string) => {
    const totalAmount = Object.values(transactions).flatMap((dateTransactions) =>
      dateTransactions
        .filter((transaction) => transaction.type === type)
        .reduce((acc, transaction) => acc + transaction.amount, 0)
    );
    return totalAmount;
  };

  const totalIncome = calculateTotal("income").reduce((acc, amount) => acc + amount, 0);
  const totalExpense = calculateTotal("expense").reduce((acc, amount) => acc + amount, 0);
  const totalBalance = totalIncome - totalExpense;

  useEffect(() => {
    dispatch(loadTransactions());
  }, [dispatch]);

  return (
    <div className="balance__container">
      <div className="balance__title">Ваш баланс</div>

      <div className="balance__cards">
        <div className="balance__card total">
          <div className="balance__card-inner">
            <p>Баланс</p>
            <span>{`${totalBalance.toFixed(2)} UAN`}</span>
          </div>
        </div>

        <div className="balance__card income">
          <div className="balance__card-inner">
            <p>Доходи</p>
            <span>{`${totalIncome > 0 ? "+" : ""}${totalIncome.toFixed(2)} UAN`}</span>
          </div>
        </div>

        <div className="balance__card expense">
          <div className="balance__card-inner">
            <p>Витрати</p>
            <span>{`${totalExpense > 0 ? "-" : ""}${totalExpense.toFixed(2)} UAN`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;
